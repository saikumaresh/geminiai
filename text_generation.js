// import { GoogleGenerativeAI } from "@google/generative-ai";

// document.getElementById("searchForm").addEventListener("submit", async function (event) {
//     event.preventDefault();

//     const query = document.getElementById("searchInput").value;
//     const resultDiv = document.getElementById("result");
//     resultDiv.innerHTML = "Loading...";

//     try {
//         // Configure the AI model
//         const API_KEY = "AIzaSyAn_v59B4R3YS9jrKRpUwfsRGa9rMSHTtU";
//         const genAI = new GoogleGenerativeAI(API_KEY);
//         const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//         // Generate content based on the user's query
//         const response = await model.generateContent(query);

//         // Check if the response is valid and display the result
//         if (response && response.response) {
//             resultDiv.innerHTML = response.response.text();
//         } else {
//             resultDiv.innerHTML = "No valid response found.";
//         }
//     } catch (error) {
//         // Display the exact error message
//         resultDiv.innerHTML = `Error: ${error.message}`;
//     }
// });
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

        if (response && response.response) {
            // Format the response to include HTML elements
            let formattedResponse = response.response.text();
            formattedResponse = formattedResponse
                .replace(/(\* [^:]+:)/g, '<strong>$1</strong>') // Bold the parts before the colon.
                .replace(/\* (.+)/g, '<li>$1</li>')             // Convert bullet points to list items.
                .replace(/\n/g, '<br>');                        // Convert newlines to line breaks.

            // Wrap the list items with <ul> tag
            formattedResponse = formattedResponse.replace(/(<li>.+<\/li>)/g, '<ul>$1</ul>');

            // Set the formatted response as HTML
            resultDiv.innerHTML = formattedResponse;
        } else {
            resultDiv.innerHTML = "No valid response found.";
        }
    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
});
