from flask import Flask, render_template, request
import google.generativeai as genai

app = Flask(__name__)

# Replace with your Gemini AI API key
os.environ["API_KEY"] = "YOUR_API_KEY"
genai.configure(api_key=os.environ["API_KEY"])

@app.route("/")
def index():
  return render_template("index.html")

@app.route("/search", methods=["POST"])
def search():
  query = request.form["query"]
  # Use Gemini AI's search functionality
  results = genai.search(query)
  return render_template("search.html", results=results)

if __name__ == "__main__":
  app.run()