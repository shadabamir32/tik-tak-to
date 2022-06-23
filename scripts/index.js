const changeShadow = () => {
  let pl1 = document.getElementById("btn1");
  let pl2 = document.getElementById("btn2");

  let trn = document.getElementById("turn");
  if (pl1.classList.contains("outer-effect")) {
    pl1.classList.remove("outer-effect");
    pl1.classList.add("inner-effect");

    trn.classList.remove("ic-blue");
    trn.classList.add("ic-red");

    trn.setAttribute("src", "icons/circle.svg");

    pl2.classList.remove("inner-effect");
    pl2.classList.add("outer-effect");
  } else if (pl2.classList.contains("outer-effect")) {
    pl2.classList.remove("outer-effect");
    pl2.classList.add("inner-effect");

    trn.classList.remove("ic-red");
    trn.classList.add("ic-blue");

    trn.setAttribute("src", "icons/cross.svg");

    pl1.classList.remove("inner-effect");
    pl1.classList.add("outer-effect");
  }
};
const shapes = {
  cross: "x",
  circle: "o",
};
const winMatrix = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let currentState = true;
let board;
let size;
class Player {
  constructor(name, shape, score) {
    this.name = name;
    this.shape = shape;
    this.score = score;
  }
  updateScore() {
    this.score = this.score + 1;
  }
  setShape(index) {
    this.shape = shapes[index];
  }
  viewScore() {
    return this.score;
  }
}
class Board {
  constructor(player1, player2, cells, size, state, turn) {
    this.player1 = player1;
    this.player2 = player2;
    this.cells = cells;
    this.size = size;
    this.state = state;
    this.turn = turn;
  }
  addEvents() {
    this.cells.forEach((element) => {
      element.addEventListener("click", handleClick, { once: true });
    });
  }
  endGame(win) {
    win ? showWinner(this.state, this.player1, this.player2) : showDraw();
  }
  checkWin() {
    return winMatrix.some((element) => {
      return element.every((index) => {
        return this.cells[index].classList.contains(this.state);
      });
    });
  }
  draw() {
    return [...this.cells].every((element) => {
      return (
        element.classList.contains(shapes.cross) ||
        element.classList.contains(shapes.circle)
      );
    });
  }
  swapTurn() {
    changeShadow();
    this.turn = !this.turn;
  }
}

const handleClick = (e) => {
  const cell = e.target;
  board.state = board.turn ? shapes.cross : shapes.circle;
  cell.classList.add(board.state);
  if (board.checkWin()) {
    board.endGame(true);
  } else if (board.draw()) {
    board.endGame(false);
  }
  board.swapTurn();
};

const showWinner = (state, pl1, pl2) => {
  const winner = pl1.shape === state ? pl1.name : pl2.name;
  const winPanel = document.getElementById("end");
  winPanel.innerHTML = `${winner} has won!`;
  winPanel.classList.add("show");
};
const showDraw = () => {
  const winPanel = document.getElementById("end");
  winPanel.innerHTML = "Draw!";
  winPanel.classList.add("show");
};
const restart = () => {
  location.reload();
};
const startGame = () => {
  const pl1 = new Player(prompt("Enter name of player one"), shapes.cross, 0);
  const pl2 = new Player(prompt("Enter name of player two"), shapes.circle, 0);
  //const pl1 = new Player("Player 1", shapes.cross, 0);
  //const pl2 = new Player("Player 2", shapes.circle, 0);

  let el1 = document.getElementById("player-1-name");
  let el2 = document.getElementById("player-2-name");
  el1.innerHTML = pl1.name;
  el2.innerHTML = pl2.name;
  size = 3;
  cells = document.querySelectorAll("[data-cell]");
  board = new Board(pl1, pl2, cells, size, shapes.cross, currentState);
  board.addEvents();
};

startGame();
