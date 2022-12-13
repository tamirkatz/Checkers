('use strict');
/////////////////////////////////////////////////////////////////
//HTML declerations/////////////////////////////////////////////////////////////

let secondEating = [];
const squareARR = Array.from(document.querySelectorAll('.square'));
const table = document.querySelector('.board');
const whiteCheckClass = Array.from(
  document.querySelectorAll('.white__checker')
);
let white_score = document.getElementById('score--1');
let black_score = document.getElementById('score--0');
let demo = {
  isDemo: false,
};
const blackCheckClass = Array.from(
  document.querySelectorAll('.black__checker')
);
const btn = Array.from(document.querySelectorAll('.btn'));
let secondInit = {
  happend: false,
};
let countCheckers = {
  black: 12,
  white: 12,
};
let countKings = {
  black: 0,
  white: 0,
};
let turn = {
  black: false,
  white: true,
};
let offeredTie = {
  black: false,
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
let ableMove = {
  white: false,
  black: false,
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
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
const moveLength = 80;
const moveDeviation = 6;
class checkerCL {
  constructor(piece, color, isKing, squareX, squareY) {
    this.id = piece;
    this.color = color;
    this.isKing = isKing;
    this.alive = true;
    this.attack = false;
    this.coordX = squareX;
    this.coordY = squareY;
  }
  setCoords() {
    // init the checkers in their place
    const x = this.coordX * moveLength + moveDeviation;
    const y = this.coordY * moveLength + moveDeviation;
    this.id.style.top = `${x}px`;
    this.id.style.left = `${y}px`;
  }
  checkIsKing() {
    //check if a checker became king
    if (this.color === 'black' && this.coordX == 7) {
      countKings.black++;
      return true;
    }
    if (this.color === 'white' && this.coordX == 0) {
      countKings.white++;
      return true;
    } else return false;
  }

  Move(board, b_check_arr, w_check_arr, rightOrLeft, color) {
    //instead of blackMoveLeft etc.
    const prevX = this.coordX;
    const prevY = this.coordY;
    let arr, newX, newY;
    if (color == 'black') {
      arr = b_check_arr;
      newX = prevX + 1;
      rightOrLeft == 'right' ? (newY = prevY - 1) : (newY = prevY + 1);
      board[prevX][prevY].hasBlackCheck = false;
      board[newX][newY].hasBlackCheck = true;
    } else {
      arr = w_check_arr;
      newX = prevX - 1;
      rightOrLeft == 'right' ? (newY = prevY + 1) : (newY = prevY - 1);
      board[prevX][prevY].hasWhiteCheck = false;
      board[newX][newY].hasWhiteCheck = true;
    }
    arr[newX][newY] = arr[prevX][prevY];
    arr[prevX][prevY] = undefined;
    this.coordX = newX;
    this.coordY = newY;
    const x = newX * moveLength + moveDeviation;
    const y = newY * moveLength + moveDeviation;
    this.id.style.top = `${x}px`;
    this.id.style.left = `${y}px`;
    if (!this.isKing) {
      if (this.checkIsKing()) {
        this.isKing = true;
        this.id.style.border = '4px solid Red';
      }
    }
  }
  Eat(board, b_check_arr, w_check_arr, color, forOrBack, rightOrLeft) {
    let prevX = this.coordX;
    let prevY = this.coordY;
    let newX, newY, eatenX, eatenY, eatingArr, eatenArr;
    let white_score;
    if (color == 'black') {
      eatingArr = b_check_arr;
      document.getElementById('score--1').textContent =
        Number(document.getElementById('score--1').textContent) - 1;
      eatenArr = w_check_arr;
      countCheckers.white -= 1;
      if (forOrBack == 'forward') {
        newX = prevX + 2;
        eatenX = prevX + 1;
      } else {
        newX = prevX - 2;
        eatenX = prevX - 1;
      }
      if (rightOrLeft == 'right') {
        newY = prevY - 2;
        eatenY = prevY - 1;
      } else {
        newY = prevY + 2;
        eatenY = prevY + 1;
      }
      board[eatenX][eatenY].hasWhiteCheck = false;
      board[prevX][prevY].hasBlackCheck = false;
      board[newX][newY].hasBlackCheck = true;
    } else {
      eatingArr = w_check_arr;
      document.getElementById('score--0').textContent =
        Number(document.getElementById('score--0').textContent) - 1;
      eatenArr = b_check_arr;
      countCheckers.black -= 1;
      if (forOrBack == 'forward') {
        newX = prevX - 2;
        eatenX = prevX - 1;
      } else {
        newX = prevX + 2;
        eatenX = prevX + 1;
      }
      if (rightOrLeft == 'right') {
        newY = prevY + 2;
        eatenY = prevY + 1;
      } else {
        newY = prevY - 2;
        eatenY = prevY - 1;
      }
      board[eatenX][eatenY].hasBlackCheck = false;
      board[prevX][prevY].hasWhiteCheck = false;
      board[newX][newY].hasWhiteCheck = true;
    }
    eatenArr[eatenX][eatenY].id.style.display = 'none';
    eatenArr[eatenX][eatenY] = undefined;
    eatingArr[newX][newY] = eatingArr[prevX][prevY];
    eatingArr[prevX][prevY] = undefined;
    const x = newX * moveLength + moveDeviation;
    const y = newY * moveLength + moveDeviation;
    this.coordX = newX;
    this.coordY = newY;
    this.id.style.top = `${x}px`;
    this.id.style.left = `${y}px`;
    finishGame(board);
    if (!this.isKing) {
      if (this.checkIsKing()) {
        this.isKing = true;
        this.id.style.border = '4px solid Red';
      }
    }
  }
  moveBlackQueen(
    board,
    b_check_ARR,
    w_check_ARR,
    xIndex,
    yIndex,
    toXIndex,
    toYIndex,
    direction,
    leftOrRight,
    eating
  ) {
    let eatenX, eatenY;
    if (eating) {
      if (direction == 'forward') {
        eatenX = toXIndex + 1;
      } else {
        eatenX = toXIndex - 1;
      }
      if (leftOrRight == 'left') {
        eatenY = toYIndex + 1;
      } else {
        eatenY = toYIndex - 1;
      }
      w_check_ARR[eatenX][eatenY].id.style.display = 'none';
      w_check_ARR[eatenX][eatenY] = undefined;
      board[eatenX][eatenY].hasWhiteCheck = false;
      document.getElementById('score--1').textContent =
        Number(document.getElementById('score--1').textContent) - 1;
      countCheckers.white--;
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
    board,
    b_check_ARR,
    w_check_ARR,
    xIndex,
    yIndex,
    toXIndex,
    toYIndex,
    direction,
    leftOrRight,
    eating
  ) {
    let eatenX, eatenY;
    if (eating) {
      if (direction == 'forward') {
        eatenX = toXIndex + 1;
      } else {
        eatenX = toXIndex - 1;
      }
      if (leftOrRight == 'left') {
        eatenY = toYIndex + 1;
      } else {
        eatenY = toYIndex - 1;
      }
      b_check_ARR[eatenX][eatenY].id.style.display = 'none';
      b_check_ARR[eatenX][eatenY] = undefined;
      board[eatenX][eatenY].hasBlackCheck = false;
      document.getElementById('score--0').textContent =
        Number(document.getElementById('score--0').textContent) - 1;
      countCheckers.black--;
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
  if (secondInit.happend) {
    for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
        board[i][j].id.classList.remove('red__square');
        board[i][j].id.classList.add('black__square');
        selected.black = true;
      }
    }
    document.getElementById('score--1').textContent = '12';
    document.getElementById('score--0').textContent = '12';
    ableEating.black = false;
    ableEating.white = false;
    selected.black = false;
    selected.white = false;
    second.black = false;
    second.white = false;
    changed.left = false;
    changed.right = false;
    changed.eatLeft = false;
    changed.eatRight = false;
    blocking.black = false;
    blocking.white = false;
    indexes.xIndex = undefined;
    indexes.yIndex = undefined;
    turn.black = false;
    turn.white = true;
    offeredTie.black = false;
    offeredTie.white = false;
    document.querySelector('.white__current').classList.add('hidden');
    document.querySelector('.black__current').classList.add('hidden');

    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        w_check_ARR[x][y] = undefined;
        b_check_ARR[x][y] = undefined;
        board[x][y].hasBlackCheck = false;
        board[x][y].hasWhiteCheck = false;
      }
    }
  }
  secondInit.happend = false;
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
          false,
          x,
          y
        );
        b_check_ARR[x][y].id.style.display = 'block';
        b_check_ARR[x][y].id.style.border = '4px solid white';
        b_check_ARR[x][y].setCoords();

        bCounter++;
      }
      if (blackSquare && lastThree) {
        board[x][y].hasWhiteCheck = true;
        w_check_ARR[x][y] = new checkerCL(
          whiteCheckClass[wCounter],
          'white',
          false,
          x,
          y
        );
        w_check_ARR[x][y].id.style.display = 'block';
        w_check_ARR[x][y].id.style.border = '4px solid white';
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

function ableQueen(square, color) {
  secondEating = [];
  class ableSquare {
    constructor(x, y, eat) {
      this.x = x;
      this.y = y;
      this.eat = eat;
    }
  }
  let x = square.coordX,
    y = square.coordY;
  let finalAbleArr = [];
  let hasColor, hasOppositColor;
  let firstAbleArr = [],
    secondAbleArr = [],
    thirdAbleArr = [],
    fourthAbleArr = [];
  if (color == 'black') {
    hasColor = 'hasBlackCheck';
    hasOppositColor = 'hasWhiteCheck';
  } else {
    hasColor = 'hasWhiteCheck';
    hasOppositColor = 'hasBlackCheck';
  }
  while (x >= 1 && y >= 1) {
    if (eval(`board[x - 1][y - 1].${hasColor}`) === true) {
      x = -1;
      y = -1;
    }
    if (x !== -1)
      if (eval(`board[x - 1][y - 1].${hasOppositColor}`)) {
        if (x >= 2 && y >= 2) {
          if (eval(`board[x - 2][y - 2].${hasOppositColor}`)) {
            y = -1;
            x = -1;
          } else if (eval(`board[x - 2][y - 2].${hasColor}`)) {
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
          eval(`board[x - 1][y - 1].${hasOppositColor}`) === true &&
          eval(`board[x - 2][y - 2].${hasOppositColor}`) === false &&
          eval(`board[x - 2][y - 2].${hasColor}`) === false
        ) {
          eval(`selected.${color} = true`);
          eval(`ableEating.${color} = true`);
          firstAbleArr = [];
          firstAbleArr.push(new ableSquare(x - 2, y - 2, true));
          secondEating.push(new ableSquare(x - 2, y - 2, true));
          x = -1;
          y = -1;
        }
    if (x !== -1)
      if (eval(`board[x - 1][y - 1].${hasOppositColor}`) === false) {
        eval(`selected.${color} = true`);
        if (eval(`!ableEating.${color}`))
          firstAbleArr.push(new ableSquare(x - 1, y - 1, false));
        x--;
        y--;
      }
  }
  x = square.coordX;
  y = square.coordY;

  while (x <= 6 && y <= 6) {
    if (eval(`board[x + 1][y + 1].${hasColor}`) === true) {
      x = 8;
      y = 8;
    }
    if (x !== 8)
      if (eval(`board[x + 1][y + 1].${hasOppositColor}`)) {
        if (x <= 5 && y <= 5) {
          if (eval(`board[x + 2][y + 2].${hasOppositColor}`)) {
            y = 8;
            x = 8;
          } else if (eval(`board[x + 2][y + 2].${hasColor}`)) {
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
          eval(`board[x + 1][y + 1].${hasOppositColor}`) === true &&
          eval(`board[x + 2][y + 2].${hasOppositColor}`) === false &&
          eval(`board[x + 2][y + 2].${hasColor}`) === false
        ) {
          eval(`selected.${color} = true`);
          eval(`ableEating.${color} = true`);
          secondAbleArr = [];
          secondAbleArr.push(new ableSquare(x + 2, y + 2, true));
          secondEating.push(new ableSquare(x + 2, y + 2, true));
          x = 8;
          y = 8;
        }
    if (x !== 8)
      if (eval(`board[x + 1][y + 1].${hasOppositColor}`) === false) {
        if (eval(`!ableEating.${color}`))
          secondAbleArr.push(new ableSquare(x + 1, y + 1, false));
        eval(`selected.${color} = true`);
        x++;
        y++;
      }
  }
  x = square.coordX;
  y = square.coordY;
  while (x <= 6 && y >= 1) {
    if (eval(`board[x + 1][y - 1].${hasColor}`) === true) {
      x = 8;
      y = -1;
    }
    if (x !== 8)
      if (eval(`board[x + 1][y - 1].${hasOppositColor}`)) {
        if (x <= 5 && y >= 2) {
          if (eval(`board[x + 2][y - 2].${hasOppositColor}`)) {
            y = -1;
            x = 8;
          } else if (eval(`board[x + 2][y - 2].${hasColor}`)) {
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
          eval(`board[x + 1][y - 1].${hasOppositColor}`) === true &&
          eval(`board[x + 2][y - 2].${hasOppositColor}`) === false &&
          eval(`board[x + 2][y - 2].${hasColor}`) === false
        ) {
          eval(`selected.${color} = true`);
          eval(`ableEating.${color} = true`);
          thirdAbleArr = [];
          thirdAbleArr.push(new ableSquare(x + 2, y - 2, true));
          secondEating.push(new ableSquare(x + 2, y - 2, true));
          x = 8;
          y = -1;
        }
    if (x !== 8)
      if (eval(`board[x + 1][y - 1].${hasOppositColor}`) === false) {
        if (eval(`!ableEating.${color}`))
          thirdAbleArr.push(new ableSquare(x + 1, y - 1, false));
        eval(`selected.${color} = true`);
        x++;
        y--;
      }
  }

  x = square.coordX;
  y = square.coordY;
  while (x >= 1 && y <= 6) {
    if (eval(`board[x - 1][y + 1].${hasColor}`) === true) {
      x = -1;
      y = 8;
    }
    if (y !== 8)
      if (eval(`board[x - 1][y + 1].${hasOppositColor}`)) {
        if (x >= 2 && y <= 5) {
          if (eval(`board[x - 2][y + 2].${hasColor}`)) {
            x = -1;
            y = 8;
          } else if (eval(`board[x - 2][y + 2].${hasOppositColor}`)) {
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
          eval(`board[x - 1][y + 1].${hasOppositColor}`) === true &&
          eval(`board[x - 2][y + 2].${hasOppositColor}`) === false &&
          eval(`board[x - 2][y + 2].${hasColor}`) === false
        ) {
          eval(`selected.${color} = true`);
          eval(`ableEating.${color} = true`);
          fourthAbleArr = [];
          fourthAbleArr.push(new ableSquare(x - 2, y + 2, true));
          secondEating.push(new ableSquare(x - 2, y + 2, true));
          x = 0;
          y = 8;
        }
    if (y !== 8)
      if (eval(`board[x - 1][y + 1].${hasOppositColor}`) === false) {
        if (eval(`!ableEating.${color}`))
          fourthAbleArr.push(new ableSquare(x - 1, y + 1, false));
        eval(`selected.${color} = true`);
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
function whiteAbleEating(square) {
  class toIndex {
    constructor(x, y, direction) {
      this.x = x;
      this.y = y;
      this.direction = direction;
    }
  }
  let ableTo = [];
  if (whiteAbleEatLeft(board[square.coordX][square.coordY])) {
    ableTo.push(new toIndex(square.coordX - 2, square.coordY - 2, 'fl'));
  }
  if (whiteAbleEatRight(board[square.coordX][square.coordY])) {
    ableTo.push(new toIndex(square.coordX - 2, square.coordY + 2, 'fr'));
  }
  return ableTo;
}
function whiteAbleSecondEating(square) {
  class toIndex {
    constructor(x, y, direction) {
      this.x = x;
      this.y = y;
      this.direction = direction;
    }
  }
  let ableTo = [];
  if (whiteAbleEatLeft(board[square.coordX][square.coordY])) {
    ableTo.push(new toIndex(square.coordX - 2, square.coordY - 2, 'fl'));
  }
  if (whiteAbleEatRight(board[square.coordX][square.coordY])) {
    ableTo.push(new toIndex(square.coordX - 2, square.coordY + 2, 'fr'));
  }
  if (whiteAbleEatLeftBack(board[square.coordX][square.coordY])) {
    ableTo.push(new toIndex(square.coordX + 2, square.coordY - 2, 'bl'));
  }
  if (whiteAbleEatRightBack(board[square.coordX][square.coordY])) {
    ableTo.push(new toIndex(square.coordX + 2, square.coordY + 2, 'br'));
  }
  return ableTo;
}

function BlackAbleEating(square) {
  class toIndex {
    constructor(x, y, direction) {
      this.x = x;
      this.y = y;
      this.direction = direction;
    }
  }
  let ableTo = [];
  if (blackAbleEatLeft(board[square.coordX][square.coordY])) {
    ableTo.push(new toIndex(square.coordX + 2, square.coordY + 2, 'fl'));
  }
  if (blackAbleEatRight(board[square.coordX][square.coordY])) {
    ableTo.push(new toIndex(square.coordX + 2, square.coordY - 2, 'fr'));
  }
  return ableTo;
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
      for (const i of ableQueen(
        board[indexes.xIndex][indexes.yIndex],
        'black'
      )) {
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
      for (const i of ableQueen(
        board[indexes.xIndex][indexes.yIndex],
        'white'
      )) {
        board[i.x][i.y].changed = true;
      }
    }
  }
});

/////////////////////////////////////////////////////////////////////
///////////////////////  marks where black able to go////////////////////
const markingBlack = table.addEventListener('click', function (e) {
  ableMove.black = false;
  if (turn.black == true && selected.black == false) {
    ableMove.black = false;
    for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
        if (b_check_ARR[i][j] !== undefined) {
          if (blackAbleEatLeft(board[i][j]) || blackAbleEatRight(board[i][j])) {
            ableEating.black = true;
          }

          if (
            blackAbleLeft(board[i][j]) ||
            blackAbleRight(board[i][j]) ||
            blackAbleEatLeft(board[i][j]) ||
            blackAbleEatRight(board[i][j])
          ) {
            ableMove.black = true;
          }

          if (b_check_ARR[i][j])
            if (b_check_ARR[i][j].isKing) {
              ableQueen(board[i][j], 'black');
            }
          if (b_check_ARR[i][j])
            if (b_check_ARR[i][j].isKing)
              if (ableQueen(board[i][j], 'black').length !== 0) {
                ableMove.black = true;
              }
        }
      }
    }
    if (ableMove.black === false) {
      alert('White wins! good gob :)');
      secondInit.happend = true;
      boardIntialize(board);
      return;
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
        for (const i of ableQueen(
          board[indexes.xIndex][indexes.yIndex],
          'black'
        )) {
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
        if (
          ableQueen(board[indexes.xIndex][indexes.yIndex], 'black').length !== 0
        )
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
        b_check_ARR[indexes.xIndex][indexes.yIndex].Eat(
          board,
          b_check_ARR,
          w_check_ARR,
          'black',
          'forward',
          'left'
        );
        eats = true;
      } else if (
        toXIndex === indexes.xIndex + 2 &&
        toYIndex === indexes.yIndex - 2
      ) {
        b_check_ARR[indexes.xIndex][indexes.yIndex].Eat(
          board,
          b_check_ARR,
          w_check_ARR,
          'black',
          'forward',
          'right'
        );

        eats = true;
      } else if (
        toXIndex === indexes.xIndex - 2 &&
        toYIndex === indexes.yIndex - 2
      ) {
        eats = true;
        b_check_ARR[indexes.xIndex][indexes.yIndex].Eat(
          board,
          b_check_ARR,
          w_check_ARR,
          'black',
          'back',
          'right'
        );
      } else if (
        toXIndex === indexes.xIndex - 2 &&
        toYIndex === indexes.yIndex + 2
      ) {
        b_check_ARR[indexes.xIndex][indexes.yIndex].Eat(
          board,
          b_check_ARR,
          w_check_ARR,
          'black',
          'back',
          'left'
        );
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
            board,
            b_check_ARR,
            w_check_ARR,
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
            ableQueen(board[toXIndex][toYIndex], 'black');
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
            board,
            b_check_ARR,
            w_check_ARR,
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
            ableQueen(board[toXIndex][toYIndex], 'white');
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
    offeredTie.white = false;
    offeredTie.black = false;
    document.querySelector('.black__current').classList.add('hidden');
    document.querySelector('.white__current').classList.add('hidden');
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
        toXIndex > indexes.xIndex
          ? (direction = 'backward')
          : (direction = 'forward');
        toYIndex > indexes.yIndex
          ? (leftOrRight = 'right')
          : (leftOrRight = 'left');
        let eatenX, eatenY;
        direction = 'forward'
          ? (eatenX = toXIndex + 1)
          : (eatenX = toYIndex - 1);
        leftOrRight = 'left'
          ? (eatenY = toYIndex + 1)
          : (eatenY = toYIndex - 1);
        if (eatenX <= 7 && eatenX >= 0 && eatenY <= 7 && eatenY >= 0) {
          if (board[eatenX][eatenY].hasWhiteCheck) eating = true;
        }
        b_check_ARR[indexes.xIndex][indexes.yIndex].moveBlackQueen(
          board,
          b_check_ARR,
          w_check_ARR,
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
          ableQueen(board[toXIndex][toYIndex], 'black');
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
        // if the checker is not a queen
      } else {
        let leftOrRight;
        toYIndex === indexes.yIndex + 1 ? (leftOrRight = 'left') : '';
        toYIndex === indexes.yIndex - 1 ? (leftOrRight = 'right') : '';
        if (leftOrRight == 'left' || leftOrRight == 'right')
          b_check_ARR[indexes.xIndex][indexes.yIndex].Move(
            board,
            b_check_ARR,
            w_check_ARR,
            leftOrRight,
            'black'
          );
        let direction = 'forward';
        let side;
        toYIndex === indexes.yIndex + 2 ? (side = 'left') : '';
        toYIndex === indexes.yIndex - 2 ? (side = 'right') : '';
        if (side == 'left' || side == 'right') {
          b_check_ARR[indexes.xIndex][indexes.yIndex].Eat(
            board,
            b_check_ARR,
            w_check_ARR,
            'black',
            direction,
            side
          );
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
  ableMove.white = false;
  if (turn.white == true && selected.white == false) {
    for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
        if (w_check_ARR[i][j] !== undefined) {
          if (whiteAbleEatLeft(board[i][j]) || whiteAbleEatRight(board[i][j])) {
            ableEating.white = true;
          }
          if (
            whiteAbleLeft(board[i][j]) ||
            whiteAbleRight(board[i][j]) ||
            whiteAbleEatLeft(board[i][j]) ||
            whiteAbleEatRight(board[i][j])
          ) {
            ableMove.white = true;
          }

          if (w_check_ARR[i][j])
            if (w_check_ARR[i][j].isKing) {
              ableQueen(board[i][j], 'white');
            }
          if (w_check_ARR[i][j])
            if (w_check_ARR[i][j].isKing)
              if (ableQueen(board[i][j], 'white').length !== 0) {
                ableMove.white = true;
              }
        }
      }
    }
    if (ableMove.white === false) {
      alert('black wins! good gob :)');
      secondInit.happend = true;
      boardIntialize(board);
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
        for (const i of ableQueen(
          board[indexes.xIndex][indexes.yIndex],
          'white'
        )) {
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
        if (
          ableQueen(board[indexes.xIndex][indexes.yIndex], 'white').length !== 0
        )
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
        w_check_ARR[indexes.xIndex][indexes.yIndex].Eat(
          board,
          b_check_ARR,
          w_check_ARR,
          'white',
          'back',
          'right'
        );
        eats = true;
      } else if (
        toXIndex === indexes.xIndex + 2 &&
        toYIndex === indexes.yIndex - 2
      ) {
        w_check_ARR[indexes.xIndex][indexes.yIndex].Eat(
          board,
          b_check_ARR,
          w_check_ARR,
          'white',
          'back',
          'left'
        );

        eats = true;
      } else if (
        toXIndex === indexes.xIndex - 2 &&
        toYIndex === indexes.yIndex - 2
      ) {
        eats = true;
        w_check_ARR[indexes.xIndex][indexes.yIndex].Eat(
          board,
          b_check_ARR,
          w_check_ARR,
          'white',
          'forward',
          'left'
        );
      } else if (
        toXIndex === indexes.xIndex - 2 &&
        toYIndex === indexes.yIndex + 2
      ) {
        w_check_ARR[indexes.xIndex][indexes.yIndex].Eat(
          board,
          b_check_ARR,
          w_check_ARR,
          'white',
          'forward',
          'right'
        );
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
    offeredTie.black = false;
    offeredTie.white = false;
    document.querySelector('.black__current').classList.add('hidden');
    document.querySelector('.white__current').classList.add('hidden');
    console.log('moving white');
    if (event.target.classList.contains('red__square')) {
      if (w_check_ARR[indexes.xIndex][indexes.yIndex].isKing) {
        let direction;
        let leftOrRight;
        let eating = false;
        toXIndex > indexes.xIndex
          ? (direction = 'backward')
          : (direction = 'forward');
        toYIndex > indexes.yIndex
          ? (leftOrRight = 'right')
          : (leftOrRight = 'left');
        let eatenX, eatenY;
        direction = 'forward'
          ? (eatenX = toXIndex + 1)
          : (eatenX = toYIndex - 1);
        leftOrRight = 'left'
          ? (eatenY = toYIndex + 1)
          : (eatenY = toYIndex - 1);
        if (eatenX <= 7 && eatenX >= 0 && eatenY <= 7 && eatenY >= 0) {
          if (board[eatenX][eatenY].hasWhiteCheck) eating = true;
        }
        w_check_ARR[indexes.xIndex][indexes.yIndex].moveWhiteQueen(
          board,
          b_check_ARR,
          w_check_ARR,
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
          ableQueen(board[toXIndex][toYIndex], 'white');
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
          w_check_ARR[indexes.xIndex][indexes.yIndex].Move(
            board,
            b_check_ARR,
            w_check_ARR,
            'right',
            'white'
          );
        } else if (toYIndex === indexes.yIndex - 1)
          w_check_ARR[indexes.xIndex][indexes.yIndex].Move(
            board,
            b_check_ARR,
            w_check_ARR,
            'left',
            'white'
          );
        else if (toYIndex === indexes.yIndex + 2) {
          w_check_ARR[indexes.xIndex][indexes.yIndex].Eat(
            board,
            b_check_ARR,
            w_check_ARR,
            'white',
            'forward',
            'right'
          );
          eats = true;
        } else if (toYIndex === indexes.yIndex - 2) {
          w_check_ARR[indexes.xIndex][indexes.yIndex].Eat(
            board,
            b_check_ARR,
            w_check_ARR,
            'white',
            'forward',
            'left'
          );
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

const firstInitiateFGame = btn[0].addEventListener('click', function (e) {
  alert('white wins! great job');
  secondInit.happend = true;
  boardIntialize(board);
});

const secondInitiateFGame = btn[1].addEventListener('click', function (e) {
  if (turn.black) {
    offeredTie.black = true;
    document.querySelector('.black__current').classList.remove('hidden');
  }
  if (offeredTie.white === true) {
    alert('wow! a tie, that was close');
    secondInit.happend = true;
    offeredTie.black = false;
    offeredTie.white = false;
    boardIntialize(board);
  }
});
const thirdInitiateFGame = btn[2].addEventListener('click', function (e) {
  alert('black wins! great job');
  secondInit.happend = true;

  boardIntialize(board);
});
const fourthInitiateFGame = btn[3].addEventListener('click', function (e) {
  if (turn.white) {
    offeredTie.white = true;
    document.querySelector('.white__current').classList.remove('hidden');
  }
  if (offeredTie.black === true) {
    alert('wow! a tie, that was close');
    secondInit.happend = true;
    offeredTie.black = false;
    offeredTie.white = false;
    boardIntialize(board);
  }
});
