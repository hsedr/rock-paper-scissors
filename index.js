const Move = {
  Rock: "Rock",
  Paper: "Paper",
  Scissor: "Scissors",
};

let images = document.querySelectorAll(".card-image");
let message = document.querySelector(".message");
let scorePlayer = document.querySelector(".player-score");
let scoreComp = document.querySelector(".comp-score");
let tableBody = document.querySelector(".table-body");
let refreshButton = document.querySelector(".material-symbols-outlined") 

images.forEach((element) => {
  element.addEventListener("click", () => {
    if (playerPoints < 3 && compPoints < 3) {
      playerMove(element.dataset.image);
    }
  });
});

refreshButton.addEventListener('click', () => {
  playerPoints = 0;
  compPoints = 0;
  scorePlayer.innerText = 0
  scoreComp.innerText = 0
  message.innerHTML = '&nbsp;'
  let newTableBody = document.createElement("tbody")
  tableBody.parentNode.replaceChild(newTableBody, tableBody)
  tableBody = newTableBody
})

let playerPoints = 0;
let compPoints = 0;

function getPlayerPoints() {
  return playerPoints;
}

function getCompPoints() {
  return compPoints;
}

function incrPlayerPoints() {
  playerPoints += 1;
}

function incrCompPoints() {
  compPoints += 1;
}

function compMove() {
  let keys = Object.keys(Move);
  return Move[keys[(keys.length * Math.random()) << 0]];
}

/**
 * @param n Player Move
 */
function playerMove(n) {
  comp = compMove();
  let result = determineWinner(n, comp);
  console.log(`Player: ${n}, Comp: ${comp} -> Result: ${result}`);
  // Tie
  if (result == 0) {
    message.innerText = "Tie";
  }
  // Player looses
  else if (result == -1) {
    incrCompPoints();
    scoreComp.innerText = getCompPoints();
    message.innerText = "You loose";
  }
  // Player Wins
  else if (result == 1) {
    incrPlayerPoints();
    scorePlayer.innerText = getPlayerPoints();
    message.innerText = "You win";
  }
  let row = tableBody.insertRow()
  let playerCell = row.insertCell(0)
  let compCell = row.insertCell(1)
  playerCell.appendChild(document.createTextNode(n))
  compCell.appendChild(document.createTextNode(comp))
}

/**
 * @return {number} 0 -> tie, 1 -> win, -1 -> loss
 */
function determineWinner(playerMove, comp) {
  if (comp === playerMove) return 0;
  if (comp === Move.Rock) {
    if (playerMove === Move.Scissor) return -1;
    if (playerMove === Move.Paper) return 1;
  }
  if (comp === Move.Paper) {
    if (playerMove === Move.Scissor) return 1;
    if (playerMove === Move.Rock) return -1;
  }
  if (comp === Move.Scissor) {
    if (playerMove === Move.Paper) return -1;
    if (playerMove === Move.Rock) return 1;
  }
}
