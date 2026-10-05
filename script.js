const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", searchBook);

async function searchBook() {
    const searchInput = document.getElementById("searchInput").value.trim();
    const message = document.getElementById("message");
    const resultsDiv = document.getElementById("results");

    // Clear old results
    resultsDiv.innerHTML = "";

    if (!searchInput) {
        message.innerHTML = "Please enter a book name.";
        return;
    }

    message.innerHTML = "Loading books...";

    try {
        const res = await fetch(
            `https://openlibrary.org/search.json?q=${searchInput}`
        );

        const data = await res.json();

        console.log(data);

        if (!data.docs || data.docs.length === 0) {
            message.innerHTML = "No books found.";
            return;
        }

        message.innerHTML = "Books found:";

        data.docs.slice(0, 10).forEach((book) => {
            const bookDiv = document.createElement("div");

            bookDiv.classList.add("book");

            const author = book.author_name
                ? book.author_name[0]
                : "Unknown";

            const year = book.first_publish_year
                ? book.first_publish_year
                : "Unknown";

            bookDiv.innerHTML = `
                <h2>${book.title}</h2>
                <p>Author: ${author}</p>
                <p>First Published: ${year}</p>
            `;

            resultsDiv.appendChild(bookDiv);
        });

    } catch (error) {
        console.error(error);
        message.innerHTML = "Something went wrong. Please try again.";
    }
}