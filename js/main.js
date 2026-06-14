// @ts-check

( () => {
  
  // game logic
  let userScore = 0;
  let computerScore = 0;
  let endGame = false;

  // DOM elements
  const outputText = document.querySelector(".rps__output-text");
  const userIcon = document.querySelector('[data-icon="user"]')
  const computerIcon = document.querySelector('[data-icon="computer"]')
  const userScoreText = document.querySelector('[data-score="user"]')
  const computerScoreText = document.querySelector('[data-score="computer"]')


  const playButtons = document.querySelectorAll(".bttn_option");

  playButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      playGame(event.currentTarget.id);
    })
  });

  const optionsSection = document.querySelector(".interaction__secondary-buttons");
  const restartGameButton = document.createElement("button");
  restartGameButton.textContent = "Restart Game";
  restartGameButton.addEventListener("click", restartGame);
  restartGameButton.classList.add("bttn_option", "bttn_restart")

  
  function getComputerChoice() {
    const options = ["rock", "paper", "scissors"];
    const indexPosition = Math.floor((Math.random() * options.length));
    return options[indexPosition];
  }

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
    
    if (endGame) return;

    const userChoice = optionSelected;
    const computerChoice = getComputerChoice();

    const winner = playRound(userChoice, computerChoice);
    checkWinner(winner, userChoice, computerChoice);
    updateIcons(userChoice, computerChoice)

    if (userScore === 5 || computerScore === 5) {   
      endGame = true;
      gameOver();
    }
    
    
  }

  /** @param {string} winner  
   * @param {string} userChoice 
   * @param {string} computerChoice 
  */
  function checkWinner(winner, userChoice, computerChoice) {
    if (winner === "draw") {
      updateOutput("It's a draw!")
      
    } else if(winner === "human") {  
      updateOutput(`You win this round! ${userChoice} beats ${computerChoice}`)
      userScore++;
    } else {
      updateOutput(`You lost this round! ${computerChoice} beats ${userChoice}`)
      computerScore++;
    }


    

    updateScoreText();
  }

  function gameOver() {
    const winnerMessage = userScore > computerScore
      ? `You win matey!`
      : `You lose! Good luck next time!`
      
    updateOutput(winnerMessage);
    optionsSection?.appendChild(restartGameButton);  
  }

    
  /** @param {string} text  */
  function updateOutput(text) {  
    if (outputText) {
      outputText.textContent = text;
    }
  }

  function updateScoreText() {
    if (userScoreText && computerScoreText) {
      userScoreText.textContent = `User Score: ${userScore}`;
      computerScoreText.textContent = `Computer Score: ${computerScore}`;
    }
  }

  function  restartGame() {

    userScore = 0;
    computerScore = 0;
    updateScoreText();

    endGame = false;
    updateOutput("Please, select one of the available options!")

    if (userIcon && computerIcon) {
      const emptyIcon = "▉ ▊ ▋ ▌ ▍ ▎ ▏ ▎ ▍ ▌ ▋ ▊ ▉";
      userIcon.textContent = emptyIcon;
      computerIcon.textContent = emptyIcon; 
     }

    restartGameButton.remove();
  }


  /** @param {string} userChoice
  * @param {string} computerChoice 
  */
  function updateIcons(userChoice, computerChoice) {
    const ascciIcons = {
      rock:
`
    _______
---'   ____)
      (_____)
      (_____)
      (____)
---.__(___)
`,
      paper:
`_______
---'   ____)____
          ______)
          _______)
         _______)
---.__________)
`,
      scissors:
`_______
---'   ____)____
          ______)
       __________)
      (____)
---.__(___)
`,
      }


      if (userIcon && computerIcon) {  
        userIcon.textContent = ascciIcons[userChoice];
        computerIcon.textContent = ascciIcons[computerChoice];  
      }    
  }
})();
