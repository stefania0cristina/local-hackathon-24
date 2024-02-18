function toggleDarkMode() {
    const body = document.body;
    const catOutline = document.getElementById("catOutline");

    body.classList.toggle("dark-mode");

    const isDarkMode = body.classList.contains("dark-mode");
    catOutline.src = isDarkMode ? "cat-white-outline.png" : "cat-black-outline.png";
}

function sendPrompt() {
    const userInput = document.getElementById("userPrompt").value.toLowerCase();
    const chatHistory = document.getElementById("chatHistory");

    chatHistory.innerHTML += `<div class="user-message">${userInput}</div>`;

    //document.getElementById("userPrompt").value = "";

    const replyGetter = new XMLHttpRequest();
    replyGetter.open("POST", "http://kestrel.gay/catbot/next_gif.url");
    replyGetter.setRequestHeader("Content-Type", "application/json");

    replyGetter.onload = function () {
        if (replyGetter.status === 200) {
            const catGifUrl = replyGetter.responseText;
            chatHistory.innerHTML += `<div class="cat-response"><img src="${catGifUrl}" alt="Cat Response"></div>`;
        } else {
            console.error("Error fetching cat GIF:", replyGetter.statusText);
        }
    };

    replyGetter.onerror = function () {
        console.error("Network error occurred while fetching cat GIF.");
    };

    replyGetter.send(JSON.stringify({ userInput }));
}
