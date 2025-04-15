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

def load_data(json_file):
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
    return data

def load_persist_directory(persist_directory,embeddings,data):
    if os.path.exists(persist_directory):
        print("Vectorstore exist , loading ...")
        vectorstore = Chroma(persist_directory=persist_directory, embedding_function=embeddings)
        print("Vectoresore is loaded")
    else:
        print("Creating new vectorstore")
        vectorstore = Chroma.from_documents(documents=data, embedding=embeddings, persist_directory=persist_directory)
        print("New vectorstore created and persisted!")
    return vectorstore
# Language Detection Function
def detect_language(text):
    try:
        lang = detect(text)
        print(f"Detected language: {lang}")
        return lang if lang in ["en", "fr", "ar"] else "None"
    except Exception:
        return "None"
def main(model_name,query):
    #load data
    data_en = load_data('data_en.json')
    data_fr = load_data('data_fr.json')
    data_ar = load_data('data_ar.json')
    # Create embeddings using HuggingFaceEmbeddings
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/paraphrase-multilingual-mpnet-base-v2",
        model_kwargs={'device': 'cpu'}
    )

    # persist directory : where we store the vectorstore
    persist_directory_en = "./chroma_db_en"
    persist_directory_fr = "./chroma_db_fr"
    persist_directory_ar = "./chroma_db_ar"
    vectorstore_en = load_persist_directory(persist_directory_en,embeddings,data_en)
    vectorstore_fr = load_persist_directory(persist_directory_fr,embeddings,data_fr)
    vectorstore_ar = load_persist_directory(persist_directory_ar,embeddings,data_ar)
    #prompts for the llm
    prompts = {
        "en": ChatPromptTemplate.from_template("""Based on the following context, provide a detailed answer to the user's query.
    Context: {context}
    User Query: {question}

    Instructions:
    1. Extract the relevant answer from the ANSWER section in the context
    2. Present the information in a clear, structured way and please don't add any external output other than the information.
    3. Use the exact information from the context without adding external knowledge

    If no relevant information is found, respond with: "I don't have enough information to answer this question."
    """),
        
        "fr": ChatPromptTemplate.from_template("""En vous basant sur le contexte suivant, fournissez une réponse détaillée à la question en français.
    Contexte: {context}
    Question: {question}

    Instructions:
    1. Extrayez la réponse pertinente de la section RÉPONSE du contexte
    2. Répondez UNIQUEMENT en français
    3. Utilisez exactement les informations du contexte et n'ajoutez pas d'informations externes
    4. Gardez la réponse claire et structurée

    Si aucune information pertinente n'est trouvée, répondez: "Je n'ai pas assez d'informations pour répondre à cette question."
    """),
        
        "ar": ChatPromptTemplate.from_template("""أجب فقط باللغة العربية. استخدم المعلومات الموجودة في السياق أدناه حرفياً.

    السياق: {context}
    السؤال: {question}

    تعليمات واضحة:
    1. ابحث عن القسم المسمى "ANSWER" في السياق واستخرج المعلومات منه
    2. يجب أن تكون إجابتك باللغة العربية فقط ولا تستخدم أي لغة أخرى
    3. استخدم نفس المعلومات والمصطلحات الموجودة في السياق
    4. لا تضيف معلومات من خارج السياق المعطى

    إذا لم تجد معلومات كافية، أجب فقط بـ: "ليس لدي معلومات كافية للإجابة على هذا السؤال."
    """)
    }
    #define our model
    google_key=os.getenv("google_api_key")
    if not google_key:
        print("Google API key not found in environment variables.")
        return
    llm = ChatGoogleGenerativeAI(model=model_name,google_api_key=google_key)
    print(f"\nQuery: {query}")
    print("____________________________")
    lang=detect_language(query)
    if lang=="en":
        vectorstore=vectorstore_en
        prompt=prompts["en"]
    elif lang=="fr":
        vectorstore=vectorstore_fr
        prompt=prompts["fr"]
    elif lang=="ar":
        print("arabic prompt is used")
        vectorstore=vectorstore_ar
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
        else:
            print("No documents retrieved")            
    except Exception as e:
        print(f"Error processing query: {str(e)}")   
if __name__ == "__main__":
    load_dotenv()
    client = ElevenLabs(api_key=os.getenv("ELEVENLABS_API_KEY"))
    model_name = "models/gemini-1.5-pro"
    user_query = "co ownership"
    main(model_name,user_query)