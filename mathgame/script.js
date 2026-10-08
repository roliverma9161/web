let correctAnswer = 0;
let score = 0;


// Start Game

function startGame() {

    score = 0;

    document.getElementById("score").innerText = score;

    document.getElementById("message").innerText = "";

    document.getElementById("restartBtn").style.display = "none";

    enableBubbles();

    generateQuestion();
}


// Generate Question

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
            Math.floor(Math.random() * operations.length)
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

        /*
        Division ko simple rakhne ke liye
        answer ko integer banate hain.
        */

        correctAnswer = num1;

        num1 = num1 * num2;
    }


    // Question Display

    document.getElementById("question").innerText =
        `${num1} ${operation} ${num2} = ?`;


    generateOptions();
}


// Generate Four Options

function generateOptions() {

    let options = [];


    // Correct answer

    options.push(correctAnswer);


    // Wrong answers

    while (options.length < 4) {

        let wrongAnswer =
            correctAnswer +
            Math.floor(Math.random() * 11) - 5;


        if (
            !options.includes(wrongAnswer)
        ) {

            options.push(wrongAnswer);
        }
    }


    // Random order

    options.sort(
        () => Math.random() - 0.5
    );


    // Put numbers inside bubbles

    for (let i = 0; i < 4; i++) {

        let bubble =
            document.getElementById(
                `option${i}`
            );


        bubble.innerText =
            options[i];


        bubble.dataset.answer =
            options[i];
    }
}


// Check Answer

function checkAnswer(index) {

    let selectedAnswer =
        Number(
            document.getElementById(
                `option${index}`
            ).dataset.answer
        );


    // Correct

    if (
        selectedAnswer === correctAnswer
    ) {

        score++;

        document.getElementById(
            "score"
        ).innerText = score;


        document.getElementById(
            "message"
        ).innerText =
            "✅ Correct!";


        setTimeout(() => {

            generateQuestion();

            document.getElementById(
                "message"
            ).innerText = "";

        }, 700);

    }


    // Wrong

    else {

        gameOver();
    }
}


// Game Over

function gameOver() {

    document.getElementById(
        "message"
    ).innerText =
        `❌ Game Over! Score: ${score}`;


    disableBubbles();


    document.getElementById(
        "restartBtn"
    ).style.display =
        "inline-block";
}


// Disable Bubbles

function disableBubbles() {

    for (let i = 0; i < 4; i++) {

        document.getElementById(
            `option${i}`
        ).disabled = true;
    }
}


// Enable Bubbles

function enableBubbles() {

    for (let i = 0; i < 4; i++) {

        document.getElementById(
            `option${i}`
        ).disabled = false;
    }
}


// Start game automatically

startGame();