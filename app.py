from flask import Flask, request, jsonify
import google.generativeai as genai
import os

app = Flask(__name__)

# Configure the Gemini AI API
genai.configure(api_key=os.environ["API_KEY"])
model = genai.GenerativeModel("gemini-1.5-flash")

@app.route('/search', methods=['POST'])
def search():
    data = request.get_json()
    query = data.get('query', '')

    if not query:
        return jsonify({"result": "No query provided"}), 400

    try:
        response = model.generate_content(query)
        return jsonify({"result": response.text})
    except Exception as e:
        return jsonify({"result": f"Error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
