# Import necessary packages
from langchain_chroma import Chroma
from langchain_ollama import OllamaLLM, OllamaEmbeddings
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
import shutil

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

# Language Detection Function
def detect_language(text):
    try:
        lang = detect(text)
        print(f"Detected language: {lang}")
        return lang if lang in ["en", "fr", "ar"] else "None"
    except Exception:
        return "None"

#load data
data = load_data('data.json')
# Create embeddings using OllamaEmbeddings 
embeddings = OllamaEmbeddings(model="mistral")

# Define your persist directory
persist_directory = "./chroma_db"
if os.path.exists(persist_directory):
    print("Vectorstore exist , loading ...")
    vectorstore = Chroma(persist_directory=persist_directory, embedding_function=embeddings)
    print("Vectoresore is loaded")
else:
    print("Creating new vectorstore")
    vectorstore = Chroma.from_documents(documents=data, embedding=embeddings, persist_directory=persist_directory)
    print("New vectorstore created and persisted!")



# Enhanced prompt template
prompt = ChatPromptTemplate.from_template("""
You are a legal expert on Tunisian real estate law. Answer the question using ONLY the provided context.
If the context doesn't contain the answer, say "I don't have information about this specific aspect of Tunisian law."

Context: {context}

Question: {question}

Answer in clear, professional language:
""")


llm = OllamaLLM(model="mistral", temperature=0.3)
#retriever
retriever = vectorstore.as_retriever(search_type="similarity",search_kwargs={"k":2})
chain = (
    {"context":retriever,"question":RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)
user_queries=["Co-Ownership In Tunisian Law","Understanding Land Classification In Tunisia","Registered And Unregistered Property In Tunisian Law"]


for query in user_queries:
    print(f"\nQuery: {query}")
    print("____________________________")
    
    try:
        # Get the LLM response
        result = chain.invoke(query)
        
        # Get the retrieved documents separately
        retrieved_docs = vectorstore.similarity_search(query, k=2)
        
        # Print retrieved documents and their metadata
        if retrieved_docs:
            print("Retrieved Documents:")
            for doc in retrieved_docs:
                print(f"Content: {doc.page_content}")
                print(f"Metadata: {doc.metadata}")
                print("=" * 50)
            
            # Print the LLM's response
            clean_text = re.sub(r"<think>.*?</think>", "", result, flags=re.DOTALL)
            print("\nLLM Response:")
            print(clean_text)
        else:
            print("No documents retrieved")
            
    except Exception as e:
        print(f"Error processing query: {str(e)}")
    
    print("____________________________")
    

