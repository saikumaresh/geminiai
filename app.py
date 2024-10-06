from flask import Flask, request, jsonify
import google.generativeai as genai
import os

app = Flask(__name__)

# Configure the Gemini AI API key
genai.configure(api_key=os.environ.get("GEMINIAPIKEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

@app.route("/search", methods=["POST"])
def search():
    try:
        data = request.get_json()
        query = data.get("query")

        if not query:
            return jsonify({"error": "No query provided"}), 400

        response = model.generate_content(query)
        return jsonify({"result": response.text}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
