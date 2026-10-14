// 1 se 100 ke beech random number generate karna
let randomNumber = Math.floor(Math.random() * 100) + 1;
let attemptsCount = 0;
const userGuessInput = document.getElementById('user-guess');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const guessBtn = document.getElementById('guess-btn');
const restartBtn = document.getElementById('restart-btn');
function checkGuess() {
    const userValue = Number(userGuessInput.value); 
    // Validation: Agar number valid nahi hai
    if (!userValue || userValue < 1 || userValue > 100) {
        message.innerText = "⚠️ Please enter a number between 1 and 100!";
        message.style.color = "#e67e22";
        return;
    }
    attemptsCount++;
    attemptsDisplay.innerText = `Attempts: ${attemptsCount}`;
    // Game Logic
    if (userValue === randomNumber) {
        message.innerText = `🎉 Sahi jawab! Aapne ${attemptsCount} attempts mein jeet liya!`;
        message.style.color = "#27ae60";
        endGame();
    } else if (userValue < randomNumber) {
        message.innerText = "📈 Bohot chhota number hai! Thoda bada socho.";
        message.style.color = "#2980b9";
    } else {
        message.innerText = "📉 Bohot bada number hai! Thoda chhota socho.";
        message.style.color = "#c0392b";
    }
    userGuessInput.value = '';
    userGuessInput.focus();
}
function endGame() {
    guessBtn.disabled = true;
    userGuessInput.disabled = true;
    restartBtn.style.display = 'block'; // Play Again button dikhana
}
function restartGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attemptsCount = 0;
    attemptsDisplay.innerText = `Attempts: 0`;
    message.innerText = "Game restart ho chuki hai! Guessing shuru karo.";
    message.style.color = "#333";
    guessBtn.disabled = false;
    userGuessInput.disabled = false;
    restartBtn.style.display = 'none';
    userGuessInput.value = '';
}