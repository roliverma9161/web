let correctAnswer;
let score = 0;


// Start Game
function startGame() {

    score = 0;

    document.getElementById("score").innerText = score;

    document.getElementById("message").innerText = "";

    document.getElementById("restartBtn").style.display = "none";

    enableOptions();

    generateQuestion();
}


// Generate Question
function generateQuestion() {

    let num1 = Math.floor(Math.random() * 20) + 1;
    let num2 = Math.floor(Math.random() * 20) + 1;

    let operations = ["+", "-", "*", "/"];

    let operation =
        operations[Math.floor(Math.random() * operations.length)];


    // Division ko easy aur integer banane ke liye
    if (operation === "/") {

        num1 = num1 * num2;

    }


    // Correct Answer
    if (operation === "+") {

        correctAnswer = num1 + num2;

    }

    else if (operation === "-") {

        correctAnswer = num1 - num2;

    }

    else if (operation === "*") {

        correctAnswer = num1 * num2;

    }

    else if (operation === "/") {

        correctAnswer = num1 / num2;

    }


    // Question show karo
    document.getElementById("question").innerText =
        `${num1} ${operation} ${num2} = ?`;


    generateOptions();
}


// Generate 4 Options
function generateOptions() {

    let options = [];

    // Correct answer add karo
    options.push(correctAnswer);


    // 3 wrong answers generate karo
    while (options.length < 4) {

        let wrongAnswer =
            correctAnswer +
            Math.floor(Math.random() * 11) - 5;


        if (!options.includes(wrongAnswer)) {

            options.push(wrongAnswer);

        }
    }


    // Options ko random order me arrange karo
    options.sort(() => Math.random() - 0.5);


    // Buttons me options show karo
    for (let i = 0; i < 4; i++) {

        document.getElementById(`option${i}`).innerText =
            options[i];

        document.getElementById(`option${i}`).dataset.answer =
            options[i];
    }
}


// Check Answer
function checkAnswer(index) {

    let selectedAnswer =
        Number(
            document.getElementById(`option${index}`).dataset.answer
        );


    if (selectedAnswer === correctAnswer) {

        // Right Answer
        score++;

        document.getElementById("score").innerText =
            score;

        document.getElementById("message").innerText =
            "✅ Correct! Next Question...";

        setTimeout(() => {

            generateQuestion();

            document.getElementById("message").innerText = "";

        }, 700);

    }

    else {

        // Wrong Answer
        gameOver();

    }
}


// Game Over
function gameOver() {

    document.getElementById("message").innerText =
        `❌ Game Over! Your Score: ${score}`;

    disableOptions();

    document.getElementById("restartBtn").style.display =
        "inline-block";
}


// Disable buttons
function disableOptions() {

    for (let i = 0; i < 4; i++) {

        document.getElementById(`option${i}`).disabled =
            true;
    }
}


// Enable buttons
function enableOptions() {

    for (let i = 0; i < 4; i++) {

        document.getElementById(`option${i}`).disabled =
            false;
    }
}


// Game start
startGame();