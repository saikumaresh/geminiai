# from flask import Flask, request, jsonify
# import google.generativeai as genai
# import os

# app = Flask(__name__)

# # Configure the Gemini AI API key
# genai.configure(api_key=os.environ.get("GEMINIAPIKEY"))
# model = genai.GenerativeModel("gemini-1.5-flash")

# @app.route("/search", methods=["POST"])
# def search():
#     try:
#         data = request.get_json()
#         query = data.get("query")

#         if not query:
#             return jsonify({"error": "No query provided"}), 400

#         response = model.generate_content(query)
#         return jsonify({"result": response.text}), 200

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True)

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
        return jsonify({'result': response.text})
    # except Exception as e:
    #     return jsonify({'error': str(e)}), 500
    except Exception as e:
        # Provide detailed error information
        return jsonify({'error': str(e), 'message': 'There was an error processing your request.'}), 500

if __name__ == '__main__':
    app.run(debug=True)
