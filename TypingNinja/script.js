
const $ = (id) => document.getElementById(id);

const words = [
    "code", "react", "ninja", "speed", "brain",
    "focus", "learn", "logic", "array", "stack",
    "class", "object", "function", "future", "design",
    "developer", "javascript", "computer", "keyboard",
    "website", "program", "project", "network", "database",
    "browser", "digital", "python", "variable", "algorithm"
];

let score = 0;
let lives = 3;
let combo = 0;
let level = 1;
let seconds = 30;
let correctWords = 0;
let totalAttempts = 0;
let correctCharacters = 0;
let totalCharacters = 0;
let running = false;

let timerInterval;
let spawnInterval;
let animationFrame;
let lastSpawn = 0;
let wordId = 0;
let activeWords = [];

let bestScore = Number(localStorage.getItem("typingNinjaBest")) || 0;

$("bestScore").textContent = bestScore;

function startGame() {
    clearInterval(timerInterval);
    clearInterval(spawnInterval);
    cancelAnimationFrame(animationFrame);

    activeWords = [];
    $("wordLayer").innerHTML = "";

    score = 0;
    lives = 3;
    combo = 0;
    level = 1;
    seconds = 30;
    correctWords = 0;
    totalAttempts = 0;
    correctCharacters = 0;
    totalCharacters = 0;
    lastSpawn = 0;
    wordId = 0;

    running = true;

    $("score").textContent = score;
    $("wpm").textContent = "0";
    $("accuracy").textContent = "100%";
    $("combo").textContent = combo;
    $("lives").textContent = lives;
    $("level").textContent = level;
    $("time").textContent = seconds;
    $("timerBar").style.width = "100%";
    $("timerBar").style.background = "#45e77b";

    $("welcome").style.display = "none";
    $("resultScreen").style.display = "none";
    $("gameMessage").textContent = "";

    $("wordInput").disabled = false;
    $("submitBtn").disabled = false;
    $("wordInput").value = "";
    $("wordInput").focus();

    timerInterval = setInterval(updateTimer, 1000);
    animationFrame = requestAnimationFrame(gameLoop);
}

function updateTimer() {
    if (!running) return;

    seconds--;

    $("time").textContent = seconds;
    $("timerBar").style.width = `${(seconds / 30) * 100}%`;

    if (seconds <= 10) {
        $("timerBar").style.background = "#ff4d6d";
    }

    updateStats();

    if (seconds <= 0) {
        endGame("⏰ Time is up!");
    }
}

function gameLoop(timestamp) {
    if (!running) return;

    if (timestamp - lastSpawn > Math.max(650, 1600 - level * 120)) {
        spawnWord();
        lastSpawn = timestamp;
    }

    const areaHeight = $("gameArea").clientHeight;
    const areaWidth = $("gameArea").clientWidth;

    activeWords.forEach((word) => {
        if (!word.element.isConnected) return;

        word.y += word.speed;
        word.element.style.top = `${word.y}px`;

        const maxLeft = Math.max(
            0,
            areaWidth - word.element.offsetWidth
        );

        word.element.style.left =
            `${Math.min(word.x, maxLeft)}px`;

        if (word.y + word.element.offsetHeight >= areaHeight) {
            removeWord(word.id);
            loseLife("💨 A word escaped!");
        }
    });

    if (running) {
        animationFrame = requestAnimationFrame(gameLoop);
    }
}

function spawnWord() {
    const area = $("gameArea");
    const element = document.createElement("div");

    const text = words[Math.floor(Math.random() * words.length)];

    element.className = "falling-word";
    element.textContent = text;

    $("wordLayer").appendChild(element);

    const maxLeft = Math.max(
        0,
        area.clientWidth - element.offsetWidth - 10
    );

    const x = 5 + Math.random() * Math.max(0, maxLeft - 5);

    element.style.left = `${Math.min(x, maxLeft)}px`;

    const word = {
        id: ++wordId,
        text,
        x,
        y: 0,
        speed: 0.7 + level * 0.22,
        element
    };

    activeWords.push(word);
}

function removeWord(id) {
    const index = activeWords.findIndex((word) => word.id === id);

    if (index === -1) return;

    activeWords[index].element.remove();
    activeWords.splice(index, 1);
}

$("typingForm").addEventListener("submit", (event) => {
    event.preventDefault();

    if (!running) return;

    const input = $("wordInput");
    const typed = input.value.trim().toLowerCase();

    if (!typed) return;

    totalAttempts++;
    totalCharacters += typed.length;

    const match = activeWords.find(
        (word) => word.text.toLowerCase() === typed
    );

    if (match) {
        correctCharacters += match.text.length;
        correctWords++;
        combo++;

        const points = 10 + Math.min(combo - 1, 10) * 2;
        score += points;

        match.element.classList.add("hit");

        setTimeout(() => {
            removeWord(match.id);
        }, 100);

        level = Math.floor(correctWords / 5) + 1;

        $("gameMessage").textContent =
            `⚡ Perfect! +${points} points`;

    } else {
        combo = 0;

        $("gameMessage").textContent = "❌ Word not found!";

        setTimeout(() => {
            if (running) $("gameMessage").textContent = "";
        }, 500);
    }

    input.value = "";
    updateStats();
});

function loseLife(message) {
    if (!running) return;

    lives--;
    combo = 0;

    $("lives").textContent = lives;
    $("combo").textContent = combo;
    $("gameMessage").textContent = message;

    setTimeout(() => {
        if (running) $("gameMessage").textContent = "";
    }, 600);

    if (lives <= 0) {
        endGame("❤️ No lives left!");
    }
}

function updateStats() {
    $("score").textContent = score;
    $("combo").textContent = combo;
    $("level").textContent = level;

    const elapsed = 30 - seconds;
    const wpm = elapsed > 0
        ? Math.round((correctCharacters / 5) / (elapsed / 60))
        : 0;

    const accuracy = totalCharacters > 0
        ? Math.round((correctCharacters / totalCharacters) * 100)
        : 100;

    $("wpm").textContent = wpm;
    $("accuracy").textContent = `${accuracy}%`;

    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("typingNinjaBest", bestScore);
        $("bestScore").textContent = bestScore;
    }
}

function endGame(reason) {
    if (!running) return;

    running = false;

    clearInterval(timerInterval);
    clearInterval(spawnInterval);
    cancelAnimationFrame(animationFrame);

    $("wordInput").disabled = true;
    $("submitBtn").disabled = true;

    const elapsed = Math.max(1, 30 - seconds);
    const finalWpm = Math.round((correctCharacters / 5) / (elapsed / 60));

    const accuracy = totalCharacters > 0
        ? Math.round((correctCharacters / totalCharacters) * 100)
        : 100;

    $("resultTitle").textContent = "Game Over!";
    $("resultText").textContent = reason;
    $("finalScore").textContent = score;
    $("finalWpm").textContent = finalWpm;
    $("finalAccuracy").textContent = `${accuracy}%`;

    $("resultScreen").style.display = "flex";
}

$("startBtn").addEventListener("click", startGame);
$("restartBtn").addEventListener("click", startGame);
