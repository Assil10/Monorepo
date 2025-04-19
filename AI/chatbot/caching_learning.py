import json
import os
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def find_similar_question(query, cache_file_path, threshold=0.8,update: bool = False):
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

# Example usage
if __name__ == "__main__":
    # Create paths relative to the current script
    current_dir = os.path.dirname(os.path.abspath(__file__))
    cache_dir = os.path.join(current_dir, "data")
    cache_file = os.path.join(cache_dir, "question_cache.json")
    
    # Check if cache file exists
    if not os.path.exists(cache_file):
        # Create directory if it doesn't exist
        if not os.path.exists(cache_dir):
            os.makedirs(cache_dir)
            print(f"Created directory: {cache_dir}")
        
        # Example cache data - you would normally load this from the file
        example_cache = {
            "What is co-ownership in Tunisia?": "Co-ownership in Tunisia is regulated by Law No. 77-3 dated February 1, 1977, which defines the rights and obligations of co-owners in shared properties.",
            "How to register property in Tunisia?": "To register property in Tunisia, you need to submit an application to the Land Registry Office with the property deed, ID documents, and pay registration fees.",
            "What are the property taxes in Tunisia?": "Property taxes in Tunisia include a real estate tax (1-2% of property value) and a local tax based on rental value.",
            "Can foreigners buy property in Tunisia?": "Yes, foreigners can buy property in Tunisia but need authorization from the regional governor for agricultural land."
        }
        
        # Save example cache to file
        with open(cache_file, 'w', encoding='utf-8') as f:
            json.dump(example_cache, f, indent=2)
        print(f"Created cache file: {cache_file}")
    else:
        print(f"Using existing cache file: {cache_file}")
    
    # Our query
    query = "hello there"
    
    # Find similar question
    result = find_similar_question(query, cache_file)
    
    # Display result
    if result:
        print(f"Found similar question: '{result['question']}'")
        print(f"Similarity score: {result['similarity']:.2f}")
        print(f"Answer: {result['answer']}")
    else:
        print("No similar question found in cache.")