from flask import Flask, send_file, request
import os
import time

app = Flask(__name__)

@app.route('/get-audio', methods=['GET'])
def get_audio():
    """
    Endpoint to serve the en_answer.mp3 audio file
    """
    # Start timing
    start_time = time.time()
    
    # Use the specific audio file path
    audio_file_path = r"C:\Users\MSI\Documents\AI korpor\chatbot version 2\en_answer.mp3"
    
    # Check if the file exists
    if not os.path.exists(audio_file_path):
        end_time = time.time()
        processing_time = (end_time - start_time) * 1000  # Convert to milliseconds
        print(f"Request failed in {processing_time:.2f} ms - File not found")
        return f"Audio file not found at: {audio_file_path}", 404
    
    # Get file size for logging
    file_size = os.path.getsize(audio_file_path) / 1024  # Size in KB
    
    # Return the audio file
    response = send_file(audio_file_path, mimetype='audio/mpeg')
    
    # End timing
    end_time = time.time()
    processing_time = (end_time - start_time) * 1000  # Convert to milliseconds
    
    # Log performance metrics
    print(f"Request from {request.remote_addr} processed in {processing_time:.2f} ms - File size: {file_size:.2f} KB")
    
    return response

@app.route('/', methods=['GET'])
def index():
    """
    Simple index route to check if the API is running
    """
    return "Voice API is running. Access /get-audio to get the MP3 file."

if __name__ == '__main__':
    app.run(debug=True)