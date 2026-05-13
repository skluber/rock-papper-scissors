let options = ["piedra", "papel", "tijera"];
let humanScore = 0;
let computerScore = 0;
let games = 0;
let username = null;

const emojis = {
    piedra: "🪨",
    papel: "📄",
    tijera: "✂️"
};

const controls = document.querySelector("#controls");
const humanScoreboard = document.querySelector("#player-score");
const computerScoreBoard = document.querySelector("#computer-score");
const humanIcon = document.getElementById("player-choice-icon");
const computerIcon = document.getElementById("machine-choice-icon");
const statusText = document.getElementById("status-text");

if (humanScore === 0 && computerScore === 0 && username === null)

controls.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const humanChoice = event.target.dataset.choice;
        playRound(humanChoice);
    }
})

function getComputerChoice() {
    let newChoice = options[Math.floor(Math.random() * options.length)];
    return newChoice;
}

function updateScoreboard(humanChoice) {
    const computerChoice = getComputerChoice();
    humanIcon.textContent = emojis[humanChoice];
    computerIcon.textContent = emojis[computerChoice];

    if (computerChoice === humanChoice) {
        statusText.textContent = "¡Empate!"
        statusText.style.color = "black";
    } else if (
        (humanChoice === "piedra" && computerChoice === "tijera") ||
        (humanChoice === "tijera" && computerChoice === "papel") ||
        (humanChoice === "papel" && computerChoice === "piedra")
    ) {
        statusText.textContent = "¡Ganaste!"
        statusText.style.color = "green";
        humanScore++;
        games++;
    } else {
        statusText.textContent = "¡Perdiste!"
        statusText.style.color = "red";
        computerScore++;
        games++;
    }

    humanScoreboard.textContent = humanScore;
    computerScoreBoard.textContent = computerScore;

    if (humanScore === 5 || computerScore === 5) { 
        gameOver();
    }
}

function playRound(humanChoice) {
    updateScoreboard(humanChoice);
}

function disableGameButtons() {
    const buttons = controls.querySelectorAll("button");

    buttons.forEach((boton) => {
        boton.disabled = true;
        boton.style.opacity = "0.5";
        boton.style.cursor = "not-allowed";
    })
}

function enableGameButtons() {
    const buttons = controls.querySelectorAll("button");

    buttons.forEach((boton) => {
        boton.disabled = false;
        boton.style.opacity = "1";
        boton.style.cursor = "pointer";
    })
}

function resetButton() {
    const resetButton = document.createElement("button");
    resetButton.textContent = "Reiniciar partida";
    resetButton.id = "reset-btn";
    resetButton.classList = "reset-btn";
    resetButton.style.marginTop = "20px";


    resetButton.addEventListener('click', () => {
        resetGame();
    })

    document.body.appendChild(resetButton);
}

function resetGame() {
    humanScore = 0;
    computerScore = 0;
    games = 0;
    computerChoice = "?";
    humanChoice = "?";

    humanIcon.textContent = humanChoice;
    computerIcon.textContent = computerChoice;

    computerScoreBoard.textContent = "0";
    humanScoreboard.textContent = "0";
    computerScoreBoard.style.opacity = "100%";
    humanScoreboard.style.opacity = "100%";

    statusText.textContent = "¿Con qué empezamos ahora?";
    statusText.style.color = "black";

    enableGameButtons();

    document.getElementById("reset-btn").remove();
}

function gameOver() {
    if (humanScore === 5) {
        statusText.innerHTML= "¡Enhorabuena! Has ganado la partida<br> Reinicia partida para jugar de nuevo";
        statusText.style.color = "green";
        computerScoreBoard.style.opacity = "30%";
        humanScoreboard.textContent += " 🥳";
    } else {
        statusText.innerHTML = "Has perdido<br> Reinicia la partida para jugar de nuevo";
        statusText.style.color = "red";
        humanScoreboard.style.opacity = "30%";
        computerScoreBoard.textContent += " 🥳";
    }

    disableGameButtons();
    resetButton();
}