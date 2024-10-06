const API_KEY = "AIzaSyAn_v59B4R3YS9jrKRpUwfsRGa9rMSHTtU";
import { GoogleGenerativeAI } from "@google/generative-ai";

document.getElementById("searchForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const query = document.getElementById("searchInput").value;
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Loading...";

    try {
        // Configure the AI model
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Generate content based on the user's query
        const response = await model.generateContent(query);

        if (response && response.response) {
            // Get the response text
            let formattedResponse = response.response.text();

            // Format bullet points by converting "* " followed by text to list items
            formattedResponse = formattedResponse
                .replace(/\* ([^\n]+)/g, '<li>$1</li>') // Convert bullet points to list items
                .replace(/\n/g, '<br>'); // Convert newlines to line breaks

            // Wrap the list items with <ul> tag if there are any list items
            if (formattedResponse.includes('<li>')) {
                formattedResponse = formattedResponse.replace(/(<li>.+?<\/li>)/g, '<ul>$1</ul>');
            }

            // Format URLs as clickable links
            formattedResponse = formattedResponse.replace(
                /(https?:\/\/[^\s]+)/g,
                '<a href="$1" target="_blank">$1</a>'
            );

            // Format website names and suggestions with bold text
            formattedResponse = formattedResponse.replace(
                /\*\*(.*?)\*\*/g,
                '<strong>$1</strong>'
            );

            // Set the formatted response as HTML
            resultDiv.innerHTML = formattedResponse;
        } else {
            resultDiv.innerHTML = "No valid response found.";
        }
    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
});
