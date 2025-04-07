# Import necessary packages
from langchain_chroma import Chroma
from langchain_ollama import OllamaLLM
from langchain_huggingface import HuggingFaceEmbeddings
# Document processing and retrieval  
from langchain.text_splitter import RecursiveCharacterTextSplitter  # Splits text into smaller chunks for better embedding and retrieval
from langchain.schema import Document
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
import re  # Provides tools for working with regular expressions, useful for text cleaning and pattern matching
import json
import os
from langdetect import detect
from elevenlabs.client import ElevenLabs
from elevenlabs import play
from dotenv import load_dotenv
from openai import OpenAI
client = OpenAI(
    api_key="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",
    base_url="https://api.groq.com/openai/v1"
)

client = ElevenLabs( api_key="sk_a61da3363be082c5bbd7ca9945168c6f1e1e863a2980d804")

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

#load data
data_en = load_data('data_en.json')
data_fr = load_data('data_fr.json')
data_ar = load_data('data_ar.json')
# Create embeddings using HuggingFaceEmbeddings
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/paraphrase-multilingual-mpnet-base-v2",
    model_kwargs={'device': 'cpu'}
)

# Define your persist directory
persist_directory_en = "./chroma_db_en"
persist_directory_fr = "./chroma_db_fr"
persist_directory_ar = "./chroma_db_ar"
vectorstore_en = load_persist_directory(persist_directory_en,embeddings,data_en)
vectorstore_fr = load_persist_directory(persist_directory_fr,embeddings,data_fr)
vectorstore_ar = load_persist_directory(persist_directory_ar,embeddings,data_ar)


# Enhanced prompt template
# Enhanced prompt template
# Language-specific prompts
# Update Arabic prompt to better handle context alignment
prompts = {
    "en": ChatPromptTemplate.from_template("""Based on the following context, provide a detailed answer to the user's query.
Context: {context}
User Query: {question}

Instructions:
1. Extract the relevant answer from the ANSWER section in the context
2. Present the information in a clear, structured way
3. Use the exact information from the context without adding external knowledge

If no relevant information is found, respond with: "I don't have enough information to answer this question."
"""),
    
    "fr": ChatPromptTemplate.from_template("""En vous basant sur le contexte suivant, fournissez une réponse détaillée à la question en français.
Contexte: {context}
Question: {question}

Instructions:
1. Extrayez la réponse pertinente de la section RÉPONSE du contexte
2. Répondez UNIQUEMENT en français
3. Utilisez exactement les informations du contexte
4. Gardez la réponse claire et structurée

Si aucune information pertinente n'est trouvée, répondez: "Je n'ai pas assez d'informations pour répondre à cette question."
"""),
    
    "ar": ChatPromptTemplate.from_template("""أجب فقط باللغة العربية. استخدم المعلومات الموجودة في السياق أدناه حرفياً.

السياق: {context}
السؤال: {question}

تعليمات واضحة:
1. ابحث عن القسم المسمى "ANSWER" في السياق واستخرج المعلومات منه
2. قدم إجابة مفصلة باللغة العربية فقط
3. استخدم نفس المعلومات والمصطلحات الموجودة في السياق
4. لا تضيف معلومات من خارج السياق المعطى
5. يجب أن تكون إجابتك باللغة العربية فقط ولا تستخدم أي لغة أخرى

إذا لم تجد معلومات كافية، أجب فقط بـ: "ليس لدي معلومات كافية للإجابة على هذا السؤال."
""")
}

# Adjust LLM settings for better Arabic context handling
llm = OllamaLLM(
    model="deepseek-r1:1.5b",
    temperature=0.1,
    model_kwargs={
        "top_p": 0.9,
        "num_ctx": 2048  # Increase context window
    }
)
query = "La copropriété en Tunisi"
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
    with open(docs_file, "w", encoding="utf-8") as f:
        f.write(f"Query: {query}\n\n")
        f.write("Retrieved Documents:\n")
        for i, doc in enumerate(retrieved_docs, 1):
            f.write(f"Document {i}:\n")
            f.write(f"Content: {doc.page_content}\n")
            f.write(f"Metadata: {doc.metadata}\n")
            f.write("=" * 50 + "\n")
    
    print(f"Retrieved documents saved to {docs_file}")
            
    # Print retrieved documents and their metadata
    if retrieved_docs:
        print("Retrieved Documents:")
        for doc in retrieved_docs:
            print(f"Content: {doc.page_content}")
            print(f"Metadata: {doc.metadata}")
            print("=" * 50)            
        
        # Clean and save the LLM response
        clean_text = re.sub(r"<think>.*?</think>", "", result, flags=re.DOTALL)
        
        # Save response to a text file
        response_file = "response.txt"
        with open(response_file, "w", encoding="utf-8") as f:
            f.write(clean_text)
        print(f"\nResponse saved to {response_file}")
        
        # Generate and play audio
        audio = client.text_to_speech.convert(
            text=clean_text,
            voice_id="JBFqnCBsd6RMkjVDRZzb",
            model_id="eleven_multilingual_v2",
            output_format="mp3_44100_128",
        )
        play(audio)
        
        # Still try to print for terminals that support it
        print("\nLLM Response (may not display correctly in PowerShell):")
        print(clean_text)

    else:
        print("No documents retrieved")            
except Exception as e:
    print(f"Error processing query: {str(e)}")   
print("____________________________")