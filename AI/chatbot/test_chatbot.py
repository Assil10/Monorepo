from elevenlabs.types import llm
import google.generativeai as genai
# Import necessary packages
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
from elevenlabs import play
from langchain_google_genai import ChatGoogleGenerativeAI

# Configure the API key
client = ElevenLabs( api_key="sk_cdfd07be08188b0452860ba1c855e9ab48bcdae484b9b8cd")
genai.configure(api_key="AIzaSyCUMRVLg9NWqTbC39Q9SqrUJdZNa-TfpS4")
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
def list_of_models():
    # List available models
    models = genai.list_models()
    lst=[]
    for model in models:
        lst.append(model.name)
    return lst
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

models_list=list_of_models()
queries = ["The Legal Requirements For Real Estate Development In Tunisia?",

"What regulatory compliance is required for property development projects in Tunisia?",

"What permits and legal standards must be followed when developing real estate in Tunisia"

]
for q in range(len(queries)):
    query=queries[q]
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
    retriever = vectorstore.as_retriever(search_type="similarity",search_kwargs={"k":2})
    retrieved_docs = vectorstore.similarity_search(query, k=2)     # Save retrieved documents to a text file
    docs_file=lang+"_retrieved_documents_query"+str(q)+".txt"
    with open(docs_file, "w", encoding="utf-8") as f:
        f.write(f"Query: {query}\n\n")
        f.write("Retrieved Documents:\n")
        for i, doc in enumerate(retrieved_docs, 1):
            f.write(f"Document {i}:\n")
            f.write(f"Content: {doc.page_content}\n")
            f.write(f"Metadata: {doc.metadata}\n")
            f.write("=" * 50 + "\n")
        print(f"Retrieved documents saved to {docs_file}")
        print("query:",query)
    """   
    if retrieved_docs:
        for model in models_list:
            try:
                llm = ChatGoogleGenerativeAI(model=model,google_api_key="AIzaSyCUMRVLg9NWqTbC39Q9SqrUJdZNa-TfpS4")
                chain = (
                    {"context":retriever,"question":RunnablePassthrough()}
                    | prompt
                    | llm
                    | StrOutputParser()
                )
                # Get the LLM response
                result = chain.invoke(query)                               
                cleaning_response = llm.invoke(
                    "Transform this text into a direct informational response without any introductory phrases like 'here's that text' or 'okay'. Remove any AI-like language or meta-commentary. Start directly with the factual content and maintain all the original information in a natural, human-like style:\n\n" + result
                )
                clean_text = cleaning_response.content                        
                # Save response to a text file
                model_name=model.split("/")[1] 
                response_file = model_name+"_response_"+"query"+str(q)+"_"+lang+".txt"
                with open(response_file, "w", encoding="utf-8") as f:
                    f.write(clean_text)
                print(f"\nResponse saved to {response_file}")
                # Still try to print for terminals that support it
                print("\nLLM Response")
                print(clean_text)
                print("_____________")
            except Exception as e:
                print("no Model found")
    else:
        print("No documents retrieved")
    """