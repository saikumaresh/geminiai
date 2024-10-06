import { GoogleGenerativeAI } from "@google/generative-ai";

document.getElementById("searchForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const query = document.getElementById("searchInput").value;
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Loading...";

    try {
        // Configure the AI model
        const API_KEY = "AIzaSyAn_v59B4R3YS9jrKRpUwfsRGa9rMSHTtU";
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Generate content based on the user's query
        const response = await model.generateContent(query);

        // Check if the response is valid and display the result
        if (response && response.response) {
            resultDiv.innerHTML = response.response.text();
        } else {
            resultDiv.innerHTML = "No valid response found.";
        }
    } catch (error) {
        // Display the exact error message
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
});
