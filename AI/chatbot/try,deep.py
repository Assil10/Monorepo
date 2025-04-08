from openai import OpenAI

# Initialize the client with your Groq API key
client = OpenAI(
    api_key="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",
    base_url="https://api.groq.com/openai/v1"
)

# Create a chat completion using the new syntax
response = client.chat.completions.create(
    model="llama3-70b-8192",  # You can also try "llama3-8b-8192"
    messages=[
        {"role": "system", "content": "You are a helpful assistant that speaks English, French, and Arabic."},
        {"role": "user", "content": "Bonjour, peux-tu m'expliquer ce qu'est l'apprentissage automatique ?"}
    ],
    temperature=0.7,
    max_tokens=512
)

# Access the response content with the new structure
print(response.choices[0].message.content)
