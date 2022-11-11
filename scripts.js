//Step 1 : on clicking a game sqaure show X or O and update heading depending on whose turn it is
//Step 2 : determine when the game ends -> clicking on square caused the player to win
//Step 3 : End game phase -> show restart button and then reset the board

// To find row of the gameSqaure clicked we can use Math.floor(index of the gameSqaure / board width)
// To find the col of the gameSquare clicked we can index of the gameSquare % board width

const BOARD_WIDTH = 3;

let currentPlayer = 1;
let numMovesDone = 0;

let boardState = generateEmptyBoardState();

const gameHeading = document.querySelector(".game-heading");

const gameSqaures = document.querySelectorAll(".game-square");

const restartButton = document.getElementById("restart-button");

gameSqaures.forEach((gameSqaure, i) => {
  gameSqaure.addEventListener("click", () => {
    const row = Math.floor(i / BOARD_WIDTH);
    const col = i % BOARD_WIDTH;
    makeMove(gameSqaure, row, col);
  });
});

restartButton.addEventListener("click", restartGame);

function makeMove(gameSqaure, row, col) {
  //Update text content of gameSquare depending on which player + disable gameSquare button + update heading as based on whose turn it is
  gameSqaure.textContent = currentPlayer === 1 ? "X" : "O";
  gameSqaure.disabled = true;
  numMovesDone++;
  boardState[row][col] = currentPlayer;

  if (didPlayerWin(currentPlayer)) {
    gameHeading.textContent = `Player ${currentPlayer} won`;
    endGame();
  } else if (numMovesDone >= BOARD_WIDTH * BOARD_WIDTH) {
    gameHeading.textContent = "Tie Game!";
    endGame();
  } else {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    setCurrentPlayerHeader();
  }
}

function didPlayerWin(currentPlayer) {
  const rows = [0, 1, 2];
  const cols = [0, 1, 2];

  const wonHorizontal = rows.some((row) => {
    return (
      boardState[row][0] === currentPlayer &&
      boardState[row][1] === currentPlayer &&
      boardState[row][2] === currentPlayer
    );
  });

  const wonVertical = cols.some((col) => {
    return (
      boardState[0][col] === currentPlayer &&
      boardState[1][col] === currentPlayer &&
      boardState[2][col] === currentPlayer
    );
    let flag = false;
    for (let i = 0; i <= 2; i++) {
      flag = flag && boardState[i][col] === currentPlaye;
    }
  });

  const wonLefttoRight =
    boardState[0][0] === currentPlayer &&
    boardState[1][1] === currentPlayer &&
    boardState[2][2] === currentPlayer;

  const wonRighttoLeft =
    boardState[0][2] === currentPlayer &&
    boardState[1][1] === currentPlayer &&
    boardState[2][0] === currentPlayer;

  return wonHorizontal || wonVertical || wonLefttoRight || wonRighttoLeft;
}

function endGame() {
  restartButton.style.display = "block";
  gameSqaures.forEach((gameSquare) => {
    gameSquare.disabled = true;
  });
}

function setCurrentPlayerHeader() {
  gameHeading.textContent = `Player ${currentPlayer}'s Turn`;
}

function generateEmptyBoardState() {
  return new Array(BOARD_WIDTH).fill().map(() => new Array(BOARD_WIDTH).fill());
}

function restartGame() {
  boardState = generateEmptyBoardState();
  currentPlayer = 1;
  numMovesDone = 0;
  setCurrentPlayerHeader();
  gameSqaures.forEach((gameSquare) => {
    gameSquare.textContent = "";
    gameSquare.disabled = false;
  });
  restartButton.style.display = "none";
}
