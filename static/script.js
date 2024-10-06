document.getElementById("searchForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const query = document.getElementById("searchInput").value;
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Loading...";

    try {
        const response = await fetch("http://127.0.0.1:5000/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query: query })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        const data = await response.json();

        if (data && data.result) {
            resultDiv.innerHTML = data.result;
        } else {
            resultDiv.innerHTML = "No result found.";
        }
    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
});
