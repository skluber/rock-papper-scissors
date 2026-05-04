let options = ["piedra", "papel", "tijera", "salir"];
let computerChoice = 0;
let humanChoice = 0;
let humanScore = 0;
let computerScore = 0;

while (true)     {
    humanChoice = getHumanChoice();
    if (humanChoice == "salir") break;
    computerChoice = getComputerChoice();
    checkResults(computerChoice, humanChoice);
    console.log("Human " + humanScore + " | " + computerScore + " Computer")
}

function getHumanChoice() {
    let newChoice;
    while (true) {
        newChoice = prompt("Elige piedra, papel o tijera (o salir): ").toLowerCase();

        if (options.includes(newChoice)) break;
        console.log("Respuesta errónea");
    }
    console.log("El jugador eligió: ",newChoice);
    return newChoice;
}

function getComputerChoice() {
    let newChoice = options[Math.floor(Math.random() * 3)];
    console.log("La máquina eligió: ", newChoice);
    return newChoice;
}

function checkResults (computerChoice, humanChoice) {
    if (computerChoice == humanChoice){
        console.log("¡Empate!");
        return 0;
    } else if (
        (humanChoice == "piedra" && computerChoice == "tijera") ||
        (humanChoice == "tijera" && computerChoice == "papel") ||
        (humanChoice == "papel" && computerChoice == "piedra") 
        ) {
            console.log("¡Ganaste!");
            humanScore++;
            return 1;
        } else {
            console.log("¡Perdiste!");
            computerScore++;
            return 0;
        }
}