const API_URL = "https://api.rss2json.com/v1/api.json?rss_url=https://www.theverge.com/rss/index.xml";

async function fetchArticles() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const articles = data.items.filter(article => {
            const publishedDate = new Date(article.pubDate);
            return publishedDate >= new Date("2022-01-01");
        });

        articles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

        const articlesList = document.getElementById("articles");
        articles.forEach(article => {
            const publishedDate = new Date(article.pubDate);
            const formattedDate = publishedDate.toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
            });
            const formattedTime = publishedDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
            });

            const li = document.createElement("li");
            li.innerHTML = `<a href="${article.link}" target="_blank">${article.title}</a> - ${formattedDate} at ${formattedTime}`;
            articlesList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching articles:", error);
    }
}

fetchArticles();
