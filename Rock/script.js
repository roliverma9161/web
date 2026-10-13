let playerScore = 0;
let compScore = 0;

const playerScore_span = document.getElementById('player-score');
const compScore_span = document.getElementById('comp-score');
const msg_p = document.getElementById('msg');

// Computer ka random move generate karne ke liye
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

// Game Logic Function
function playGame(playerChoice) {
    const compChoice = getComputerChoice();
    
    if (playerChoice === compChoice) {
        msg_p.innerText = `It's a tie! Both chose ${playerChoice} 🤝`;
        msg_p.style.color = "#555";
    } else if (
        (playerChoice === 'rock' && compChoice === 'scissors') ||
        (playerChoice === 'paper' && compChoice === 'rock') ||
        (playerChoice === 'scissors' && compChoice === 'paper')
    ) {
        playerScore++;
        playerScore_span.innerText = playerScore;
        msg_p.innerText = `You Win! 🎉 ${playerChoice} beats ${compChoice}`;
        msg_p.style.color = "#27ae60";
    } else {
        compScore++;
        compScore_span.innerText = compScore;
        msg_p.innerText = `You Lose! 😢 ${compChoice} beats ${playerChoice}`;
        msg_p.style.color = "#c0392b";
    }
}