const quotes = [
    "Believe in yourself and keep moving forward.",
    "Small progress is still progress.",
    "Don't stop when you are tired. Stop when you are done.",
    "Code. Learn. Build. Repeat.",
    "Every expert was once a beginner.",
    "Success comes from consistency.",
    "Your future depends on what you do today.",
    "Don't fear mistakes. Learn from them."
];

function generateQuote() {

    let randomIndex = Math.floor(Math.random() * quotes.length);

    let quoteText = document.getElementById("quoteText");

    quoteText.innerText = quotes[randomIndex];
}