
let score = 0;
let highScore = Number(localStorage.getItem("mathRushBest")) || 0;
let lives = 3;
let combo = 0;
let level = 1;
let correctAnswer = 0;
let timeLeft = 10;
let gameRunning = false;

let timerInterval;
let nextQuestionTimeout;
let specialTimeout;
let questionToken = 0;

const $ = (id) => document.getElementById(id);

$("highScore").textContent = highScore;

function startGame() {
    clearInterval(timerInterval);
    clearTimeout(nextQuestionTimeout);
    clearTimeout(specialTimeout);

    score = 0;
    lives = 3;
    combo = 0;
    level = 1;
    gameRunning = true;

    $("score").textContent = score;
    $("combo").textContent = combo;
    $("level").textContent = level;
    $("lives").textContent = "❤️ ❤️ ❤️";
    $("message").textContent = "";
    $("gameOverScreen").style.display = "none";
    $("startScreen").style.display = "none";
    $("specialArea").innerHTML = "";

    enableBubbles();
    generateQuestion();
    scheduleSpecialBubble();
}

function generateQuestion() {
    if (!gameRunning) return;

    questionToken++;
    clearInterval(timerInterval);

    timeLeft = Math.max(4, 10 - Math.floor((level - 1) / 2));

    let a = Math.floor(Math.random() * 20) + 1;
    let b = Math.floor(Math.random() * 20) + 1;
    const operation = ["+", "-", "×", "÷"][
        Math.floor(Math.random() * 4)
    ];

    if (operation === "+") {
        correctAnswer = a + b;
    } else if (operation === "-") {
        correctAnswer = a - b;
    } else if (operation === "×") {
        correctAnswer = a * b;
    } else {
        correctAnswer = a;
        a = a * b;
    }

    $("question").textContent = `${a} ${operation} ${b} = ?`;
    $("timer").textContent = timeLeft;
    $("timerBar").style.width = "100%";
    $("timerBar").style.background = "#45e77b";

    createOptions();
    startTimer();
}

function createOptions() {
    const options = [correctAnswer];

    while (options.length < 4) {
        const offset = Math.floor(Math.random() * 21) - 10;
        const wrong = Math.random() < 0.7
            ? correctAnswer + offset
            : Math.floor(Math.random() * 101) - 20;

        if (!options.includes(wrong)) {
            options.push(wrong);
        }
    }

    // Shuffle answers
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    options.forEach((answer, index) => {
        const bubble = $(`option${index}`);

        bubble.innerHTML = `
            <span class="answer">${answer}</span>
            <span class="tap">👆</span>
        `;

        bubble.dataset.answer = answer;

        // Restart the bubble's falling animation
        bubble.style.animation = "none";
        void bubble.offsetWidth;
        bubble.style.animation = "";
        bubble.style.animationDelay = `${index * 0.35}s`;
    });

    enableBubbles();
}

function startTimer() {
    clearInterval(timerInterval);

    const token = questionToken;

    timerInterval = setInterval(() => {
        if (!gameRunning || token !== questionToken) {
            clearInterval(timerInterval);
            return;
        }

        timeLeft--;
        $("timer").textContent = timeLeft;
        $("timerBar").style.width = `${Math.max(0, timeLeft / 10 * 100)}%`;

        if (timeLeft <= 3) {
            $("timerBar").style.background = "#ff4d6d";
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            loseLife("⏰ Time's up!");
        }
    }, 1000);
}

function checkAnswer(index) {
    if (!gameRunning) return;

    const selected = Number($(`option${index}`).dataset.answer);

    if (selected !== correctAnswer) {
        loseLife("❌ Wrong answer!");
        return;
    }

    gameRunning = false;
    clearInterval(timerInterval);

    combo++;
    const points = 10 * Math.min(combo, 5);
    score += points;
    level = Math.floor(combo / 5) + 1;

    updateStats();
    disableBubbles();

    $("message").textContent = `✅ Correct! +${points} points`;

    nextQuestionTimeout = setTimeout(() => {
        if (lives > 0) {
            gameRunning = true;
            $("message").textContent = "";
            generateQuestion();
        }
    }, 650);
}

function updateStats() {
    $("score").textContent = score;
    $("combo").textContent = combo;
    $("level").textContent = level;

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("mathRushBest", highScore);
        $("highScore").textContent = highScore;
    }
}

function loseLife(message) {
    if (!gameRunning) return;

    gameRunning = false;
    questionToken++;
    clearInterval(timerInterval);

    lives--;
    combo = 0;

    $("combo").textContent = combo;
    $("lives").textContent =
        "❤️ ".repeat(lives) + "🖤 ".repeat(3 - lives);

    $("message").textContent = message;
    disableBubbles();

    if (lives <= 0) {
        nextQuestionTimeout = setTimeout(gameOver, 600);
    } else {
        nextQuestionTimeout = setTimeout(() => {
            $("message").textContent = "";
            gameRunning = true;
            generateQuestion();
        }, 800);
    }
}

function createSpecialBubble() {
    if (!gameRunning) return;

    const bonus = Math.random() < 0.65;
    const bubble = document.createElement("button");

    bubble.className = `special-bubble ${
        bonus ? "bonus-bubble" : "bomb-bubble"
    }`;

    bubble.textContent = bonus ? "🎁" : "💣";
    bubble.style.left = `${10 + Math.random() * 75}%`;
    bubble.setAttribute("aria-label", bonus ? "Bonus points" : "Bomb");

    bubble.onclick = () => {
        if (!gameRunning || !bubble.isConnected) return;

        bubble.remove();

        if (bonus) {
            score += 10;
            updateStats();
            $("message").textContent = "🎁 Bonus! +10 points";

            setTimeout(() => {
                if (gameRunning) $("message").textContent = "";
            }, 700);
        } else {
            loseLife("💣 Boom! One life lost!");
        }
    };

    $("specialArea").appendChild(bubble);

    setTimeout(() => bubble.remove(), 5100);
}

function scheduleSpecialBubble() {
    clearTimeout(specialTimeout);

    specialTimeout = setTimeout(() => {
        if (!gameRunning) {
            if (lives > 0) scheduleSpecialBubble();
            return;
        }

        createSpecialBubble();
        scheduleSpecialBubble();
    }, 3500);
}

function disableBubbles() {
    for (let i = 0; i < 4; i++) {
        $(`option${i}`).disabled = true;
    }
}

function enableBubbles() {
    for (let i = 0; i < 4; i++) {
        $(`option${i}`).disabled = false;
    }
}

function gameOver() {
    gameRunning = false;
    clearInterval(timerInterval);
    clearTimeout(specialTimeout);

    disableBubbles();

    $("finalScore").textContent = score;
    $("finalLevel").textContent = level;
    $("gameOverScreen").style.display = "flex";
    $("message").textContent = "";
}

// Initial screen
