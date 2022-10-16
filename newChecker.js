'use strict';
/////////////////////////////////////////////////////////////////
//HTML declerations/////////////////////////////////////////////////////////////
let secondEating = [];
const moveLength = 80;
const moveDeviation = 13;
const squareARR = Array.from(document.querySelectorAll('.square'));
const table = document.querySelector('.board');
const whiteCheckClass = Array.from(
  document.querySelectorAll('.white__checker')
);
const blackCheckClass = Array.from(
  document.querySelectorAll('.black__checker')
);
let turn = {
  black: true,
  white: false,
};
let selected = {
  black: false,
  white: false,
};
let indexes = {
  xIndex: undefined,
  yIndex: undefined,
};

let changed = {
  right: false,
  eatRight: false,
  left: false,
  eatLeft: false,
};
let second = {
  black: false,
  white: false,
  blackQueen: false,
  whiteQeen: false,
};
let ableEating = {
  black: false,
  white: false,
};
let blocking = {
  black: false,
  white: false,
};

/////////////////////////////////////////////////////////////////////
//classes///////////////////////////////////////////////////////////

//square class
class squareCL {
  constructor(sq, hasBlackCheck, hasWhiteCheck, coordX, coordY) {
    this.id = sq;
    this.hasBlackCheck = hasBlackCheck;
    this.hasWhiteCheck = hasWhiteCheck;
    this.coordX = coordX;
    this.coordY = coordY;
    this.changed = false;
  }
}
//checker class
class checkerCL {
  constructor(piece, color, squareX, squareY) {
    this.id = piece;
    this.color = color;
    this.isKing = false;
    this.alive = true;
    this.attack = false;
    this.coordX = squareX;
    this.coordY = squareY;
  }
  setCoords() {
    const x = this.coordX * moveLength + moveDeviation;
    const y = this.coordY * moveLength + moveDeviation;
    this.id.style.top = `${x}px`;
    this.id.style.left = `${y}px`;
  }
  checkIsKing() {
    if (this.color === 'black' && this.coordX == 7) return true;
    if (this.color === 'white' && this.coordX == 0) return true;
    else return false;
  }
  blackMoveLeft() {
    const prevX = this.coordX;
    const prevY = this.coordY;
    b_check_ARR[this.coordX + 1][this.coordY + 1] =
      b_check_ARR[this.coordX][this.coordY];
    board[this.coordX][this.coordY].hasBlackCheck = false;
    const x = (this.coordX + 1) * moveLength + moveDeviation;
    const y = (this.coordY + 1) * moveLength + moveDeviation;
    this.coordX += 1;
    this.coordY += 1;
    board[this.coordX][this.coordY].hasBlackCheck = true;
    this.id.style.top = `${x}px`;
    this.id.style.left = `${y}px`;
    b_check_ARR[prevX][prevY] = undefined;
    if (!this.isKing) {
      if (this.checkIsKing()) {
        this.isKing = true;
        this.id.style.border = '4px solid Red';
      }
    }
  }
  blackMoveRight() {
    const prevX = this.coordX;
    const prevY = this.coordY;
    b_check_ARR[this.coordX + 1][this.coordY - 1] =
      b_check_ARR[this.coordX][this.coordY];
    board[this.coordX][this.coordY].hasBlackCheck = false;
    const x = (this.coordX + 1) * moveLength + moveDeviation;
    const y = (this.coordY - 1) * moveLength + moveDeviation;
    this.coordX += 1;
    this.coordY -= 1;
    board[this.coordX][this.coordY].hasBlackCheck = true;
    this.id.style.top = `${x}px`;
    this.id.style.left = `${y}px`;
    b_check_ARR[prevX][prevY] = undefined;
    if (!this.isKing) {
      if (this.checkIsKing()) {
        this.isKing = true;
        this.id.style.border = '4px solid Red';
      }
    }
  }
  whiteMoveLeft() {
    const prevX = this.coordX;
    const prevY = this.coordY;
    w_check_ARR[this.coordX - 1][this.coordY - 1] =
      w_check_ARR[this.coordX][this.coordY];
    board[this.coordX][this.coordY].hasWhiteCheck = false;
    const x = (this.coordX - 1) * moveLength + moveDeviation;
    const y = (this.coordY - 1) * moveLength + moveDeviation;
    this.coordX -= 1;
    this.coordY -= 1;
    board[this.coordX][this.coordY].hasWhiteCheck = true;
    this.id.style.top = `${x}px`;
    this.id.style.left = `${y}px`;
    w_check_ARR[prevX][prevY] = undefined;
    if (!this.isKing) {
      if (this.checkIsKing()) {
        this.isKing = true;
        this.id.style.border = '4px solid Red';
      }
    }
  }
  whiteMoveRight() {
    const prevX = this.coordX;
    const prevY = this.coordY;
    w_check_ARR[this.coordX - 1][this.coordY + 1] =
      w_check_ARR[this.coordX][this.coordY];
    board[this.coordX][this.coordY].hasWhiteCheck = false;
    const x = (this.coordX - 1) * moveLength + moveDeviation;
    const y = (this.coordY + 1) * moveLength + moveDeviation;
    this.coordX -= 1;
    this.coordY += 1;
    board[this.coordX][this.coordY].hasWhiteCheck = true;
    this.id.style.top = `${x}px`;
    this.id.style.left = `${y}px`;
    w_check_ARR[prevX][prevY] = undefined;
    if (!this.isKing) {
      if (this.checkIsKing()) {
        this.isKing = true;
        this.id.style.border = '4px solid Red';
      }
    }
  }
  blackEatLeft() {
    w_check_ARR[this.coordX + 1][this.coordY + 1].id.style.display = 'none'; //the white he he eats disappears
    w_check_ARR[this.coordX + 1][this.coordY + 1] = undefined; // erases the white he eats from checkers array
    board[this.coordX + 1][this.coordY + 1].hasWhiteCheck = false; //the white was eaten is no more on the board
    const prevX = this.coordX;
    const prevY = this.coordY;
    b_check_ARR[this.coordX + 2][this.coordY + 2] =
      b_check_ARR[this.coordX][this.coordY]; //changes thhe position of the black checker in the checkers array
    board[this.coordX][this.coordY].hasBlackCheck = false; //no more black checker in the position he was in
    const x = (this.coordX + 2) * moveLength + moveDeviation; //calculating the checkers right location
    const y = (this.coordY + 2) * moveLength + moveDeviation; //calculating the checkers right location
    this.coordX += 2; //changes the coords
    this.coordY += 2; //changes the coords
    board[this.coordX][this.coordY].hasBlackCheck = true; //there is a black checker in the new location
    this.id.style.top = `${x}px`; //the checker appears in the right location
    this.id.style.left = `${y}px`; //the checker appears in the right location
    b_check_ARR[prevX][prevY] = undefined; //erases the black checker from its last position in the array
    finishGame(board);
    if (!this.isKing) {
      if (this.checkIsKing()) {
        this.isKing = true;
        this.id.style.border = '4px solid Red';
      }
    }
  }
  blackEatRight() {
    w_check_ARR[this.coordX + 1][this.coordY - 1].id.style.display = 'none';
    w_check_ARR[this.coordX + 1][this.coordY - 1] = undefined;
    board[this.coordX + 1][this.coordY - 1].hasWhiteCheck = false;
    const prevX = this.coordX;
    const prevY = this.coordY;
    b_check_ARR[this.coordX + 2][this.coordY - 2] =
      b_check_ARR[this.coordX][this.coordY];
    board[this.coordX][this.coordY].hasBlackCheck = false;
    const x = (this.coordX + 2) * moveLength + moveDeviation;
    const y = (this.coordY - 2) * moveLength + moveDeviation;
    this.coordX += 2;
    this.coordY -= 2;
    board[this.coordX][this.coordY].hasBlackCheck = true;
    this.id.style.top = `${x}px`;
    this.id.style.left = `${y}px`;
    b_check_ARR[prevX][prevY] = undefined;
    finishGame(board);
    if (!this.isKing) {
      if (this.checkIsKing()) {
        this.isKing = true;
        this.id.style.border = '4px solid Red';
      }
    }
  }
  blackEatLeftBack() {
    w_check_ARR[this.coordX - 1][this.coordY + 1].id.style.display = 'none'; //the white he he eats disappears
    w_check_ARR[this.coordX - 1][this.coordY + 1] = undefined; // erases the white he eats from checkers array
    board[this.coordX - 1][this.coordY + 1].hasWhiteCheck = false; //the white was eaten is no more on the board
    const prevX = this.coordX;
    const prevY = this.coordY;
    b_check_ARR[this.coordX - 2][this.coordY + 2] =
      b_check_ARR[this.coordX][this.coordY]; //changes thhe position of the black checker in the checkers array
    board[this.coordX][this.coordY].hasBlackCheck = false; //no more black checker in the position he was in
    const x = (this.coordX - 2) * moveLength + moveDeviation; //calculating the checkers right location
    const y = (this.coordY + 2) * moveLength + moveDeviation; //calculating the checkers right location
    this.coordX -= 2; //changes the coords
    this.coordY += 2; //changes the coords
    board[this.coordX][this.coordY].hasBlackCheck = true; //there is a black checker in the new location
    this.id.style.top = `${x}px`; //the checker appears in the right location
    this.id.style.left = `${y}px`; //the checker appears in the right location
    b_check_ARR[prevX][prevY] = undefined; //erases the black checker from its last position in the array
    finishGame(board);
    if (!this.isKing) {
      if (this.checkIsKing()) {
        this.isKing = true;
        this.id.style.border = '4px solid Red';
      }
    }
  }
  blackEatRightBack() {
    w_check_ARR[this.coordX - 1][this.coordY - 1].id.style.display = 'none';
    w_check_ARR[this.coordX - 1][this.coordY - 1] = undefined;
    board[this.coordX - 1][this.coordY - 1].hasWhiteCheck = false;
    const prevX = this.coordX;
    const prevY = this.coordY;
    b_check_ARR[this.coordX - 2][this.coordY - 2] =
      b_check_ARR[this.coordX][this.coordY];
    board[this.coordX][this.coordY].hasBlackCheck = false;
    const x = (this.coordX - 2) * moveLength + moveDeviation;
    const y = (this.coordY - 2) * moveLength + moveDeviation;
    this.coordX -= 2;
    this.coordY -= 2;
    board[this.coordX][this.coordY].hasBlackCheck = true;
    this.id.style.top = `${x}px`;
    this.id.style.left = `${y}px`;
    b_check_ARR[prevX][prevY] = undefined;
    finishGame(board);
    if (!this.isKing) {
      if (this.checkIsKing()) {
        this.isKing = true;
        this.id.style.border = '4px solid Red';
      }
    }
  }
  whiteEatLeft() {
    b_check_ARR[this.coordX - 1][this.coordY - 1].id.style.display = 'none';
    b_check_ARR[this.coordX - 1][this.coordY - 1] = undefined;
    board[this.coordX - 1][this.coordY - 1].hasBlackCheck = false;
    const prevX = this.coordX;
    const prevY = this.coordY;
    w_check_ARR[this.coordX - 2][this.coordY - 2] =
      w_check_ARR[this.coordX][this.coordY];
    board[this.coordX][this.coordY].hasWhiteCheck = false;
    const x = (this.coordX - 2) * moveLength + moveDeviation;
    const y = (this.coordY - 2) * moveLength + moveDeviation;
    this.coordX -= 2;
    this.coordY -= 2;
    board[this.coordX][this.coordY].hasWhiteCheck = true;
    this.id.style.top = `${x}px`;
    this.id.style.left = `${y}px`;
    w_check_ARR[prevX][prevY] = undefined;
    finishGame(board);
    if (!this.isKing) {
      if (this.checkIsKing()) {
        this.isKing = true;
        this.id.style.border = '4px solid Red';
      }
    }
  }
  whiteEatRight() {
    b_check_ARR[this.coordX - 1][this.coordY + 1].id.style.display = 'none';
    b_check_ARR[this.coordX - 1][this.coordY + 1] = undefined;
    board[this.coordX - 1][this.coordY + 1].hasBlackCheck = false;
    const prevX = this.coordX;
    const prevY = this.coordY;
    w_check_ARR[this.coordX - 2][this.coordY + 2] =
      w_check_ARR[this.coordX][this.coordY];
    board[this.coordX][this.coordY].hasWhiteCheck = false;
    const x = (this.coordX - 2) * moveLength + moveDeviation;
    const y = (this.coordY + 2) * moveLength + moveDeviation;
    this.coordX -= 2;
    this.coordY += 2;
    board[this.coordX][this.coordY].hasWhiteCheck = true;
    this.id.style.top = `${x}px`;
    this.id.style.left = `${y}px`;
    w_check_ARR[prevX][prevY] = undefined;
    finishGame(board);
    if (!this.isKing) {
      if (this.checkIsKing()) {
        this.isKing = true;
        this.id.style.border = '4px solid Red';
      }
    }
  }
  whiteEatLeftBack() {
    b_check_ARR[this.coordX + 1][this.coordY - 1].id.style.display = 'none';
    b_check_ARR[this.coordX + 1][this.coordY - 1] = undefined;
    board[this.coordX + 1][this.coordY - 1].hasBlackCheck = false;
    const prevX = this.coordX;
    const prevY = this.coordY;
    w_check_ARR[this.coordX + 2][this.coordY - 2] =
      w_check_ARR[this.coordX][this.coordY];
    board[this.coordX][this.coordY].hasWhiteCheck = false;
    const x = (this.coordX + 2) * moveLength + moveDeviation;
    const y = (this.coordY - 2) * moveLength + moveDeviation;
    this.coordX += 2;
    this.coordY -= 2;
    board[this.coordX][this.coordY].hasWhiteCheck = true;
    this.id.style.top = `${x}px`;
    this.id.style.left = `${y}px`;
    finishGame(board);
    w_check_ARR[prevX][prevY] = undefined;
    if (!this.isKing) {
      if (this.checkIsKing()) {
        this.isKing = true;
        this.id.style.border = '4px solid Red';
      }
    }
  }
  whiteEatRightBack() {
    b_check_ARR[this.coordX + 1][this.coordY + 1].id.style.display = 'none';
    b_check_ARR[this.coordX + 1][this.coordY + 1] = undefined;
    board[this.coordX + 1][this.coordY + 1].hasBlackCheck = false;
    const prevX = this.coordX;
    const prevY = this.coordY;
    w_check_ARR[this.coordX + 2][this.coordY + 2] =
      w_check_ARR[this.coordX][this.coordY];
    board[this.coordX][this.coordY].hasWhiteCheck = false;
    const x = (this.coordX + 2) * moveLength + moveDeviation;
    const y = (this.coordY + 2) * moveLength + moveDeviation;
    this.coordX += 2;
    this.coordY += 2;
    board[this.coordX][this.coordY].hasWhiteCheck = true;
    this.id.style.top = `${x}px`;
    this.id.style.left = `${y}px`;
    w_check_ARR[prevX][prevY] = undefined;
    finishGame(board);
    if (!this.isKing) {
      if (this.checkIsKing()) {
        this.isKing = true;
        this.id.style.border = '4px solid Red';
      }
    }
  }
  moveBlackQueen(
    xIndex,
    yIndex,
    toXIndex,
    toYIndex,
    direction,
    leftOrRight,
    eating
  ) {
    const directions = new Map();
    directions.set('forward', toXIndex + 1);
    directions.set('backward', toXIndex - 1);
    directions.set('left', toYIndex + 1);
    directions.set('right', toYIndex - 1);
    if (eating)
      if (direction === 'forward' && leftOrRight === 'left') {
        w_check_ARR[directions.get('forward')][
          directions.get('left')
        ].id.style.display = 'none';
        w_check_ARR[directions.get('forward')][directions.get('left')] =
          undefined;
        board[directions.get('forward')][
          directions.get('left')
        ].hasWhiteCheck = false;
      }

    if (eating)
      if (direction === 'forward' && leftOrRight === 'right') {
        w_check_ARR[directions.get('forward')][
          directions.get('right')
        ].id.style.display = 'none';
        w_check_ARR[directions.get('forward')][directions.get('right')] =
          undefined;
        board[directions.get('forward')][
          directions.get('right')
        ].hasWhiteCheck = false;
      }
    if (eating)
      if (direction === 'backward' && leftOrRight === 'right') {
        w_check_ARR[directions.get('backward')][
          directions.get('right')
        ].id.style.display = 'none';
        w_check_ARR[directions.get('backward')][directions.get('right')] =
          undefined;
        board[directions.get('backward')][
          directions.get('right')
        ].hasWhiteCheck = false;
      }
    if (eating)
      if (direction === 'backward' && leftOrRight === 'left') {
        w_check_ARR[directions.get('backward')][
          directions.get('left')
        ].id.style.display = 'none';
        w_check_ARR[directions.get('backward')][directions.get('left')] =
          undefined;
        board[directions.get('backward')][
          directions.get('left')
        ].hasWhiteCheck = false;
      }

    b_check_ARR[toXIndex][toYIndex] = b_check_ARR[xIndex][yIndex];
    board[xIndex][yIndex].hasBlackCheck = false;
    this.coordX = toXIndex;
    this.coordY = toYIndex;
    board[toXIndex][toYIndex].hasBlackCheck = true;
    this.id.style.top = `${toXIndex * moveLength + moveDeviation}px`;
    this.id.style.left = `${toYIndex * moveLength + moveDeviation}px`;
    b_check_ARR[xIndex][yIndex] = undefined;
    finishGame(board);
  }
  moveWhiteQueen(
    xIndex,
    yIndex,
    toXIndex,
    toYIndex,
    direction,
    leftOrRight,
    eating
  ) {
    const directions = new Map();
    directions.set('forward', toXIndex + 1);
    directions.set('backward', toXIndex - 1);
    directions.set('left', toYIndex + 1);
    directions.set('right', toYIndex - 1);
    if (eating)
      if (direction === 'forward' && leftOrRight === 'left') {
        b_check_ARR[directions.get('forward')][
          directions.get('left')
        ].id.style.display = 'none';
        b_check_ARR[directions.get('forward')][directions.get('left')] =
          undefined;
        board[directions.get('forward')][
          directions.get('left')
        ].hasBlackCheck = false;
      }

    if (eating)
      if (direction === 'forward' && leftOrRight === 'right') {
        b_check_ARR[directions.get('forward')][
          directions.get('right')
        ].id.style.display = 'none';
        b_check_ARR[directions.get('forward')][directions.get('right')] =
          undefined;
        board[directions.get('forward')][
          directions.get('right')
        ].hasBlackCheck = false;
      }
    if (eating)
      if (direction === 'backward' && leftOrRight === 'right') {
        b_check_ARR[directions.get('backward')][
          directions.get('right')
        ].id.style.display = 'none';
        b_check_ARR[directions.get('backward')][directions.get('right')] =
          undefined;
        board[directions.get('backward')][
          directions.get('right')
        ].hasBlackCheck = false;
      }
    if (eating)
      if (direction === 'backward' && leftOrRight === 'left') {
        b_check_ARR[directions.get('backward')][
          directions.get('left')
        ].id.style.display = 'none';
        b_check_ARR[directions.get('backward')][directions.get('left')] =
          undefined;
        board[directions.get('backward')][
          directions.get('left')
        ].hasBlackCheck = false;
      }

    w_check_ARR[toXIndex][toYIndex] = w_check_ARR[xIndex][yIndex];
    board[xIndex][yIndex].hasWhiteCheck = false;
    this.coordX = toXIndex;
    this.coordY = toYIndex;
    board[toXIndex][toYIndex].hasWhiteCheck = true;
    this.id.style.top = `${toXIndex * moveLength + moveDeviation}px`;
    this.id.style.left = `${toYIndex * moveLength + moveDeviation}px`;
    w_check_ARR[xIndex][yIndex] = undefined;
    finishGame(board);
  }
}

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

//two dimension array containing square elements
const board = new Array(8);
for (let i = 0; i < 8; i++) {
  board[i] = new Array(8);
}
//two dimension arrays containing checker elements
const w_check_ARR = new Array(8);
for (let i = 0; i < 8; i++) w_check_ARR[i] = new Array(8);
const b_check_ARR = new Array(8);
for (let i = 0; i < 8; i++) b_check_ARR[i] = new Array(8);

//////////////////////////////////////////////
///////////////board initialization///////////
function boardIntialize(board) {
  let blackSquare;
  let firstThree;
  let lastThree;
  let bCounter = 0;
  let wCounter = 0;
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      board[x][y] = new squareCL(squareARR[x * 8 + y], false, false, x, y);
      blackSquare = blackSQ(x, y);
      firstThree = firstThreeRows(x, y);
      lastThree = lastThreeRows(x, y);
      if (blackSquare && firstThree) {
        board[x][y].hasBlackCheck = true;
        b_check_ARR[x][y] = new checkerCL(
          blackCheckClass[bCounter],
          'black',
          x,
          y
        );
        b_check_ARR[x][y].setCoords();
        bCounter++;
      }
      if (blackSquare && lastThree) {
        board[x][y].hasWhiteCheck = true;
        w_check_ARR[x][y] = new checkerCL(
          whiteCheckClass[wCounter],
          'white',
          x,
          y
        );
        w_check_ARR[x][y].setCoords();
        wCounter++;
      }
    }
  }
}
function blackSQ(row, col) {
  if ((row + col) % 2 == 1) return true;
}
function firstThreeRows(row, col) {
  if (row <= 2) return true;
}
function lastThreeRows(row, col) {
  if (row >= 5) return true;
  else return false;
}
function printBoard(board) {
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      console.log(board[x][y]);
    }
  }
}
function printchBoard() {
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      console.log(b_check_ARR[x][y], x, y);
      console.log(w_check_ARR[x][y], x, y);
    }
  }
}
boardIntialize(board);
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
function ableBlackQueen(square) {
  secondEating = [];
  class ableSquare {
    constructor(x, y, eat) {
      this.x = x;
      this.y = y;
      this.eat = eat;
    }
  }
  let x = square.coordX;
  let y = square.coordY;
  let finalAbleArr = [];
  let firstAbleArr = [];
  let secondAbleArr = [];
  let thirdAbleArr = [];
  let fourthAbleArr = [];
  while (x >= 1 && y >= 1) {
    if (board[x - 1][y - 1].hasBlackCheck === true) {
      x = -1;
      y = -1;
    }
    if (x !== -1)
      if (board[x - 1][y - 1].hasWhiteCheck) {
        if (x >= 2 && y >= 2) {
          if (board[x - 2][y - 2].hasWhiteCheck) {
            y = -1;
            x = -1;
          } else if (board[x - 2][y - 2].hasBlackCheck) {
            y = -1;
            x = -1;
          }
        } else {
          x = -1;
          y = -1;
        }
      }
    if (x !== -1)
      if (x >= 2 && y >= 2)
        if (
          board[x - 1][y - 1].hasWhiteCheck === true &&
          board[x - 2][y - 2].hasWhiteCheck === false &&
          board[x - 2][y - 2].hasBlackCheck === false
        ) {
          selected.black = true;
          ableEating.black = true;
          firstAbleArr = [];
          firstAbleArr.push(new ableSquare(x - 2, y - 2, true));
          secondEating.push(new ableSquare(x - 2, y - 2, true));
          x = -1;
          y = -1;
        }
    if (x !== -1)
      if (board[x - 1][y - 1].hasWhiteCheck === false) {
        selected.black = true;
        if (!ableEating.black)
          firstAbleArr.push(new ableSquare(x - 1, y - 1, false));
        x--;
        y--;
      }
  }
  x = square.coordX;
  y = square.coordY;

  while (x <= 6 && y <= 6) {
    if (board[x + 1][y + 1].hasBlackCheck === true) {
      x = 8;
      y = 8;
    }
    if (x !== 8)
      if (board[x + 1][y + 1].hasWhiteCheck) {
        if (x <= 5 && y <= 5) {
          if (board[x + 2][y + 2].hasWhiteCheck) {
            y = 8;
            x = 8;
          } else if (board[x + 2][y + 2].hasBlackCheck) {
            y = 8;
            x = 8;
          }
        } else {
          x = 8;
          y = 8;
        }
      }
    if (x !== 8)
      if (x <= 5 && y <= 5)
        if (
          board[x + 1][y + 1].hasWhiteCheck === true &&
          board[x + 2][y + 2].hasWhiteCheck === false &&
          board[x + 2][y + 2].hasBlackCheck === false
        ) {
          selected.black = true;
          ableEating.black = true;
          secondAbleArr = [];
          secondAbleArr.push(new ableSquare(x + 2, y + 2, true));
          secondEating.push(new ableSquare(x + 2, y + 2, true));
          x = 8;
          y = 8;
        }
    if (x !== 8)
      if (board[x + 1][y + 1].hasWhiteCheck === false) {
        if (!ableEating.black)
          secondAbleArr.push(new ableSquare(x + 1, y + 1, false));
        selected.black = true;
        x++;
        y++;
      }
  }
  x = square.coordX;
  y = square.coordY;
  while (x <= 6 && y >= 1) {
    if (board[x + 1][y - 1].hasBlackCheck === true) {
      x = 8;
      y = -1;
    }
    if (x !== 8)
      if (board[x + 1][y - 1].hasWhiteCheck) {
        if (x <= 5 && y >= 2) {
          if (board[x + 2][y - 2].hasWhiteCheck) {
            y = -1;
            x = 8;
          } else if (board[x + 2][y - 2].hasBlackCheck) {
            y = -1;
            x = 8;
          }
        } else {
          x = 8;
          y = -1;
        }
      }

    if (x !== 8)
      if (x <= 5 && y >= 2)
        if (
          board[x + 1][y - 1].hasWhiteCheck === true &&
          board[x + 2][y - 2].hasWhiteCheck === false &&
          board[x + 2][y - 2].hasBlackCheck === false
        ) {
          selected.black = true;
          ableEating.black = true;
          thirdAbleArr = [];
          thirdAbleArr.push(new ableSquare(x + 2, y - 2, true));
          secondEating.push(new ableSquare(x + 2, y - 2, true));
          x = 8;
          y = -1;
        }
    if (x !== 8)
      if (board[x + 1][y - 1].hasWhiteCheck === false) {
        if (!ableEating.black)
          thirdAbleArr.push(new ableSquare(x + 1, y - 1, false));
        selected.black = true;
        x++;
        y--;
      }
  }

  x = square.coordX;
  y = square.coordY;
  while (x >= 1 && y <= 6) {
    if (board[x - 1][y + 1].hasBlackCheck === true) {
      x = -1;
      y = 8;
    }
    if (y !== 8)
      if (board[x - 1][y + 1].hasWhiteCheck) {
        if (x >= 2 && y <= 5) {
          if (board[x - 2][y + 2].hasWhiteCheck) {
            x = -1;
            y = 8;
          } else if (board[x - 2][y + 2].hasBlackCheck) {
            y = 8;
            x = -1;
          }
        } else {
          x = -1;
          y = 8;
        }
      }
    if (y !== 8)
      if (x >= 2 && y <= 5)
        if (
          board[x - 1][y + 1].hasWhiteCheck === true &&
          board[x - 2][y + 2].hasWhiteCheck === false &&
          board[x - 2][y + 2].hasBlackCheck === false
        ) {
          selected.black = true;
          ableEating.black = true;
          fourthAbleArr = [];
          fourthAbleArr.push(new ableSquare(x - 2, y + 2, true));
          secondEating.push(new ableSquare(x - 2, y + 2, true));
          x = 0;
          y = 8;
        }
    if (y !== 8)
      if (board[x - 1][y + 1].hasWhiteCheck === false) {
        if (!ableEating.black)
          fourthAbleArr.push(new ableSquare(x - 1, y + 1, false));
        selected.black = true;
        x--;
        y++;
      }
  }
  x = square.coordX;
  y = square.coordY;

  finalAbleArr = firstAbleArr
    .concat(secondAbleArr)
    .concat(thirdAbleArr)
    .concat(fourthAbleArr);
  return finalAbleArr;
}
function ableWhiteQueen(square) {
  secondEating = [];
  class ableSquare {
    constructor(x, y, eat) {
      this.x = x;
      this.y = y;
      this.eat = eat;
    }
  }
  let x = square.coordX;
  let y = square.coordY;
  let finalAbleArr = [];
  let firstAbleArr = [];
  let secondAbleArr = [];
  let thirdAbleArr = [];
  let fourthAbleArr = [];
  while (x >= 1 && y >= 1) {
    if (board[x - 1][y - 1].hasWhiteCheck === true) {
      x = -1;
      y = -1;
    }
    if (x !== -1)
      if (board[x - 1][y - 1].hasBlackCheck) {
        if (x >= 2 && y >= 2) {
          if (board[x - 2][y - 2].hasBlackCheck) {
            y = -1;
            x = -1;
          } else if (board[x - 2][y - 2].hasWhiteCheck) {
            y = -1;
            x = -1;
          }
        } else {
          x = -1;
          y = -1;
        }
      }
    if (x !== -1)
      if (x >= 2 && y >= 2)
        if (
          board[x - 1][y - 1].hasBlackCheck === true &&
          board[x - 2][y - 2].hasBlackCheck === false &&
          board[x - 2][y - 2].hasWhiteCheck === false
        ) {
          selected.white = true;
          ableEating.white = true;
          firstAbleArr = [];
          firstAbleArr.push(new ableSquare(x - 2, y - 2, true));
          secondEating.push(new ableSquare(x - 2, y - 2, true));
          x = -1;
          y = -1;
        }
    if (x !== -1)
      if (board[x - 1][y - 1].hasBlackCheck === false) {
        if (!ableEating.white)
          firstAbleArr.push(new ableSquare(x - 1, y - 1, false));
        selected.white = true;
        x--;
        y--;
      }
  }
  x = square.coordX;
  y = square.coordY;

  while (x <= 6 && y <= 6) {
    if (board[x + 1][y + 1].hasWhiteCheck === true) {
      x = 8;
      y = 8;
    }
    if (x !== 8)
      if (board[x + 1][y + 1].hasBlackCheck) {
        if (x <= 5 && y <= 5) {
          if (board[x + 2][y + 2].hasBlackCheck) {
            y = 8;
            x = 8;
          } else if (board[x + 2][y + 2].hasWhiteCheck) {
            y = 8;
            x = 8;
          }
        } else {
          x = 8;
          y = 8;
        }
      }
    if (x !== 8)
      if (x <= 5 && y <= 5)
        if (
          board[x + 1][y + 1].hasBlackCheck === true &&
          board[x + 2][y + 2].hasBlackCheck === false &&
          board[x + 2][y + 2].hasWhiteCheck === false
        ) {
          selected.white = true;
          ableEating.white = true;
          secondAbleArr = [];
          secondAbleArr.push(new ableSquare(x + 2, y + 2, true));
          secondEating.push(new ableSquare(x + 2, y + 2, true));
          x = 8;
          y = 8;
        }
    if (x !== 8)
      if (board[x + 1][y + 1].hasBlackCheck === false) {
        if (!ableEating.white)
          secondAbleArr.push(new ableSquare(x + 1, y + 1, false));
        selected.white = true;
        x++;
        y++;
      }
  }
  x = square.coordX;
  y = square.coordY;
  while (x <= 6 && y >= 1) {
    if (board[x + 1][y - 1].hasWhiteCheck === true) {
      x = 8;
      y = -1;
    }
    if (x !== 8)
      if (board[x + 1][y - 1].hasBlackCheck) {
        if (x <= 5 && y >= 2) {
          if (board[x + 2][y - 2].hasBlackCheck) {
            y = -1;
            x = 8;
          } else if (board[x + 2][y - 2].hasWhiteCheck) {
            y = -1;
            x = 8;
          }
        } else {
          x = 8;
          y = -1;
        }
      }
    if (x !== 8)
      if (x <= 5 && y >= 2)
        if (
          board[x + 1][y - 1].hasBlackCheck === true &&
          board[x + 2][y - 2].hasBlackCheck === false &&
          board[x + 2][y - 2].hasWhiteCheck === false
        ) {
          selected.white = true;
          ableEating.white = true;
          thirdAbleArr = [];
          thirdAbleArr.push(new ableSquare(x + 2, y - 2, true));
          secondEating.push(new ableSquare(x + 2, y - 2, true));
          x = 8;
          y = -1;
        }
    if (x !== 8)
      if (board[x + 1][y - 1].hasBlackCheck === false) {
        thirdAbleArr.push(new ableSquare(x + 1, y - 1, false));
        selected.white = true;
        x++;
        y--;
      }
  }
  x = square.coordX;
  y = square.coordY;
  while (x >= 1 && y <= 6) {
    if (board[x - 1][y + 1].hasWhiteCheck === true) {
      x = -1;
      y = 8;
    }
    if (y !== 8)
      if (board[x - 1][y + 1].hasBlackCheck) {
        if (x >= 2 && y <= 5) {
          if (board[x - 2][y + 2].hasWhiteCheck) {
            x = -1;
            y = 8;
          } else if (board[x - 2][y + 2].hasBlackCheck) {
            x = -1;
            y = 8;
          }
        } else {
          x = -1;
          y = 8;
        }
      }
    if (y !== 8)
      if (x >= 2 && y <= 5)
        if (
          board[x - 1][y + 1].hasBlackCheck === true &&
          board[x - 2][y + 2].hasBlackCheck === false &&
          board[x - 2][y + 2].hasWhiteCheck === false
        ) {
          selected.white = true;
          ableEating.white = true;
          fourthAbleArr = [];
          fourthAbleArr.push(new ableSquare(x - 2, y + 2, true));
          secondEating.push(new ableSquare(x - 2, y + 2, true));
          x = 0;
          y = 8;
        }

    if (y !== 8)
      if (board[x - 1][y + 1].hasBlackCheck === false) {
        fourthAbleArr.push(new ableSquare(x - 1, y + 1, false));
        selected.white = true;
        x--;
        y++;
      }
  }
  x = square.coordX;
  y = square.coordY;

  finalAbleArr = firstAbleArr
    .concat(secondAbleArr)
    .concat(thirdAbleArr)
    .concat(fourthAbleArr);
  return finalAbleArr;
}
function blackAbleRight(square) {
  if (
    square.coordX <= 6 &&
    square.coordY >= 1 &&
    board[square.coordX + 1][square.coordY - 1].hasBlackCheck === false &&
    board[square.coordX + 1][square.coordY - 1].hasWhiteCheck === false
  )
    return true;
  else return false;
}
function blackAbleEatRight(square) {
  if (
    square.coordX <= 5 &&
    square.coordY >= 2 &&
    board[square.coordX + 2][square.coordY - 2].hasBlackCheck === false &&
    board[square.coordX + 2][square.coordY - 2].hasWhiteCheck === false &&
    board[square.coordX + 1][square.coordY - 1].hasWhiteCheck === true
  )
    return true;
  else return false;
}
function blackAbleLeft(square) {
  if (
    square.coordX <= 6 &&
    square.coordY <= 6 &&
    board[square.coordX + 1][square.coordY + 1].hasBlackCheck === false &&
    board[square.coordX + 1][square.coordY + 1].hasWhiteCheck === false
  )
    return true;
  else return false;
}
function blackAbleEatLeft(square) {
  if (
    square.coordX <= 5 &&
    square.coordY <= 5 &&
    board[square.coordX + 2][square.coordY + 2].hasBlackCheck === false &&
    board[square.coordX + 2][square.coordY + 2].hasWhiteCheck === false &&
    board[square.coordX + 1][square.coordY + 1].hasWhiteCheck === true
  )
    return true;
  else return false;
}
function whiteAbleRight(square) {
  if (
    square.coordX >= 1 &&
    square.coordY <= 6 &&
    board[square.coordX - 1][square.coordY + 1].hasBlackCheck === false &&
    board[square.coordX - 1][square.coordY + 1].hasWhiteCheck === false
  )
    return true;
  else return false;
}
function whiteAbleEatRight(square) {
  if (
    square.coordX >= 2 &&
    square.coordY <= 5 &&
    board[square.coordX - 2][square.coordY + 2].hasBlackCheck === false &&
    board[square.coordX - 2][square.coordY + 2].hasWhiteCheck === false &&
    board[square.coordX - 1][square.coordY + 1].hasBlackCheck === true
  )
    return true;
  else return false;
}
function whiteAbleLeft(square) {
  if (
    square.coordX >= 1 &&
    square.coordY >= 1 &&
    board[square.coordX - 1][square.coordY - 1].hasBlackCheck === false &&
    board[square.coordX - 1][square.coordY - 1].hasWhiteCheck === false
  )
    return true;
  else return false;
}

function whiteAbleEatLeft(square) {
  if (
    square.coordX >= 2 &&
    square.coordY >= 2 &&
    board[square.coordX - 2][square.coordY - 2].hasBlackCheck === false &&
    board[square.coordX - 2][square.coordY - 2].hasWhiteCheck === false &&
    board[square.coordX - 1][square.coordY - 1].hasBlackCheck === true
  )
    return true;
  else return false;
}
function whiteAbleEatLeftBack(square) {
  if (
    square.coordX <= 5 &&
    square.coordY >= 2 &&
    board[square.coordX + 2][square.coordY - 2].hasBlackCheck === false &&
    board[square.coordX + 2][square.coordY - 2].hasWhiteCheck === false &&
    board[square.coordX + 1][square.coordY - 1].hasBlackCheck === true
  )
    return true;
  else return false;
}
function whiteAbleEatRightBack(square) {
  if (
    square.coordX <= 5 &&
    square.coordY <= 5 &&
    board[square.coordX + 2][square.coordY + 2].hasBlackCheck === false &&
    board[square.coordX + 2][square.coordY + 2].hasWhiteCheck === false &&
    board[square.coordX + 1][square.coordY + 1].hasBlackCheck === true
  )
    return true;
  else return false;
}
function blackAbleEatLeftBack(square) {
  if (
    square.coordX >= 2 &&
    square.coordY <= 5 &&
    board[square.coordX - 2][square.coordY + 2].hasBlackCheck === false &&
    board[square.coordX - 2][square.coordY + 2].hasWhiteCheck === false &&
    board[square.coordX - 1][square.coordY + 1].hasWhiteCheck === true
  )
    return true;
  else return false;
}
function blackAbleEatRightBack(square) {
  if (
    square.coordX >= 2 &&
    square.coordY >= 2 &&
    board[square.coordX - 2][square.coordY - 2].hasBlackCheck === false &&
    board[square.coordX - 2][square.coordY - 2].hasWhiteCheck === false &&
    board[square.coordX - 1][square.coordY - 1].hasWhiteCheck === true
  )
    return true;
  else return false;
}
function onTheBoard(checker) {
  if (checker != undefined && checker != null) return true;
  else return false;
}
function bAbleSecondEating(square) {
  if (
    blackAbleEatLeft(square) ||
    blackAbleEatRight(square) ||
    blackAbleEatLeftBack(square) ||
    blackAbleEatRightBack(square)
  )
    return true;
}
function wAbleSecondEating(square) {
  if (
    whiteAbleEatLeft(square) ||
    whiteAbleEatLeftBack(square) ||
    whiteAbleEatRight(square) ||
    whiteAbleEatRightBack(square)
  )
    return true;
}
function bMarkSecondSquares(square) {
  if (blackAbleEatLeft(board[square.coordX][square.coordY])) {
    board[square.coordX + 2][square.coordY + 2].id.classList.remove(
      'black__square'
    );
    board[square.coordX + 2][square.coordY + 2].id.classList.add('red__square');
    selected.black = true;
  }
  if (blackAbleEatRight(board[square.coordX][square.coordY])) {
    board[square.coordX + 2][square.coordY - 2].id.classList.remove(
      'black__square'
    );
    board[square.coordX + 2][square.coordY - 2].id.classList.add('red__square');
    selected.black = true;
  }
  if (blackAbleEatLeftBack(board[square.coordX][square.coordY])) {
    console.log('im here');
    board[square.coordX - 2][square.coordY + 2].id.classList.remove(
      'black__square'
    );
    board[square.coordX - 2][square.coordY + 2].id.classList.add('red__square');
    selected.black = true;
  }
  if (blackAbleEatRightBack(board[square.coordX][square.coordY])) {
    board[square.coordX - 2][square.coordY - 2].id.classList.remove(
      'black__square'
    );
    board[square.coordX - 2][square.coordY - 2].id.classList.add('red__square');
    selected.black = true;
  }
}
function wMarkSecondSquares(square) {
  if (whiteAbleEatLeft(board[square.coordX][square.coordY])) {
    board[square.coordX - 2][square.coordY - 2].id.classList.remove(
      'black__square'
    );
    board[square.coordX - 2][square.coordY - 2].id.classList.add('red__square');
    selected.black = true;
  }
  if (whiteAbleEatRight(board[square.coordX][square.coordY])) {
    board[square.coordX - 2][square.coordY + 2].id.classList.remove(
      'black__square'
    );
    board[square.coordX - 2][square.coordY + 2].id.classList.add('red__square');
    selected.black = true;
  }
  if (whiteAbleEatLeftBack(board[square.coordX][square.coordY])) {
    console.log('im here');
    board[square.coordX + 2][square.coordY - 2].id.classList.remove(
      'black__square'
    );
    board[square.coordX + 2][square.coordY - 2].id.classList.add('red__square');
    changed.eatLeft = true;
  }
  if (whiteAbleEatRightBack(board[square.coordX][square.coordY])) {
    board[square.coordX + 2][square.coordY + 2].id.classList.remove(
      'black__square'
    );
    board[square.coordX + 2][square.coordY + 2].id.classList.add('red__square');
    changed.eatRight = true;
  }
}
const changePlayer = table.addEventListener('click', function (e) {
  if (
    turn.black &&
    selected.black &&
    !e.target.classList.contains('red__square') &&
    !second.black
  ) {
    console.log('change player');
    selected.black = false;

    for (let i = 0; i <= 7; i++)
      for (let j = 0; j <= 7; j++) {
        board[i][j].id.classList.remove('red__square');
        board[i][j].id.classList.add('black__square');
      }
    changed.right = false;
    changed.left = false;
    changed.eatRight = false;
    changed.eatLeft = false;
    if (e.target.isKing) {
      for (const i of ableBlackQueen(board[indexes.xIndex][indexes.yIndex])) {
        board[i.x][i.y].changed = true;
      }
    }
  }
  if (
    turn.white &&
    selected.white &&
    !e.target.classList.contains('red__square') &&
    !second.white
  ) {
    console.log('change player 2');
    selected.white = false;

    for (let i = 0; i <= 7; i++)
      for (let j = 0; j <= 7; j++) {
        board[i][j].id.classList.remove('red__square');
        board[i][j].id.classList.add('black__square');
      }
    changed.right = false;
    changed.left = false;
    changed.eatRight = false;
    changed.eatLeft = false;
    if (e.target.isKing) {
      for (const i of ableWhiteQueen(board[indexes.xIndex][indexes.yIndex])) {
        board[i.x][i.y].changed = true;
      }
    }
  }
});

/////////////////////////////////////////////////////////////////////
///////////////////////  marks where black able to go////////////////////
const markingBlack = table.addEventListener('click', function (e) {
  if (turn.black == true && selected.black == false) {
    for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
        if (b_check_ARR[i][j] !== undefined)
          if (blackAbleEatLeft(board[i][j]) || blackAbleEatRight(board[i][j])) {
            ableEating.black = true;
          }
        if (b_check_ARR[i][j])
          if (b_check_ARR[i][j].isKing) {
            ableBlackQueen(b_check_ARR[i][j]);
          }
      }
    }
    console.log('marking black');
    changed.eatLeft = false;
    changed.eatRight = false;
    changed.right = false;
    changed.left = false;
    if (e.target.id.includes('blackChecker')) {
      indexes.xIndex = Math.floor(
        (window.pageYOffset + e.target.getBoundingClientRect().top) / moveLength
      );
      indexes.yIndex = Math.floor(
        (e.target.getBoundingClientRect().left + window.pageXOffset) /
          moveLength
      );

      ///////////////////////////////////////////////////////////////
      /////////////////queen/////////////////////////////////////////
      if (b_check_ARR[indexes.xIndex][indexes.yIndex].isKing) {
        for (const i of ableBlackQueen(board[indexes.xIndex][indexes.yIndex])) {
          if (ableEating.black) {
            if (i.eat) {
              board[i.x][i.y].id.classList.remove('black__square');
              board[i.x][i.y].id.classList.add('red__square');
              board[i.x][i.y].changed = true;
            }
          } else {
            board[i.x][i.y].id.classList.remove('black__square');
            board[i.x][i.y].id.classList.add('red__square');
            board[i.x][i.y].changed = true;
          }
        }
        if (ableBlackQueen(board[indexes.xIndex][indexes.yIndex]).length !== 0)
          selected.black = true;
      }

      ///////////////////////////////////////////////////////////
      /////////////////////////////not queen/////////////////////
      else {
        if (!ableEating.black) {
          if (blackAbleRight(board[indexes.xIndex][indexes.yIndex])) {
            board[indexes.xIndex + 1][indexes.yIndex - 1].id.classList.remove(
              'black__square'
            );
            board[indexes.xIndex + 1][indexes.yIndex - 1].id.classList.add(
              'red__square'
            );
            changed.right = true;
            selected.black = true;
          }
          if (blackAbleLeft(board[indexes.xIndex][indexes.yIndex])) {
            board[indexes.xIndex + 1][indexes.yIndex + 1].id.classList.remove(
              'black__square'
            );
            board[indexes.xIndex + 1][indexes.yIndex + 1].id.classList.add(
              'red__square'
            );
            changed.left = true;
            selected.black = true;
          }
        }
        if (blackAbleEatLeft(board[indexes.xIndex][indexes.yIndex])) {
          board[indexes.xIndex + 2][indexes.yIndex + 2].id.classList.remove(
            'black__square'
          );
          board[indexes.xIndex + 2][indexes.yIndex + 2].id.classList.add(
            'red__square'
          );
          changed.eatLeft = true;
          selected.black = true;
        }
        if (blackAbleEatRight(board[indexes.xIndex][indexes.yIndex])) {
          board[indexes.xIndex + 2][indexes.yIndex - 2].id.classList.remove(
            'black__square'
          );
          board[indexes.xIndex + 2][indexes.yIndex - 2].id.classList.add(
            'red__square'
          );
          changed.eatRight = true;
          selected.black = true;
        }
      }
      if (selected.black === false && ableEating.black) {
        alert('must eat if you can');
      }
      ableEating.black = false;
    }
  }
});
function bMarkSecondEating(bChecker) {
  bMarkSecondSquares(board[bChecker.coordX][bChecker.coordY]);
  selected.black = true;
  second.black = true;
}
const movingSecondBlack = table.addEventListener('click', function (event) {
  if (turn.black == true && selected.black == true && second.black) {
    console.log('moving second black');
    let eats = false;
    const toYIndex = Math.floor(
      (event.target.getBoundingClientRect().left + window.pageXOffset) /
        moveLength
    );
    const toXIndex = Math.floor(
      (window.pageYOffset + event.target.getBoundingClientRect().top) /
        moveLength
    );
    if (event.target.classList.contains('red__square')) {
      if (toXIndex === indexes.xIndex + 2 && toYIndex === indexes.yIndex + 2) {
        b_check_ARR[indexes.xIndex][indexes.yIndex].blackEatLeft();
        eats = true;
      } else if (
        toXIndex === indexes.xIndex + 2 &&
        toYIndex === indexes.yIndex - 2
      ) {
        b_check_ARR[indexes.xIndex][indexes.yIndex].blackEatRight();

        eats = true;
      } else if (
        toXIndex === indexes.xIndex - 2 &&
        toYIndex === indexes.yIndex - 2
      ) {
        eats = true;
        b_check_ARR[indexes.xIndex][indexes.yIndex].blackEatRightBack();
      } else if (
        toXIndex === indexes.xIndex - 2 &&
        toYIndex === indexes.yIndex + 2
      ) {
        b_check_ARR[indexes.xIndex][indexes.yIndex].blackEatLeftBack();
        eats = true;
      }
      if (indexes.xIndex >= 2 && indexes.yIndex >= 2) {
        board[indexes.xIndex - 2][indexes.yIndex - 2].id.classList.remove(
          'red__square'
        );
        board[indexes.xIndex - 2][indexes.yIndex - 2].id.classList.add(
          'black__square'
        );
      }
      if (indexes.xIndex >= 2 && indexes.yIndex <= 5) {
        board[indexes.xIndex - 2][indexes.yIndex + 2].id.classList.remove(
          'red__square'
        );
        board[indexes.xIndex - 2][indexes.yIndex + 2].id.classList.add(
          'black__square'
        );
      }
      if (indexes.xIndex <= 5 && indexes.yIndex <= 5) {
        board[indexes.xIndex + 2][indexes.yIndex + 2].id.classList.remove(
          'red__square'
        );
        board[indexes.xIndex + 2][indexes.yIndex + 2].id.classList.add(
          'black__square'
        );
      }
      if (indexes.xIndex <= 5 && indexes.yIndex >= 2) {
        board[indexes.xIndex + 2][indexes.yIndex - 2].id.classList.remove(
          'red__square'
        );
        board[indexes.xIndex + 2][indexes.yIndex - 2].id.classList.add(
          'black__square'
        );
      }
      selected.black = false;
      if (
        bAbleSecondEating(board[toXIndex][toYIndex]) &&
        eats === true &&
        b_check_ARR[toXIndex][toYIndex].isKing === false
      ) {
        bMarkSecondEating(board[toXIndex][toYIndex]);
        indexes.xIndex = toXIndex;
        indexes.yIndex = toYIndex;
      } else {
        turn.black = false;
        turn.white = true;
        second.black = false;
      }
    }
  }
});
const movingSecondBlackQueen = table.addEventListener(
  'click',
  function (event) {
    if (turn.black == true && selected.black == true && second.blackQueen) {
      console.log('moving seccond black queen');
      const toYIndex = Math.floor(
        (event.target.getBoundingClientRect().left + window.pageXOffset) /
          moveLength
      );
      const toXIndex = Math.floor(
        (window.pageYOffset + event.target.getBoundingClientRect().top) /
          moveLength
      );
      if (event.target.classList.contains('red__square')) {
        console.log('also here');
        if (b_check_ARR[indexes.xIndex][indexes.yIndex].isKing) {
          console.log('wow im surprised');
          let direction;
          let leftOrRight;
          let eating = false;
          if (toXIndex > indexes.xIndex) {
            direction = 'backward';
          } else direction = 'forward';
          if (toYIndex > indexes.yIndex) leftOrRight = 'right';
          else leftOrRight = 'left';
          if (toXIndex <= 6 && toYIndex >= 1)
            if (
              direction === 'forward' &&
              leftOrRight === 'right' &&
              board[toXIndex + 1][toYIndex - 1].hasWhiteCheck
            )
              eating = true;
          if (toXIndex <= 6 && toYIndex <= 6)
            if (
              direction === 'forward' &&
              leftOrRight === 'left' &&
              board[toXIndex + 1][toYIndex + 1].hasWhiteCheck
            )
              eating = true;
          if (toXIndex >= 1 && toYIndex >= 1)
            if (
              direction === 'backward' &&
              leftOrRight === 'right' &&
              board[toXIndex - 1][toYIndex - 1].hasWhiteCheck
            )
              eating = true;
          if (toXIndex >= 1 && toYIndex <= 6)
            if (
              direction === 'backward' &&
              leftOrRight === 'left' &&
              board[toXIndex - 1][toYIndex + 1].hasWhiteCheck
            )
              eating = true;
          b_check_ARR[indexes.xIndex][indexes.yIndex].moveBlackQueen(
            indexes.xIndex,
            indexes.yIndex,
            toXIndex,
            toYIndex,
            direction,
            leftOrRight,
            eating
          );
          for (let i = 0; i <= 7; i++)
            for (let j = 0; j <= 7; j++)
              if (board[i][j].changed) {
                board[i][j].id.classList.remove('red__square');
                board[i][j].id.classList.add('black__square');
              }
          selected.black = false;
          if (eating) {
            ableBlackQueen(board[toXIndex][toYIndex]);
            if (ableEating.black) {
              if (secondEating.length !== 0) {
                for (const i of secondEating) {
                  board[i.x][i.y].id.classList.remove('black__square');
                  board[i.x][i.y].id.classList.add('red__square');
                  board[i.x][i.y].changed = true;
                }
                selected.black = true;
                second.blackQueen = true;
                indexes.xIndex = toXIndex;
                indexes.yIndex = toYIndex;
                secondEating = [];
                ableEating.black = false;
              }
            } else {
              turn.black = false;
              turn.white = true;
              second.blackQueen = false;
              ableEating.black = false;
            }
          } else {
            turn.black = false;
            turn.white = true;
            second.blackQueen = false;
            ableEating.black = false;
          }
        }
      }
    }
  }
);
const movingSecondWhiteQueen = table.addEventListener(
  'click',
  function (event) {
    if (turn.white && selected.white && second.whiteQeen) {
      console.log('moving second white queen');
      const toYIndex = Math.floor(
        (event.target.getBoundingClientRect().left + window.pageXOffset) /
          moveLength
      );
      const toXIndex = Math.floor(
        (window.pageYOffset + event.target.getBoundingClientRect().top) /
          moveLength
      );
      if (event.target.classList.contains('red__square')) {
        if (w_check_ARR[indexes.xIndex][indexes.yIndex].isKing) {
          let direction;
          let leftOrRight;
          let eating = false;
          if (toXIndex > indexes.xIndex) {
            direction = 'backward';
          } else direction = 'forward';
          if (toYIndex > indexes.yIndex) leftOrRight = 'right';
          else leftOrRight = 'left';
          if (toXIndex <= 6 && toYIndex >= 1)
            if (
              direction === 'forward' &&
              leftOrRight === 'right' &&
              board[toXIndex + 1][toYIndex - 1].hasBlackCheck
            )
              eating = true;
          if (toXIndex <= 6 && toYIndex <= 6)
            if (
              direction === 'forward' &&
              leftOrRight === 'left' &&
              board[toXIndex + 1][toYIndex + 1].hasBlackCheck
            )
              eating = true;
          if (toXIndex >= 1 && toYIndex >= 1)
            if (
              direction === 'backward' &&
              leftOrRight === 'right' &&
              board[toXIndex - 1][toYIndex - 1].hasBlackCheck
            )
              eating = true;
          if (toXIndex >= 1 && toYIndex <= 6)
            if (
              direction === 'backward' &&
              leftOrRight === 'left' &&
              board[toXIndex - 1][toYIndex + 1].hasBlackCheck
            )
              eating = true;
          w_check_ARR[indexes.xIndex][indexes.yIndex].moveWhiteQueen(
            indexes.xIndex,
            indexes.yIndex,
            toXIndex,
            toYIndex,
            direction,
            leftOrRight,
            eating
          );
          for (let i = 0; i <= 7; i++)
            for (let j = 0; j <= 7; j++)
              if (board[i][j].changed) {
                board[i][j].id.classList.remove('red__square');
                board[i][j].id.classList.add('black__square');
              }
          selected.white = false;
          if (eating) {
            ableWhiteQueen(board[toXIndex][toYIndex]);
            if (ableEating.white) {
              if (secondEating.length !== 0) {
                for (const i of secondEating) {
                  board[i.x][i.y].id.classList.remove('black__square');
                  board[i.x][i.y].id.classList.add('red__square');
                  board[i.x][i.y].changed = true;
                }
                selected.white = true;
                second.whiteQeen = true;
                indexes.xIndex = toXIndex;
                indexes.yIndex = toYIndex;
                secondEating = [];
                ableEating.white = false;
                ableEating.white = false;
              }
            } else {
              turn.white = false;
              turn.black = true;
              second.whiteQeen = false;
            }
          } else {
            turn.black = false;
            turn.white = true;
            second.whiteQeen = false;
          }
        }
      }
    }
  }
);
//////////////////////////////////////////////////////////////////////
/////////////////////////// moving black /////////////////////////////
const movingBlack = table.addEventListener('click', function (event) {
  let eats = false;
  if (
    turn.black == true &&
    selected.black == true &&
    second.black == false &&
    second.blackQueen === false
  ) {
    console.log('moving black');
    const toYIndex = Math.floor(
      (event.target.getBoundingClientRect().left + window.pageXOffset) /
        moveLength
    );
    const toXIndex = Math.floor(
      (window.pageYOffset + event.target.getBoundingClientRect().top) /
        moveLength
    );
    if (event.target.classList.contains('red__square')) {
      if (b_check_ARR[indexes.xIndex][indexes.yIndex].isKing) {
        let direction;
        let leftOrRight;
        let eating = false;
        if (toXIndex > indexes.xIndex) {
          direction = 'backward';
        } else direction = 'forward';
        if (toYIndex > indexes.yIndex) leftOrRight = 'right';
        else leftOrRight = 'left';
        if (toXIndex <= 6 && toYIndex >= 1)
          if (
            direction === 'forward' &&
            leftOrRight === 'right' &&
            board[toXIndex + 1][toYIndex - 1].hasWhiteCheck
          )
            eating = true;
        if (toXIndex <= 6 && toYIndex <= 6)
          if (
            direction === 'forward' &&
            leftOrRight === 'left' &&
            board[toXIndex + 1][toYIndex + 1].hasWhiteCheck
          )
            eating = true;
        if (toXIndex >= 1 && toYIndex >= 1)
          if (
            direction === 'backward' &&
            leftOrRight === 'right' &&
            board[toXIndex - 1][toYIndex - 1].hasWhiteCheck
          )
            eating = true;
        if (toXIndex >= 1 && toYIndex <= 6)
          if (
            direction === 'backward' &&
            leftOrRight === 'left' &&
            board[toXIndex - 1][toYIndex + 1].hasWhiteCheck
          )
            eating = true;
        b_check_ARR[indexes.xIndex][indexes.yIndex].moveBlackQueen(
          indexes.xIndex,
          indexes.yIndex,
          toXIndex,
          toYIndex,
          direction,
          leftOrRight,
          eating
        );
        for (let i = 0; i <= 7; i++)
          for (let j = 0; j <= 7; j++)
            if (board[i][j].changed) {
              board[i][j].id.classList.remove('red__square');
              board[i][j].id.classList.add('black__square');
            }
        selected.black = false;
        if (eating) {
          ableBlackQueen(board[toXIndex][toYIndex]);
          if (ableEating.black) {
            if (secondEating.length !== 0) {
              for (const i of secondEating) {
                board[i.x][i.y].id.classList.remove('black__square');
                board[i.x][i.y].id.classList.add('red__square');
                board[i.x][i.y].changed = true;
              }
              selected.black = true;
              second.blackQueen = true;
              indexes.xIndex = toXIndex;
              indexes.yIndex = toYIndex;
              secondEating = [];
              ableEating.black = false;
            }
          } else {
            turn.black = false;
            turn.white = true;
            ableEating.black = false;
          }
        } else {
          turn.black = false;
          turn.white = true;
          ableEating.black = false;
        }
      } else {
        if (toYIndex === indexes.yIndex + 1) {
          b_check_ARR[indexes.xIndex][indexes.yIndex].blackMoveLeft();
        } else if (toYIndex === indexes.yIndex - 1)
          b_check_ARR[indexes.xIndex][indexes.yIndex].blackMoveRight();
        else if (toYIndex === indexes.yIndex + 2) {
          eats = true;
          b_check_ARR[indexes.xIndex][indexes.yIndex].blackEatLeft();
        } else if (toYIndex === indexes.yIndex - 2) {
          b_check_ARR[indexes.xIndex][indexes.yIndex].blackEatRight();
          eats = true;
        }
        if (changed.right) {
          board[indexes.xIndex + 1][indexes.yIndex - 1].id.classList.remove(
            'red__square'
          );
          board[indexes.xIndex + 1][indexes.yIndex - 1].id.classList.add(
            'black__square'
          );
        }
        if (changed.left) {
          board[indexes.xIndex + 1][indexes.yIndex + 1].id.classList.remove(
            'red__square'
          );
          board[indexes.xIndex + 1][indexes.yIndex + 1].id.classList.add(
            'black__square'
          );
        }
        if (changed.eatLeft) {
          board[indexes.xIndex + 2][indexes.yIndex + 2].id.classList.remove(
            'red__square'
          );
          board[indexes.xIndex + 2][indexes.yIndex + 2].id.classList.add(
            'black__square'
          );
        }
        if (changed.eatRight) {
          board[indexes.xIndex + 2][indexes.yIndex - 2].id.classList.remove(
            'red__square'
          );
          board[indexes.xIndex + 2][indexes.yIndex - 2].id.classList.add(
            'black__square'
          );
        }

        selected.black = false;
        if (
          bAbleSecondEating(board[toXIndex][toYIndex]) &&
          eats === true &&
          b_check_ARR[toXIndex][toYIndex].isKing === false
        ) {
          bMarkSecondEating(board[toXIndex][toYIndex]);
          indexes.xIndex = toXIndex;
          indexes.yIndex = toYIndex;
        } else {
          turn.black = false;
          turn.white = true;
        }
      }
    }
  }
});
///////////////////////////////////////////////////////////////////////////////
////////////////////////////// marks where white can go //////////////////////
const markingWhite = table.addEventListener('click', function (e) {
  if (turn.white == true && selected.white == false) {
    for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
        if (w_check_ARR[i][j] !== undefined)
          if (whiteAbleEatLeft(board[i][j]) || whiteAbleEatRight(board[i][j])) {
            ableEating.white = true;
          }
        if (w_check_ARR[i][j])
          if (w_check_ARR[i][j].isKing) {
            ableWhiteQueen(w_check_ARR[i][j]);
          }
      }
    }
    console.log('marking white');
    changed.eatLeft = false;
    changed.eatRight = false;
    changed.right = false;
    changed.left = false;
    if (e.target.id.includes('whiteChecker')) {
      indexes.xIndex = Math.floor(
        (window.pageYOffset + e.target.getBoundingClientRect().top) / moveLength
      );
      indexes.yIndex = Math.floor(
        (e.target.getBoundingClientRect().left + window.pageXOffset) /
          moveLength
      );
      ///////////////////////////////////////////////////////////
      //////////////////////   queen/////////////////////////////

      if (w_check_ARR[indexes.xIndex][indexes.yIndex].isKing) {
        for (const i of ableWhiteQueen(board[indexes.xIndex][indexes.yIndex])) {
          if (ableEating.white) {
            if (i.eat) {
              board[i.x][i.y].id.classList.remove('black__square');
              board[i.x][i.y].id.classList.add('red__square');
              board[i.x][i.y].changed = true;
            }
          } else {
            board[i.x][i.y].id.classList.remove('black__square');
            board[i.x][i.y].id.classList.add('red__square');
            board[i.x][i.y].changed = true;
          }
        }
        if (ableWhiteQueen(board[indexes.xIndex][indexes.yIndex]).length !== 0)
          selected.white = true;
      }
      ///////////////////////////////////////////////////////////////
      /////////////// not queen /////////////////////////////////////
      else {
        if (!ableEating.white) {
          if (whiteAbleRight(board[indexes.xIndex][indexes.yIndex])) {
            board[indexes.xIndex - 1][indexes.yIndex + 1].id.classList.remove(
              'black__square'
            );
            board[indexes.xIndex - 1][indexes.yIndex + 1].id.classList.add(
              'red__square'
            );
            changed.right = true;
            selected.white = true;
          }
          if (whiteAbleLeft(board[indexes.xIndex][indexes.yIndex])) {
            board[indexes.xIndex - 1][indexes.yIndex - 1].id.classList.remove(
              'black__square'
            );
            board[indexes.xIndex - 1][indexes.yIndex - 1].id.classList.add(
              'red__square'
            );
            changed.left = true;
            selected.white = true;
          }
        }
        if (whiteAbleEatLeft(board[indexes.xIndex][indexes.yIndex])) {
          board[indexes.xIndex - 2][indexes.yIndex - 2].id.classList.remove(
            'black__square'
          );
          board[indexes.xIndex - 2][indexes.yIndex - 2].id.classList.add(
            'red__square'
          );
          changed.eatLeft = true;
          selected.white = true;
        }
        if (whiteAbleEatRight(board[indexes.xIndex][indexes.yIndex])) {
          board[indexes.xIndex - 2][indexes.yIndex + 2].id.classList.remove(
            'black__square'
          );
          board[indexes.xIndex - 2][indexes.yIndex + 2].id.classList.add(
            'red__square'
          );
          changed.eatRight = true;
          selected.white = true;
        }
      }
      if (selected.white === false && ableEating.white) {
        alert('must eat if you can');
      }
      ableEating.white = false;
    }
  }
});
function wMarkSecondEating(wChecker) {
  wMarkSecondSquares(board[wChecker.coordX][wChecker.coordY]);
  second.white = true;
  selected.white = true;
}
const movingSecondWhite = table.addEventListener('click', function (event) {
  if (turn.white == true && selected.white == true && second.white) {
    let eats = false;
    console.log('moving second white');
    const toYIndex = Math.floor(
      (event.target.getBoundingClientRect().left + window.pageXOffset) /
        moveLength
    );
    const toXIndex = Math.floor(
      (window.pageYOffset + event.target.getBoundingClientRect().top) /
        moveLength
    );
    if (event.target.classList.contains('red__square')) {
      if (toXIndex === indexes.xIndex + 2 && toYIndex === indexes.yIndex + 2) {
        w_check_ARR[indexes.xIndex][indexes.yIndex].whiteEatRightBack();
        eats = true;
      } else if (
        toXIndex === indexes.xIndex + 2 &&
        toYIndex === indexes.yIndex - 2
      ) {
        w_check_ARR[indexes.xIndex][indexes.yIndex].whiteEatLeftBack();

        eats = true;
      } else if (
        toXIndex === indexes.xIndex - 2 &&
        toYIndex === indexes.yIndex - 2
      ) {
        eats = true;
        w_check_ARR[indexes.xIndex][indexes.yIndex].whiteEatLeft();
      } else if (
        toXIndex === indexes.xIndex - 2 &&
        toYIndex === indexes.yIndex + 2
      ) {
        w_check_ARR[indexes.xIndex][indexes.yIndex].whiteEatRight();
        eats = true;
      }
      if (indexes.xIndex >= 2 && indexes.yIndex >= 2) {
        board[indexes.xIndex - 2][indexes.yIndex - 2].id.classList.remove(
          'red__square'
        );
        board[indexes.xIndex - 2][indexes.yIndex - 2].id.classList.add(
          'black__square'
        );
      }
      if (indexes.xIndex >= 2 && indexes.yIndex <= 5) {
        board[indexes.xIndex - 2][indexes.yIndex + 2].id.classList.remove(
          'red__square'
        );
        board[indexes.xIndex - 2][indexes.yIndex + 2].id.classList.add(
          'black__square'
        );
      }
      if (indexes.xIndex <= 5 && indexes.yIndex <= 5) {
        board[indexes.xIndex + 2][indexes.yIndex + 2].id.classList.remove(
          'red__square'
        );
        board[indexes.xIndex + 2][indexes.yIndex + 2].id.classList.add(
          'black__square'
        );
      }
      if (indexes.xIndex <= 5 && indexes.yIndex >= 2) {
        board[indexes.xIndex + 2][indexes.yIndex - 2].id.classList.remove(
          'red__square'
        );
        board[indexes.xIndex + 2][indexes.yIndex - 2].id.classList.add(
          'black__square'
        );
      }
      selected.white = false;
      if (
        wAbleSecondEating(board[toXIndex][toYIndex]) &&
        eats === true &&
        w_check_ARR[toXIndex][toYIndex].isKing === false
      ) {
        wMarkSecondEating(board[toXIndex][toYIndex]);
        indexes.xIndex = toXIndex;
        indexes.yIndex = toYIndex;
      } else {
        turn.white = false;
        turn.black = true;
        second.white = false;
      }
    }
  }
});
/////////////////////////////////////////////////////////////////
//////////////////// moving white ///////////////////////////////
const movingWhite = table.addEventListener('click', function (event) {
  let eats = false;
  if (turn.white && selected.white && second.white == false) {
    const toYIndex = Math.floor(
      (event.target.getBoundingClientRect().left + window.pageXOffset) /
        moveLength
    );
    const toXIndex = Math.floor(
      (window.pageYOffset + event.target.getBoundingClientRect().top) /
        moveLength
    );
    console.log('moving white');
    if (event.target.classList.contains('red__square')) {
      if (w_check_ARR[indexes.xIndex][indexes.yIndex].isKing) {
        let direction;
        let leftOrRight;
        let eating = false;
        if (toXIndex > indexes.xIndex) {
          direction = 'backward';
        } else direction = 'forward';
        if (toYIndex > indexes.yIndex) leftOrRight = 'right';
        else leftOrRight = 'left';
        if (toXIndex <= 6 && toYIndex >= 1)
          if (
            direction === 'forward' &&
            leftOrRight === 'right' &&
            board[toXIndex + 1][toYIndex - 1].hasBlackCheck
          )
            eating = true;
        if (toXIndex <= 6 && toYIndex <= 6)
          if (
            direction === 'forward' &&
            leftOrRight === 'left' &&
            board[toXIndex + 1][toYIndex + 1].hasBlackCheck
          )
            eating = true;
        if (toXIndex >= 1 && toYIndex >= 1)
          if (
            direction === 'backward' &&
            leftOrRight === 'right' &&
            board[toXIndex - 1][toYIndex - 1].hasBlackCheck
          )
            eating = true;
        if (toXIndex >= 1 && toYIndex <= 6)
          if (
            direction === 'backward' &&
            leftOrRight === 'left' &&
            board[toXIndex - 1][toYIndex + 1].hasBlackCheck
          )
            eating = true;
        w_check_ARR[indexes.xIndex][indexes.yIndex].moveWhiteQueen(
          indexes.xIndex,
          indexes.yIndex,
          toXIndex,
          toYIndex,
          direction,
          leftOrRight,
          eating
        );
        for (let i = 0; i <= 7; i++)
          for (let j = 0; j <= 7; j++)
            if (board[i][j].changed) {
              board[i][j].id.classList.remove('red__square');
              board[i][j].id.classList.add('black__square');
            }
        selected.white = false;
        if (eating) {
          ableWhiteQueen(board[toXIndex][toYIndex]);
          if (ableEating.white) {
            if (secondEating.length !== 0) {
              for (const i of secondEating) {
                board[i.x][i.y].id.classList.remove('black__square');
                board[i.x][i.y].id.classList.add('red__square');
                board[i.x][i.y].changed = true;
              }
              selected.white = true;
              second.whiteQeen = true;
              indexes.xIndex = toXIndex;
              indexes.yIndex = toYIndex;
              secondEating = [];
              ableEating.white = false;
            }
          } else {
            turn.white = false;
            turn.black = true;
          }
        } else {
          turn.white = false;
          turn.black = true;
        }
      } else {
        if (toYIndex === indexes.yIndex + 1) {
          w_check_ARR[indexes.xIndex][indexes.yIndex].whiteMoveRight();
        } else if (toYIndex === indexes.yIndex - 1)
          w_check_ARR[indexes.xIndex][indexes.yIndex].whiteMoveLeft();
        else if (toYIndex === indexes.yIndex + 2) {
          w_check_ARR[indexes.xIndex][indexes.yIndex].whiteEatRight();
          eats = true;
        } else if (toYIndex === indexes.yIndex - 2) {
          w_check_ARR[indexes.xIndex][indexes.yIndex].whiteEatLeft();
          eats = true;
        }
        if (changed.left) {
          board[indexes.xIndex - 1][indexes.yIndex - 1].id.classList.remove(
            'red__square'
          );
          board[indexes.xIndex - 1][indexes.yIndex - 1].id.classList.add(
            'black__square'
          );
        }
        if (changed.right) {
          board[indexes.xIndex - 1][indexes.yIndex + 1].id.classList.remove(
            'red__square'
          );
          board[indexes.xIndex - 1][indexes.yIndex + 1].id.classList.add(
            'black__square'
          );
        }
        if (changed.eatLeft) {
          board[indexes.xIndex - 2][indexes.yIndex - 2].id.classList.remove(
            'red__square'
          );
          board[indexes.xIndex - 2][indexes.yIndex - 2].id.classList.add(
            'black__square'
          );
        }
        if (changed.eatRight) {
          board[indexes.xIndex - 2][indexes.yIndex + 2].id.classList.remove(
            'red__square'
          );
          board[indexes.xIndex - 2][indexes.yIndex + 2].id.classList.add(
            'black__square'
          );
        }

        selected.white = false;
        if (
          wAbleSecondEating(board[toXIndex][toYIndex]) &&
          eats === true &&
          w_check_ARR[toXIndex][toYIndex].isKing === false
        ) {
          indexes.xIndex = toXIndex;
          indexes.yIndex = toYIndex;
          wMarkSecondEating(board[toXIndex][toYIndex]);
        } else {
          turn.black = true;
          turn.white = false;
        }
      }
    }
  }
});
function finishGame(board) {
  let countBlack = 0;
  let countWhite = 0;
  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 7; j++) {
      if (board[i][j].hasBlackCheck) countBlack++;
      else if (board[i][j].hasWhiteCheck) countWhite++;
    }
  }
  if (countBlack === 0) {
    alert('white wins! great job');
  } else if (countWhite === 0) {
    alert('black wins great job');
  }
}
