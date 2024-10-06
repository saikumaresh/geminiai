document.getElementById("searchForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const query = document.getElementById("searchInput").value;

    fetch("/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query }),
    })
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("result").textContent = data.result;
        })
        .catch((error) => {
            document.getElementById("result").textContent = "Error: " + error.message;
        });
});
