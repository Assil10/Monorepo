import google.generativeai as genai

# Configure the API key
genai.configure(api_key="AIzaSyCUMRVLg9NWqTbC39Q9SqrUJdZNa-TfpS4")  # Replace with your actual API key

# List available models
models = genai.list_models()
for model in models:
    ch=model.name
    model_name = ch.split("/")[1]
    print(model_name)  # This will print: gemini-2.5-pro-exp-03-25   