function getComputerChoice() {
  
  const options = ["rock", "paper", "scissors"];
  const indexPosition = Math.floor((Math.random() * options.length));
  return options[indexPosition];
}

function getUserChoice() {
  
  const validAnswers = ["rock", "paper", "scissors"];
  let userInput;

  do {
    let rawInput = prompt("Select rock, paper or scissors");
    // If user pressed "cancel", return an empty string
    userInput = rawInput ? rawInput.toLowerCase() : "";

  } while (!userInput || !validAnswers.includes(userInput));

  return userInput;
}

function playRound(humanChoice, computerChoice) {
  
  if (humanChoice === computerChoice) return "draw";

  const winsAgainst = {
    
    rock: "scissors",
    paper: "rock",
    scissors: "paper"
  };

  return winsAgainst[humanChoice] === computerChoice ? "human" : "computer";

}



function playGame() {

  let humanScore = 0;
  let computerScore = 0;

  for (let i = 1; i <= 5; i++) {
  
    const humanChoice = getUserChoice();
    const computerChoice = getComputerChoice();

    const winner = playRound(humanChoice, computerChoice);

    if (winner === "draw") {
      alert("It's a draw!");
      i--;
      continue;
    }
    
    if (winner === "human") {
      alert(`You win this round! ${humanChoice} beats ${computerChoice}`);
      humanScore++;

    } else {
      alert(`You lost this round! ${computerChoice} beats ${humanChoice}`);
      computerScore++;
    }
  }

  const winnerMessage = humanScore > computerScore
  ? `You win! Your Score: ${humanScore} | Computer Score: ${computerScore}`
  : `You lose! Your Score: ${humanScore} | Computer Score: ${computerScore}`

  alert(winnerMessage);

}

playGame();
