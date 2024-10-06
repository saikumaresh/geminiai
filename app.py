from flask import Flask, request, jsonify
import google.generativeai as genai
import os

app = Flask(__name__)

# Configure the Gemini API
genai.configure(api_key="AIzaSyAn_v59B4R3YS9jrKRpUwfsRGa9rMSHTtU")
model = genai.GenerativeModel("gemini-1.5-flash")

@app.route('/api/search', methods=['POST'])
def search():
    data = request.get_json()
    if 'query' not in data:
        return jsonify({'error': 'No query provided'}), 400

    try:
        response = model.generate_content(data['query'])
        # response = model.generate_content("What is ChatGPT?")
        return jsonify({'result': response.text})
    except Exception as e:
        # Provide detailed error information
        return jsonify({'error': str(e), 'message': 'There was an error processing your request.'}), 500

if __name__ == '__main__':
    app.run(debug=True)