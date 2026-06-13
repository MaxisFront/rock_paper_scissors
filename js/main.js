// @ts-check

( () => {
  
  // Scores
  let userScore = 0;
  let computerScore = 0;

  // DOM elements
  const playButtons = document.querySelectorAll(".bttn_option");
  const outputText = document.querySelector(".rps__output-text");

  playButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      playGame(event.currentTarget.id);
    })
  });
  
  function getComputerChoice() {
    const options = ["rock", "paper", "scissors"];
    const indexPosition = Math.floor((Math.random() * options.length));
    return options[indexPosition];
  }

  // TODO: Refactorizar getUserChoice() para interacuar con el DOM
  // Quizá al presionar una opción, ejecutar playGame() y enviar el valor del botón
  // TODO: Asignar a cada botón la función getUserChoice()

  /** @param {string} userChoice 
   * @param {string} computerChoice */
  function playRound(userChoice, computerChoice) {  
  
  if (userChoice === computerChoice) return "draw";
  
    const winsAgainst = {

    rock: "scissors",
    paper: "rock",
    scissors: "paper"
    };

    return winsAgainst[userChoice] === computerChoice ? "human" : "computer";
  }

  /** @param {string} optionSelected */
  function playGame(optionSelected) {
    
    // TODO: Adaptar para recibir respuesta del DOM
    const humanChoice = optionSelected;
    const computerChoice = getComputerChoice();
    let endGame = false;

    if (userScore >= 5 || computerScore >= 5) {   
      endGame = true;
    }

    if (!endGame) {
      const winner = playRound(humanChoice, computerChoice);
      checkWinner(winner);
    } else {
      gameOver();
    }

    /** @param {string} winner  */
    function checkWinner(winner) {
    
      if (winner === "draw") {
        updateOutput("It's a draw!")

      } else if(winner === "human") {  
        updateOutput(`You win this round! ${humanChoice} beats ${computerChoice}`)
        userScore++;

      } else {
        updateOutput(`You lost this round! ${computerChoice} beats ${humanChoice}`)
        computerScore++;
      }
    }

    function gameOver() {
      const winnerMessage = userScore > computerScore
        ? `You win! Your Score: ${userScore} | Computer Score: ${computerScore}`  
        : `You lose! Your Score: ${userScore} | Computer Score: ${computerScore}`
      
      updateOutput(winnerMessage);
    }

    /** @param {string} text  */
    function updateOutput(text) {
      if (outputText) {
        outputText.textContent = text;
      }
    }

    
  }
})();
