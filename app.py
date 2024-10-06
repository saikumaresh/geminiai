from flask import Flask, render_template, request
import google.generativeai as genai

app = Flask(__name__)

# Access the API key from the GitHub Actions secret
api_key = os.environ.get('GEMINIAPIKEY')

# You can add a check for the existence of the secret
if not api_key:
    raise Exception("Missing GEMINI_AI_API_KEY environment variable")

genai.configure(api_key=api_key)

@app.route("/")
def index():
  return render_template("index.html")

@app.route("/search", methods=["POST"])
def search():
  query = request.form["query"]
  # Use Gemini AI's search functionality
  results = genai.search(query)
  return render_template("search_results.html", results=results)

if __name__ == "__main__":
  app.run()