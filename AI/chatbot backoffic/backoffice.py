import os
import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
# Replace Google Gemini with Ollama
from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

def init_llm():
    """Initialize the local language model using Ollama"""
    return OllamaLLM(
        model="mistral",  # Using deepseek model
        temperature=0.1    # Low temperature for more deterministic SQL generation
    )

def create_db_connection():
    """Create connection to MySQL database"""
    try:
        return mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="retail_management"
        )
    except Error as e:
        print(f"Database connection failed: {e}")
        exit(1)

def get_user_privileges(connection, user_id):
    """Get user role and store access"""
    cursor = connection.cursor()
    cursor.execute("""
        SELECT u.role, s.id 
        FROM users u
        LEFT JOIN stores s ON u.store_id = s.id
        WHERE u.id = %s
    """, (user_id,))
    result = cursor.fetchone()
    cursor.close()
    
    if not result:
        raise ValueError(f"User ID {user_id} not found")
        
    return {
        'role': result[0],
        'store_id': result[1]
    }

def generate_sql_query(llm, schema, request):
    """Generate SQL query from user request"""
    prompt = ChatPromptTemplate.from_template("""
    Given this database schema:
    {schema}
    
    User request: {request}
    
    Generate a MySQL query that:
    1. Works with the schema
    2. Follows MySQL syntax
    3. Returns exactly what was requested
    4. Does NOT include any markdown formatting, backticks, or SQL comments
    
    Return ONLY the raw SQL query.
    """)
    
    chain = prompt | llm | StrOutputParser()
    sql = chain.invoke({
        "schema": schema,
        "request": request
    })
    
    # Clean up any markdown formatting that might be present
    sql = sql.replace('```sql', '').replace('```', '').strip()
    return sql

def execute_query(connection, query):
    """Execute SQL query and return results"""
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        results = cursor.fetchall()
        return {'success': True, 'data': results}
    except Error as e:
        return {'success': False, 'error': str(e)}
    finally:
        cursor.close()

def format_response(llm, data):
    """Convert SQL results to natural language"""
    prompt = ChatPromptTemplate.from_template("""
    Convert these database results into a natural response:
    
    Data: {data}
    
    Guidelines:
    - Keep it under 2 sentences
    - Use simple language
    - Highlight key numbers
    - Don't mention SQL or databases
    
    Response:
    """)
    
    chain = prompt | llm | StrOutputParser()
    return chain.invoke({"data": data})

def process_request(user_request, user_id):
    """Main function to process user requests"""
    llm = init_llm()
    connection = create_db_connection()
    
    try:
        print(f"Processing request: {user_request}")
        
        # Get user privileges
        privileges = get_user_privileges(connection, user_id)
        
        # Build schema context with privilege info
        schema = f"""
        User role: {privileges['role']}
        Store ID: {privileges['store_id'] or 'All stores'}
        
        Tables:
        - users (id, username, role, store_id)
        - products (id, name, price, stock, store_id)
        - stores (id, name, location)
        - orders (id, user_id, product_id, quantity)
        - suppliers (id, name, contact_email)
        
        Access rules:
        - 'user' role: Can only see products in their store
        - 'admin' role: Can see all data in their store
        - 'super_admin' role: Can see all data across stores
        """
        
        # Generate and execute query
        max_attempts = 5
        for attempt in range(max_attempts):
            sql_query = generate_sql_query(llm, schema, user_request)
            print(f"SQL Query: {sql_query}")
            
            result = execute_query(connection, sql_query)
            
            if result['success']:
                print(f"Query results: {result['data']}")
                return format_response(llm, result['data'])
            
            print(f"Query failed: {result['error']}")
            # Modify request to help model fix the error
            user_request = f"Fix this query that failed: {sql_query}. Original request: {user_request}"
        
        return "I couldn't find that information after several attempts."
    
    finally:
        connection.close()

if __name__ == "__main__":
    # Example usage
    user_request = "What's the total value of all shoe inventory under $100 grouped by store location?"
    user_id = 3  # Example user ID
    
    response = process_request(user_request, user_id)
    print("\nResponse:")
    print(response)