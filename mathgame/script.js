let correctAnswer = 0;

let score = 0;


// =========================
// START GAME
// =========================

function startGame() {

    score = 0;

    document.getElementById("score").innerText = score;

    document.getElementById("message").innerText = "";

    document.getElementById("restartBtn").style.display = "none";

    enableBubbles();

    generateQuestion();
}


// =========================
// GENERATE QUESTION
// =========================

function generateQuestion() {

    let num1 =
        Math.floor(Math.random() * 20) + 1;

    let num2 =
        Math.floor(Math.random() * 20) + 1;


    let operations = [

        "+",
        "-",
        "×",
        "÷"

    ];


    let operation =
        operations[
            Math.floor(
                Math.random() * operations.length
            )
        ];


    // Addition

    if (operation === "+") {

        correctAnswer = num1 + num2;

    }


    // Subtraction

    else if (operation === "-") {

        correctAnswer = num1 - num2;

    }


    // Multiplication

    else if (operation === "×") {

        correctAnswer = num1 * num2;

    }


    // Division

    else {

        correctAnswer = num1;

        num1 = num1 * num2;

    }


    document.getElementById("question").innerText =

        `${num1} ${operation} ${num2} = ?`;


    generateOptions();
}


// =========================
// GENERATE OPTIONS
// =========================

function generateOptions() {

    let options = [];


    // Correct answer

    options.push(correctAnswer);


    // Wrong answers

    while (options.length < 4) {

        let wrongAnswer =

            correctAnswer +

            Math.floor(Math.random() * 11) - 5;


        if (!options.includes(wrongAnswer)) {

            options.push(wrongAnswer);

        }

    }


    // Random position

    options.sort(
        () => Math.random() - 0.5
    );


    // Put answer inside bubbles

    for (let i = 0; i < 4; i++) {

        let bubble =

            document.getElementById(
                `option${i}`
            );


        bubble.innerHTML = `

            <span class="answer">
                ${options[i]}
            </span>

            <span class="tap">
                👆
            </span>

        `;


        bubble.dataset.answer =
            options[i];
    }
}


// =========================
// CHECK ANSWER
// =========================

function checkAnswer(index) {

    let selectedAnswer =

        Number(

            document.getElementById(
                `option${index}`
            ).dataset.answer

        );


    // CORRECT

    if (selectedAnswer === correctAnswer) {

        score++;


        document.getElementById(
            "score"
        ).innerText = score;


        document.getElementById(
            "message"
        ).innerText = "✅ Correct!";


        setTimeout(() => {

            generateQuestion();

            document.getElementById(
                "message"
            ).innerText = "";

        }, 600);

    }


    // WRONG

    else {

        gameOver();

    }

}


// =========================
// GAME OVER
// =========================

function gameOver() {

    document.getElementById(
        "message"
    ).innerText =

        `❌ Game Over! Score: ${score}`;


    disableBubbles();


    document.getElementById(
        "restartBtn"
    ).style.display = "block";
}


// =========================
// DISABLE BUBBLES
// =========================

function disableBubbles() {

    for (let i = 0; i < 4; i++) {

        document.getElementById(
            `option${i}`
        ).disabled = true;

    }

}


// =========================
// ENABLE BUBBLES
// =========================

function enableBubbles() {

    for (let i = 0; i < 4; i++) {

        document.getElementById(
            `option${i}`
        ).disabled = false;

    }

}


// =========================
// START
// =========================

startGame();