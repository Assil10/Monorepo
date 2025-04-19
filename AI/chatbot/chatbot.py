# Import necessary packages
from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
# Document processing and retrieval  
from langchain.schema import Document
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
import json
import os
from langdetect import detect
from elevenlabs.client import ElevenLabs
from langchain_google_genai import ChatGoogleGenerativeAI
#for caching
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def load_data(json_file):
    try:
        with open(json_file, 'r', encoding='utf-8') as file:
            json_data = json.load(file)
            # Convert JSON into LangChain Documents
            data = []
            for item in json_data:
                # Include both question and answer in the content
                content = f"QUESTION: {item['question']}\nANSWER: {item['answer']}"
                data.append(Document(
                    page_content=content,
                    metadata={
                        "section": item['section'],
                        "question": item['question'],
                        "answer": item['answer']  # Store answer separately in metadata
                    }
                ))
    except:
        print("Error loading ",json_file," file")
    return data

def load_persist_directory(persist_directory,embeddings,file_name):
    if os.path.exists(persist_directory):
        print("Vectorstore exist , loading ...")
        vectorstore = Chroma(persist_directory=persist_directory, embedding_function=embeddings)
        print("Vectoresore is loaded")
    else:
        data=load_data(file_name)
        try:
            print("Creating new vectorstore")
            vectorstore = Chroma.from_documents(documents=data, embedding=embeddings, persist_directory=persist_directory)
            print("New vectorstore created and persisted!")
        except:
            print("Error creating new vectorstore")
    return vectorstore
# Language Detection Function
def detect_language(text):
    try:
        lang = detect(text)
        return lang if lang in ["en", "fr", "ar"] else "en"
    except Exception:
        return "None"
def find_similar_question(query, cache_file_path, threshold=0.7,update: bool = False):
    """
    Find a similar question in the cache using TF-IDF vectorization
    
    Args:
        query (str): The user's question
        cache_file_path (str): Path to the JSON cache file
        threshold (float): Minimum similarity score to consider a match
        
    Returns:
        dict or None: The matched question and answer if found, None otherwise
    """
    # Ensure the cache file exists
    if not os.path.exists(cache_file_path):
        print("Cache file doen't exist")
        print("creating ...")
        with open(cache_file_path, 'w', encoding='utf-8') as f:
            json.dump({}, f)
            print("Cache created sucessfuly")
        return None
    if update == True:
        print("Cache updated")
        cache=None
    # Load the cache
    with open(cache_file_path, 'r', encoding='utf-8') as f:
        cache = json.load(f)
        print("Cache loaded")
    
    # If cache is empty, return None
    if not cache:
        print("Cache is empty")
        return None
    
    # Get all questions from the cache
    cached_questions = list(cache.keys())
    
    # If there's an exact match, return it immediately
    if query.lower() in [q.lower() for q in cached_questions]:
        for q in cached_questions:
            if q.lower() == query.lower():
                return {"question": q, "answer": cache[q], "similarity": 1.0}
    
    # Create a list of all texts to compare (query + cached questions)
    all_texts = [query] + cached_questions
    
    # Create TF-IDF vectorizer
    # min_df=1 means include terms that appear in at least 1 document
    # stop_words='english' removes common English words
    vectorizer = TfidfVectorizer(stop_words='english')
    
    # Fit and transform all texts to TF-IDF vectors
    tfidf_matrix = vectorizer.fit_transform(all_texts)
    
    # Get the query vector (first row of the matrix)
    query_vector = tfidf_matrix[0:1]
    
    # Get vectors for all cached questions
    question_vectors = tfidf_matrix[1:]
    
    # Calculate cosine similarity between query and all cached questions
    similarities = cosine_similarity(query_vector, question_vectors).flatten()
    
    # Find the index of the most similar question
    max_similarity_index = np.argmax(similarities)
    max_similarity = similarities[max_similarity_index]
    
    # If similarity is above threshold, return the match
    if max_similarity >= threshold:
        best_match = cached_questions[max_similarity_index]
        return {
            "question": best_match,
            "answer": cache[best_match],
            "similarity": float(max_similarity)
        }
    
    return None

def main(model_name,query):
    cache_file_path="question_cache.json"
    result = find_similar_question(query, cache_file_path)
    if result:
        print(f"Found similar question: '{result['question']}'")
        print(f"Similarity score: {result['similarity']:.2f}")
        print(f"Answer: {result['answer']}")
    else:
        # Create embeddings using HuggingFaceEmbeddings
        embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/paraphrase-multilingual-mpnet-base-v2",
            model_kwargs={'device': 'cpu'}
        )
        #prompts for the llm
        prompts = {
            "en": ChatPromptTemplate.from_template("""Based on the following context, provide a detailed answer to the user's query.
        Context: {context}
        User Query: {question}

        Instructions:
        1. Extract the relevant answer from the ANSWER section in the context
        2. Present the information in a clear, structured way and please don't add any external output other than the information.
        3. Use the exact information from the context without adding external knowledge

        If the query is a general conversation (like greetings, how are you, etc.), respond naturally.
        If the query is about a topic not covered in the context but is within your general knowledge about Tunisian real estate, laws, or registration, provide a brief, helpful response.
        If the query is not related to Tunisian real estate respond with: "I'm specialized in Tunisian real estate. I don't have enough information to answer this question."
        If no relevant information is found and you cannot provide a general answer, respond with: "I don't have enough information to answer this question."
        """),
            
            "fr": ChatPromptTemplate.from_template("""En vous basant sur le contexte suivant, fournissez une réponse détaillée à la question en français.
        Contexte: {context}
        Question: {question}

        Instructions:
        1. Extrayez la réponse pertinente de la section RÉPONSE du contexte
        2. Répondez UNIQUEMENT en français
        3. Utilisez exactement les informations du contexte et n'ajoutez pas d'informations externes
        4. Gardez la réponse claire et structurée

        Si la question est une conversation générale (comme des salutations, comment allez-vous, etc.), répondez naturellement.
        Si la question porte sur un sujet non couvert dans le contexte mais fait partie de vos connaissances générales sur l'immobilier tunisien, les lois ou l'enregistrement, fournissez une réponse brève et utile.
        Si la question n'est pas liée à l'immobilier tunisien répondez: "Je suis spécialisé dans l'immobilier tunisien. Je n'ai pas assez d'informations pour répondre à cette question."
        Si aucune information pertinente n'est trouvée et vous ne pouvez pas fournir une réponse générale, répondez: "Je n'ai pas assez d'informations pour répondre à cette question."
        """),
            
            "ar": ChatPromptTemplate.from_template("""أجب باللغة العربية. استخدم المعلومات الموجودة في السياق أدناه.

        السياق: {context}
        السؤال: {question}

        تعليمات واضحة:
        1. ابحث عن القسم المسمى "ANSWER" في السياق واستخرج المعلومات منه
        2. يجب أن تكون إجابتك باللغة العربية فقط ولا تستخدم أي لغة أخرى
        3. استخدم نفس المعلومات والمصطلحات الموجودة في السياق
        4. لا تضيف معلومات من خارج السياق المعطى

        إذا كان السؤال محادثة عامة (مثل التحيات، كيف حالك، إلخ)، فقم بالرد بشكل طبيعي.
        إذا كان السؤال حول موضوع غير مغطى في السياق ولكنه ضمن معرفتك العامة حول العقارات التونسية، قدم إجابة موجزة ومفيدة.
        إذا كان السؤال لا يتعلق بالعقارات التونسية أو القوانين التونسية أو عمليات التسجيل، أجب بـ: "أنا متخصص في العقارات التونسية. ليس لدي معلومات كافية للإجابة على هذا السؤال."
        إذا لم تجد معلومات كافية ولا يمكنك تقديم إجابة عامة، أجب بـ: "ليس لدي معلومات كافية للإجابة على هذا السؤال."
        """)
        }
        #define our model
        google_key=os.getenv("google_api_key")
        if not google_key:
            print("Google API key not found in environment variables.")
            return
        llm = ChatGoogleGenerativeAI(model=model_name,google_api_key=google_key)
        print(f"\nQuery: {query}")
        lang=detect_language(query)
        if lang=="en":
            # persist directory : where we store the vectorstore
            persist_directory_en = "./chroma_db_en"
            vectorstore = load_persist_directory(persist_directory_en,embeddings,'data_en.json')
            prompt=prompts["en"]
        elif lang=="fr":
            persist_directory_fr = "./chroma_db_fr"
            vectorstore = load_persist_directory(persist_directory_fr,embeddings,'data_fr.json')
            prompt=prompts["fr"]
        elif lang=="ar":
            persist_directory_ar = "./chroma_db_ar"
            vectorstore= load_persist_directory(persist_directory_ar,embeddings,'data_ar.json')
            prompt=prompts["ar"]
        else:
            print("Language not supported")
            return
        #retriever
        retriever = vectorstore.as_retriever(search_type="similarity",search_kwargs={"k":2})
        chain = (
            {"context":retriever,"question":RunnablePassthrough()}
            | prompt
            | llm
            | StrOutputParser()
        )
        try:
            # Get the LLM response
            result = chain.invoke(query)
            # Get the retrieved documents separately
            retrieved_docs = vectorstore.similarity_search(query, k=2)   
            # Save retrieved documents to a text file
            docs_file = "retrieved_documents.txt"
            if retrieved_docs:
                print('Docs retrieved')
                with open(docs_file, "w", encoding="utf-8") as f:
                    f.write(f"Query: {query}\n\n")
                    f.write("Retrieved Documents:\n")
                    for i, doc in enumerate(retrieved_docs, 1):
                        f.write(f"Document {i}:\n")
                        f.write(f"Content: {doc.page_content}\n")
                        f.write(f"Metadata: {doc.metadata}\n")
                        f.write("=" * 50 + "\n")       
                print(f"Retrieved documents saved to {docs_file}")                            
                # Clean and save the LLM response
                cleaning_response = llm.invoke(
                    "Transform this text into a direct informational response without any introductory phrases like 'here's that text' or 'okay'. Remove any AI-like language or meta-commentary. Start directly with the factual content and maintain all the original information in a natural, human-like style:\n\n" + result
                )
                clean_text = cleaning_response.content
                print(clean_text)
                # Generate and play audio
                audio = client.text_to_speech.convert(
                    text=clean_text,
                    voice_id="JBFqnCBsd6RMkjVDRZzb",
                    model_id="eleven_multilingual_v2",
                    output_format="mp3_44100_128",
                )
                audio_file = lang+"_answer.mp3"
                audio_path = os.path.join(os.getcwd(), audio_file)
                # Handle the generator by collecting all chunks
                audio_data = b''
                for chunk in audio:
                    audio_data += chunk
                # Write the complete audio data to file
                with open(audio_path, "wb") as f:
                    f.write(audio_data)
                print(f"\nAudio saved to: {audio_path}")
                
                try:
                    # Load existing cache
                    with open(cache_file_path, 'r', encoding='utf-8') as f:
                        cache = json.load(f)
                    
                    # Add the new question and answer to the cache
                    cache[query] = clean_text
                    
                    # Save the updated cache
                    with open(cache_file_path, 'w', encoding='utf-8') as f:
                        json.dump(cache, f, indent=2)
                    print("Added new question and answer to cache")
                except Exception as e:
                    print(f"Failed to save to cache: {str(e)}")
            else:
                print("No documents retrieved")            
        except Exception as e:
            print(f"Error processing query: {str(e)}")

if __name__ == "__main__":
    load_dotenv()
    client = ElevenLabs(api_key=os.getenv("ELEVENLABS_API_KEY"))
    model_name = "models/gemini-1.5-pro"
    user_query = "co ownership in tunsiia"
    main(model_name,user_query.lower())