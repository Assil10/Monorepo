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
# Create embeddings using HuggingFaceEmbeddings
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/paraphrase-multilingual-mpnet-base-v2",
    model_kwargs={'device': 'cpu'}
)

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
# Enhanced prompt template
prompt = ChatPromptTemplate.from_template(""" use the following context to answer the user query.
context: {context}
user query: {question}

if you don't know the answer, just say that you don't know, don't try to make up an answer.
""")

# Modify LLM settings for more deterministic output
llm = OllamaLLM(
    model="deepseek-r1:1.5b",
    temperature=0.3,  # Lower temperature for more deterministic outputs
)
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
    

