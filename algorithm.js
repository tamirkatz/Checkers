('use strict');
/////////////////////////////////////////////////////////////////
//HTML declerations/////////////////////////////////////////////////////////////

let secondEating = [];
const moveLength = 80;
const moveDeviation = 6;
const squareARR = Array.from(document.querySelectorAll('.square'));
const table = document.querySelector('.board');
const whiteCheckClass = Array.from(
  document.querySelectorAll('.white__checker')
);
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
//checker class
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
    const x = this.coordX * moveLength + moveDeviation;
    const y = this.coordY * moveLength + moveDeviation;
    this.id.style.top = `${x}px`;
    this.id.style.left = `${y}px`;
  }
  checkIsKing() {
    if (this.color === 'black' && this.coordX == 7) {
      countKings.black++;
      return true;
    }
    if (this.color === 'white' && this.coordX == 0) {
      countKings.white++;
      return true;
    } else return false;
  }
  blackMoveLeft(board, b_check_ARR, w_check_ARR) {
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
    b_check_ARR[prevX][prevY] = undefined;
    if (demo.isDemo === false) {
      this.id.style.top = `${x}px`;
      this.id.style.left = `${y}px`;
    }

    if (!this.isKing) {
      if (this.checkIsKing()) {
        this.isKing = true;
        if (demo.isDemo === false) {
          this.id.style.border = '4px solid Red';
        }
      }
    }
    demo.isDemo = false;
  }

  blackMoveRight(board, b_check_ARR, w_check_ARR) {
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
    b_check_ARR[prevX][prevY] = undefined;
    if (demo.isDemo === false) {
      this.id.style.top = `${x}px`;
      this.id.style.left = `${y}px`;
    }

    if (!this.isKing) {
      if (this.checkIsKing()) {
        this.isKing = true;
        if (demo.isDemo === false) {
          this.id.style.border = '4px solid Red';
        }
      }
    }
    demo.isDemo = false;
  }
  whiteMoveLeft(board, b_check_ARR, w_check_ARR) {
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
    w_check_ARR[prevX][prevY] = undefined;
    if (demo.isDemo === false) {
      this.id.style.top = `${x}px`;
      this.id.style.left = `${y}px`;
    }

    if (!this.isKing) {
      if (this.checkIsKing()) {
        this.isKing = true;
        if (demo.isDemo === false) {
          this.id.style.border = '4px solid Red';
        }
      }
    }
    demo.isDemo = false;
  }
  whiteMoveRight(board, b_check_ARR, w_check_ARR) {
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
    w_check_ARR[prevX][prevY] = undefined;
    if (demo.isDemo === false) {
      this.id.style.top = `${x}px`;
      this.id.style.left = `${y}px`;
    }

    if (!this.isKing) {
      if (this.checkIsKing()) {
        this.isKing = true;
        if (demo.isDemo === false) {
          this.id.style.border = '4px solid Red';
        }
      }
    }
    demo.isDemo = false;
  }
  blackEatLeft(board, b_check_ARR, w_check_ARR) {
    countCheckers.white--;
    if (demo.isDemo === false) {
      document.getElementById('score--1').textContent =
        Number(document.getElementById('score--1').textContent) - 1;
      w_check_ARR[this.coordX + 1][this.coordY + 1].id.style.display = 'none';
    }
    //the white he he eats disappears
    w_check_ARR[this.coordX + 1][this.coordY + 1] = undefined; // erases the white he eats from checkers array
    board[this.coordX + 1][this.coordY + 1].hasWhiteCheck = false; //the white was eaten is no more on the board
    const prevX = this.coordX;
    const prevY = this.coordY;
    b_check_ARR[this.coordX + 2][this.coordY + 2] =
      b_check_ARR[this.coordX][this.coordY]; //changes the position of the black checker in the checkers array
    board[this.coordX][this.coordY].hasBlackCheck = false; //no more black checker in the position he was in
    const x = (this.coordX + 2) * moveLength + moveDeviation; //calculating the checkers right location
    const y = (this.coordY + 2) * moveLength + moveDeviation; //calculating the checkers right location
    this.coordX += 2; //changes the coords
    this.coordY += 2; //changes the coords
    board[this.coordX][this.coordY].hasBlackCheck = true; //there is a black checker in the new location
    if (demo.isDemo === false) {
      this.id.style.top = `${x}px`; //the checker appears in the right location
      this.id.style.left = `${y}px`; //the checker appears in the right location
    }
    b_check_ARR[prevX][prevY] = undefined; //erases the black checker from its last position in the array
    finishGame(board);
    if (!this.isKing) {
      if (this.checkIsKing()) {
        this.isKing = true;
        if (demo.isDemo === false) this.id.style.border = '4px solid Red';
      }
    }
    demo.isDemo = false;
  }
  blackEatRight(board, b_check_ARR, w_check_ARR) {
    countCheckers.white--;
    if (demo.isDemo === false) {
      document.getElementById('score--1').textContent =
        Number(document.getElementById('score--1').textContent) - 1;
      w_check_ARR[this.coordX + 1][this.coordY - 1].id.style.display = 'none';
    }
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
    if (demo.isDemo === false) {
      this.id.style.top = `${x}px`;
      this.id.style.left = `${y}px`;
    }
    b_check_ARR[prevX][prevY] = undefined;
    finishGame(board);
    if (!this.isKing) {
      if (this.checkIsKing()) {
        this.isKing = true;
        if (demo.isDemo === false) this.id.style.border = '4px solid Red';
      }
    }
    demo.isDemo = false;
  }
  blackEatLeftBack(board, b_check_ARR, w_check_ARR) {
    countCheckers.white--;
    if (demo.isDemo === false) {
      document.getElementById('score--1').textContent =
        Number(document.getElementById('score--1').textContent) - 1;
      w_check_ARR[this.coordX - 1][this.coordY + 1].id.style.display = 'none';
    } //the white he he eats disappears
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
    if (demo.isDemo === false) {
      this.id.style.top = `${x}px`; //the checker appears in the right location
      this.id.style.left = `${y}px`; //the checker appears in the right location
    }
    b_check_ARR[prevX][prevY] = undefined; //erases the black checker from its last position in the array
    finishGame(board);
    if (!this.isKing) {
      if (this.checkIsKing()) {
        this.isKing = true;
        if (demo.isDemo === false) this.id.style.border = '4px solid Red';
      }
    }
    demo.isDemo = false;
  }
  blackEatRightBack(board, b_check_ARR, w_check_ARR) {
    countCheckers.white--;
    if (demo.isDemo === false) {
      document.getElementById('score--1').textContent =
        Number(document.getElementById('score--1').textContent) - 1;
      w_check_ARR[this.coordX - 1][this.coordY - 1].id.style.display = 'none';
    }
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
    if (demo.isDemo === false) {
      this.id.style.top = `${x}px`;
      this.id.style.left = `${y}px`;
    }
    b_check_ARR[prevX][prevY] = undefined;
    finishGame(board);
    if (!this.isKing) {
      if (this.checkIsKing()) {
        this.isKing = true;
        if (demo.isDemo === false) this.id.style.border = '4px solid Red';
      }
    }
    demo.isDemo = false;
  }
  whiteEatLeft(board, b_check_ARR, w_check_ARR) {
    countCheckers.black--;
    if (demo.isDemo === false) {
      document.getElementById('score--0').textContent =
        Number(document.getElementById('score--0').textContent) - 1;
      b_check_ARR[this.coordX - 1][this.coordY - 1].id.style.display = 'none';
    }
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
    if (demo.isDemo === false) {
      this.id.style.top = `${x}px`;
      this.id.style.left = `${y}px`;
    }
    w_check_ARR[prevX][prevY] = undefined;
    finishGame(board);
    if (!this.isKing) {
      if (this.checkIsKing()) {
        this.isKing = true;
        if (demo.isDemo === false) this.id.style.border = '4px solid Red';
      }
    }
    demo.isDemo === false;
  }
  whiteEatRight(board, b_check_ARR, w_check_ARR) {
    countCheckers.black--;
    if (demo.isDemo === false) {
      document.getElementById('score--0').textContent =
        Number(document.getElementById('score--0').textContent) - 1;
      b_check_ARR[this.coordX - 1][this.coordY + 1].id.style.display = 'none';
    }

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
    if (demo.isDemo === false) {
      this.id.style.top = `${x}px`;
      this.id.style.left = `${y}px`;
    }
    w_check_ARR[prevX][prevY] = undefined;
    finishGame(board);
    if (!this.isKing) {
      if (this.checkIsKing()) {
        this.isKing = true;
        if (demo.isDemo === false) this.id.style.border = '4px solid Red';
      }
    }
    demo.isDemo === false;
  }
  whiteEatLeftBack(board, b_check_ARR, w_check_ARR) {
    countCheckers.black--;
    if (demo.isDemo === false) {
      document.getElementById('score--0').textContent =
        Number(document.getElementById('score--0').textContent) - 1;
      b_check_ARR[this.coordX + 1][this.coordY - 1].id.style.display = 'none';
    }
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
    if (demo.isDemo === false) {
      this.id.style.top = `${x}px`;
      this.id.style.left = `${y}px`;
    }
    finishGame(board);
    w_check_ARR[prevX][prevY] = undefined;
    if (!this.isKing) {
      if (this.checkIsKing()) {
        this.isKing = true;
        if (demo.isDemo === false) this.id.style.border = '4px solid Red';
      }
    }
    demo.isDemo = false;
  }
  whiteEatRightBack(board, b_check_ARR, w_check_ARR) {
    countCheckers.black--;

    if (demo.isDemo === false) {
      document.getElementById('score--0').textContent =
        Number(document.getElementById('score--0').textContent) - 1;
      b_check_ARR[this.coordX + 1][this.coordY + 1].id.style.display = 'none';
    }
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
    if (demo.isDemo === false) {
      this.id.style.top = `${x}px`;
      this.id.style.left = `${y}px`;
    }
    w_check_ARR[prevX][prevY] = undefined;
    finishGame(board);
    if (!this.isKing) {
      if (this.checkIsKing()) {
        this.isKing = true;
        if (demo.isDemo === false) this.id.style.border = '4px solid Red';
      }
    }
    demo.isDemo = false;
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
        document.getElementById('score--1').textContent =
          Number(document.getElementById('score--1').textContent) - 1;
        countCheckers.white--;
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
        document.getElementById('score--1').textContent =
          Number(document.getElementById('score--1').textContent) - 1;
        countCheckers.white--;
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
        document.getElementById('score--1').textContent =
          Number(document.getElementById('score--1').textContent) - 1;
        countCheckers.white--;
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
        document.getElementById('score--0').textContent =
          Number(document.getElementById('score--0').textContent) - 1;
        countCheckers.black--;
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
        document.getElementById('score--0').textContent =
          Number(document.getElementById('score--0').textContent) - 1;
        countCheckers.black--;
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
        document.getElementById('score--0').textContent =
          Number(document.getElementById('score--0').textContent) - 1;
        countCheckers.black--;
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
          if (board[x - 2][y + 2].hasWhiteCheck) {
            y = 8;
            x = 8;
          } else if (board[x - 2][y + 2].hasBlackCheck) {
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

function bMarkSecondEating(bChecker) {
  bMarkSecondSquares(board[bChecker.coordX][bChecker.coordY]);
  selected.black = true;
  second.black = true;
}
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
              movingBlack();
            }
          } else {
            turn.black = false;
            turn.white = true;
            second.whiteQeen = false;
            movingBlack();
          }
        }
      }
    }
  }
);
//////////////////////////////////////////////////////////////////////
/////////////////////////// moving black /////////////////////////////

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
              ableWhiteQueen(board[i][j]);
            }
          if (w_check_ARR[i][j])
            if (w_check_ARR[i][j].isKing)
              if (ableWhiteQueen(board[i][j]).length !== 0) {
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
        w_check_ARR[indexes.xIndex][indexes.yIndex].whiteEatRightBack(
          board,
          b_check_ARR,
          w_check_ARR
        );
        eats = true;
      } else if (
        toXIndex === indexes.xIndex + 2 &&
        toYIndex === indexes.yIndex - 2
      ) {
        w_check_ARR[indexes.xIndex][indexes.yIndex].whiteEatLeftBack(
          board,
          b_check_ARR,
          w_check_ARR
        );

        eats = true;
      } else if (
        toXIndex === indexes.xIndex - 2 &&
        toYIndex === indexes.yIndex - 2
      ) {
        eats = true;
        w_check_ARR[indexes.xIndex][indexes.yIndex].whiteEatLeft(
          board,
          b_check_ARR,
          w_check_ARR
        );
      } else if (
        toXIndex === indexes.xIndex - 2 &&
        toYIndex === indexes.yIndex + 2
      ) {
        w_check_ARR[indexes.xIndex][indexes.yIndex].whiteEatRight(
          board,
          b_check_ARR,
          w_check_ARR
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
        movingBlack();
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
            movingBlack();
          }
        } else {
          turn.white = false;
          turn.black = true;
          movingBlack();
        }
      } else {
        if (toYIndex === indexes.yIndex + 1) {
          w_check_ARR[indexes.xIndex][indexes.yIndex].whiteMoveRight(
            board,
            b_check_ARR,
            w_check_ARR
          );
        } else if (toYIndex === indexes.yIndex - 1)
          w_check_ARR[indexes.xIndex][indexes.yIndex].whiteMoveLeft(
            board,
            b_check_ARR,
            w_check_ARR
          );
        else if (toYIndex === indexes.yIndex + 2) {
          w_check_ARR[indexes.xIndex][indexes.yIndex].whiteEatRight(
            board,
            b_check_ARR,
            w_check_ARR
          );
          eats = true;
        } else if (toYIndex === indexes.yIndex - 2) {
          w_check_ARR[indexes.xIndex][indexes.yIndex].whiteEatLeft(
            board,
            b_check_ARR,
            w_check_ARR
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

          movingBlack();
        }
      }
    }
  }
});
function movingBlack() {
  let eating = false;
  let bestM = OptionalMoves(board, 'black', b_check_ARR, w_check_ARR);
  let toAll = bestM.whereTo;
  let row = bestM.x;
  let col = bestM.y;
  let count = 600;

  for (let i = 0; i < toAll.length; i += 3) {
    let to = toAll.slice(i, i + 3);
    const timeout = setTimeout(BML, count);
    const sec = setTimeout(BEL, count);
    const third = setTimeout(BLB, count);
    const fourth = setTimeout(BMR, count);
    const fifth = setTimeout(BER, count);
    const sixth = setTimeout(BRB, count);
    count += 600;
    console.log(count);
    function BML() {
      if (to == 'BML') {
        b_check_ARR[row][col].blackMoveLeft(board, b_check_ARR, w_check_ARR);
        row += 1;
        col += 1;
      }
    }
    function BMR() {
      if (to == 'BMR') {
        b_check_ARR[row][col].blackMoveRight(board, b_check_ARR, w_check_ARR);
        row += 1;
        col -= 1;
      }
    }
    function BEL() {
      if (to == 'BEL') {
        b_check_ARR[row][col].blackEatLeft(board, b_check_ARR, w_check_ARR);
        eating = true;
        row += 2;
        col += 2;
      }
    }
    function BER() {
      if (to == 'BER') {
        b_check_ARR[row][col].blackEatRight(board, b_check_ARR, w_check_ARR);
        eating = true;
        row += 2;
        col -= 2;
      }
    }
    function BLB() {
      if (to == 'BLB') {
        b_check_ARR[row][col].blackEatLeftBack(board, b_check_ARR, w_check_ARR);
        eating = true;
        row -= 2;
        col += 2;
      }
    }
    function BRB() {
      if (to == 'BRB') {
        b_check_ARR[row][col].blackEatRightBack(
          board,
          b_check_ARR,
          w_check_ARR
        );
        eating = true;
        row -= 2;
        col -= 2;
      }
    }
  }
  turn.black = false;
  turn.white = true;
}
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// Algorithm /////////////////////////////////////////

class node {
  constructor(val) {
    this.val = val;
    this.Son1 = null;
    this.Son2 = null;
    this.Son3 = null;
    this.Son4 = null;
    this.Son5 = null;
    this.Son6 = null;
    this.Son7 = null;
    this.Son8 = null;
    this.son9 = null;
    this.son10 = null;
  }
}

function miniMax(board, b_check_ARR, w_check_ARR) {}

function OptionalMoves(board, pieceColor, b_check_ARR, w_check_ARR) {
  let bestMove = {
    whereTo: undefined,
    rank: -Infinity,
    x: undefined,
    y: undefined,
    isKing: false,
    toX: undefined,
    toY: undefined,
    direction: undefined,
    leftOrRight: undefined,
    eating: undefined,
  };
  let checkArrB = new Array(8);
  for (let i = 0; i <= 7; i++) {
    checkArrB[i] = new Array(8);
  }
  let checkArrW = new Array(8);
  for (let i = 0; i <= 7; i++) {
    checkArrW[i] = new Array(8);
  }
  let tempBoard = new Array(8);
  for (let i = 0; i <= 7; i++) {
    tempBoard[i] = new Array(8);
  }

  for (const piece of getAllPieces(pieceColor)) {
    let validMoves;
    if (piece.isKing == false) {
      validMoves = getValidMoves(
        piece,
        board,
        piece.coordX,
        piece.coordY,
        '',
        false
      );
    } else {
      validMoves = queenValidMoves(piece, board, piece.coordX, piece.coordY, [
        piece.coordX,
        piece.coordY,
      ]);
    }
    for (const i of validMoves) {
      for (let i = 0; i <= 7; i++) {
        for (let j = 0; j <= 7; j++) {
          let tempValues = bHardCopy(board[i][j]);
          tempBoard[i][j] = new squareCL(
            tempValues[0],
            tempValues[1],
            tempValues[2],
            tempValues[3],
            tempValues[4],
            tempValues[5]
          );
          if (b_check_ARR[i][j]) {
            let valuesB = hardCopy(b_check_ARR[i][j]);
            checkArrB[i][j] = new checkerCL(
              valuesB[0],
              valuesB[1],
              valuesB[2],
              valuesB[3],
              valuesB[4]
            );
          }
          if (w_check_ARR[i][j]) {
            let valuesW = hardCopy(w_check_ARR[i][j]);
            checkArrW[i][j] = new checkerCL(
              valuesW[0],
              valuesW[1],
              valuesW[2],
              valuesW[3],
              valuesW[4]
            );
          }
        }
      }

      let toAll = i.whereTo;
      let row = piece.coordX;
      let col = piece.coordY;
      if (!piece.isKing) {
        for (let x = 0; x < toAll.length; x += 3) {
          let to = toAll.slice(x, x + 3);
          if (to === 'BMR') {
            demo.isDemo = true;
            checkArrB[row][col].blackMoveRight(tempBoard, checkArrB, checkArrW);
            row += 1;
            col -= 1;
          }
          if (to === 'BML') {
            demo.isDemo = true;
            checkArrB[row][col].blackMoveLeft(tempBoard, checkArrB, checkArrW);
            row += 1;
            col += 1;
          }
          if (to === 'BER') {
            demo.isDemo = true;
            checkArrB[row][col].blackEatRight(tempBoard, checkArrB, checkArrW);
            row += 2;
            col -= 2;
          }
          if (to === 'BEL') {
            demo.isDemo = true;
            checkArrB[row][col].blackEatLeft(tempBoard, checkArrB, checkArrW);
            row += 2;
            col += 2;
          }
          if (to === 'BLB') {
            demo.isDemo = true;
            checkArrB[row][col].blackEatLeftBack(
              tempBoard,
              checkArrB,
              checkArrW
            );
            row -= 2;
            col += 2;
          }
          if (to === 'BRB') {
            demo.isDemo = true;
            checkArrB[row][col].blackEatRightBack(
              tempBoard,
              checkArrB,
              checkArrW
            );
            row -= 2;
            col -= 2;
          }
          if (to === 'WMR') {
            demo.isDemo = true;
            checkArrW[row][col].whiteMoveRight(tempBoard, checkArrB, checkArrW);
          }
          if (to === 'WML') {
            demo.isDemo = true;
            checkArrW[row][col].whiteMoveLeft(tempBoard, checkArrB, checkArrW);
          }
          if (to === 'WER') {
            demo.isDemo = true;
            checkArrW[piece.coordX][piece.coordY].whiteEatRight(
              tempBoard,
              checkArrB,
              checkArrW
            );
          }
          if (to === 'WEL') {
            demo.isDemo = true;
            checkArrW[piece.coordX][piece.coordY].whiteEatLeft(
              tempBoard,
              checkArrB,
              checkArrW
            );
          }
        }
      }
      if (piece.isKing) {
        console.log(i.allTheWay);
        demo.isDemo = true;
        console.log(
          i.allTheWay[0],
          i.allTheWay[1],
          i.allTheWay[2],
          i.allTheWay[3],
          i.direction,
          i.leftOrRight,
          i.eat
        );
        console.log(i.eat);
        checkArrB[piece.coordX][piece.coordY].moveBlackQueen(
          tempBoard,
          checkArrB,
          checkArrW,
          i.allTheWay[0],
          i.allTheWay[1],
          i.allTheWay[2],
          i.allTheWay[3],
          i.direction,
          i.leftOrRight,
          i.eat
        );
      }
      console.log(evaluate(tempBoard, checkArrB, checkArrW));
      if (evaluate(tempBoard, checkArrB, checkArrW) > bestMove.rank) {
        if (piece.isKing == false) {
          bestMove.whereTo = i.whereTo;
          bestMove.rank = evaluate(tempBoard, checkArrB, checkArrW);
          bestMove.x = piece.coordX;
          bestMove.y = piece.coordY;
          bestMove.isKing = false;
        }
        if (piece.isKing) {
          bestMove.toX = i.allTheWay[2];
          bestMove.toY = i.allTheWay[3];
          bestMove.direction = i.direction;
          bestMove.leftOrRight = i.leftOrRight;
          bestMove.eating = i.eat;
          bestMove.rank = 50;
          bestMove.x = piece.coordX;
          bestMove.y = piece.coordY;
          bestMove.isKing = true;
        }
      }
    }
  }
  return bestMove;
}

function getValidMoves(piece, board, x, y, direction, isSecond) {
  let vMoves = [];
  let dir = '';
  if (direction) {
    dir = direction.slice(-3);
  }
  let seccondDirection = '';
  class move {
    constructor(piece, whereTo) {
      this.piece = piece;
      this.whereTo = whereTo;
    }
  }
  if (!piece.isKing) {
    if (piece.color == 'black') {
      //// first call
      if (isSecond == false) {
        if (BlackAbleEating(board[x][y]).length == 0) {
          if (blackAbleRight(board[piece.coordX][piece.coordY])) {
            vMoves.push(new move(piece, 'BMR'));
          }
          if (blackAbleLeft(board[piece.coordX][piece.coordY])) {
            vMoves.push(new move(piece, 'BML'));
          }
        }
        if (blackAbleEatRight(board[piece.coordX][piece.coordY])) {
          let vals = getValidMoves(
            piece,
            board,
            piece.coordX,
            piece.coordY,
            'BER',
            true
          );
          for (const move of vals) {
            vMoves.push(move);
          }
        }
        if (blackAbleEatLeft(board[piece.coordX][piece.coordY])) {
          let vals = getValidMoves(
            piece,
            board,
            piece.coordX,
            piece.coordY,
            'BEL',
            true
          );
          for (const move of vals) {
            vMoves.push(move);
          }
        }
      }
      ///// second call
      if (isSecond == true) {
        if (dir == 'BER') {
          let xIndex = x + 2;
          let yIndex = y - 2;
          if (!bAbleSecondEating(board[xIndex][yIndex])) {
            vMoves.push(new move(piece, `${direction}${seccondDirection}`));
          } else {
            if (blackAbleEatLeftBack(board[xIndex][yIndex])) {
              vMoves.push(new move(piece, `${direction}${seccondDirection}`));
            }
            if (blackAbleEatLeft(board[xIndex][yIndex])) {
              seccondDirection += 'BEL';
              let vals = getValidMoves(
                piece,
                board,
                xIndex,
                yIndex,
                `${direction}${seccondDirection}`,
                true
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }
            if (blackAbleEatRight(board[xIndex][yIndex])) {
              seccondDirection += 'BER';
              let vals = getValidMoves(
                piece,
                board,
                xIndex,
                yIndex,
                `${direction}${seccondDirection}`,
                true
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }

            if (blackAbleEatRightBack(board[xIndex][yIndex])) {
              seccondDirection += 'BRB';
              let vals = getValidMoves(
                piece,
                board,

                xIndex,
                yIndex,
                `${direction}${seccondDirection}`,
                true
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }
          }
        }
        if (dir == 'BEL') {
          let xIndex = x + 2;
          let yIndex = y + 2;
          if (!bAbleSecondEating(board[xIndex][yIndex])) {
            vMoves.push(new move(piece, `${direction}${seccondDirection}`));
          } else {
            if (blackAbleEatRightBack(board[xIndex][yIndex])) {
              vMoves.push(new move(piece, `${direction}${seccondDirection}`));
            }
            if (blackAbleEatLeft(board[xIndex][yIndex])) {
              seccondDirection += 'BEL';
              let vals = getValidMoves(
                piece,
                board,

                xIndex,
                yIndex,
                `${direction}${seccondDirection}`,
                true
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }
            if (blackAbleEatRight(board[xIndex][yIndex])) {
              seccondDirection += 'BER';
              let vals = getValidMoves(
                piece,
                board,
                xIndex,
                yIndex,
                `${direction}${seccondDirection}`,
                true
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }

            if (blackAbleEatLeftBack(board[xIndex][yIndex])) {
              seccondDirection += 'BLB';
              let vals = getValidMoves(
                piece,
                board,

                xIndex,
                yIndex,
                `${direction}${seccondDirection}`,
                true
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }
          }
        }
        if (dir == 'BLB') {
          let xIndex = x - 2;
          let yIndex = y + 2;
          if (!bAbleSecondEating(board[xIndex][yIndex])) {
            vMoves.push(new move(piece, `${direction}${seccondDirection}`));
          } else {
            if (blackAbleEatRight(board[xIndex][yIndex])) {
              vMoves.push(new move(piece, `${direction}${seccondDirection}`));
            }
            if (blackAbleEatLeft(board[xIndex][yIndex])) {
              seccondDirection += 'BEL';
              let vals = getValidMoves(
                piece,
                board,
                xIndex,
                yIndex,
                `${direction}${seccondDirection}`,
                true
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }
            if (blackAbleEatLeftBack(board[xIndex][yIndex])) {
              seccondDirection += 'BLB';
              let vals = getValidMoves(
                piece,
                board,
                xIndex,
                yIndex,
                `${direction}${seccondDirection}`,
                true
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }

            if (blackAbleEatRightBack(board[xIndex][yIndex])) {
              seccondDirection += 'BRB';
              let vals = getValidMoves(
                piece,
                board,
                xIndex,
                yIndex,
                `${direction}${seccondDirection}`,
                true
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }
          }
        }
        if (dir == 'BRB') {
          let xIndex = x - 2;
          let yIndex = y - 2;
          if (!bAbleSecondEating(board[xIndex][yIndex])) {
            vMoves.push(new move(piece, `${direction}${seccondDirection}`));
          } else {
            if (blackAbleEatLeft(board[xIndex][yIndex])) {
              vMoves.push(new move(piece, `${direction}${seccondDirection}`));
            }
            if (blackAbleEatLeftBack(board[xIndex][yIndex])) {
              seccondDirection += 'BLB';
              let vals = getValidMoves(
                piece,
                board,
                xIndex,
                yIndex,
                `${direction}${seccondDirection}`,
                true
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }
            if (blackAbleEatRight(board[xIndex][yIndex])) {
              seccondDirection += 'BER';
              let vals = getValidMoves(
                piece,
                board,
                xIndex,
                yIndex,
                `${direction}${seccondDirection}`,
                true
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }

            if (blackAbleEatRightBack(board[xIndex][yIndex])) {
              seccondDirection += 'BRB';
              let vals = getSValidMoves(
                piece,
                board,
                xIndex,
                yIndex,
                `${direction}${seccondDirection}`
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }
          }
        }
      }
    }

    if (piece.color == 'white') {
      //// first call
      if (isSecond == false) {
        if (whiteAbleEating(board[x][y]).length == 0) {
          if (whiteAbleRight(board[piece.coordX][piece.coordY])) {
            vMoves.push(new move(piece, 'WMR'));
          }
          if (whiteAbleLeft(board[piece.coordX][piece.coordY])) {
            vMoves.push(new move(piece, 'WML'));
          }
        }
        if (whiteAbleEatRight(board[piece.coordX][piece.coordY])) {
          let vals = getValidMoves(
            piece,
            board,
            piece.coordX,
            piece.coordY,
            'WER',
            true
          );
          for (const move of vals) {
            vMoves.push(move);
          }
        }
        if (whiteAbleEatLeft(board[piece.coordX][piece.coordY])) {
          let vals = getValidMoves(
            piece,
            board,
            piece.coordX,
            piece.coordY,
            'WEL',
            true
          );
          for (const move of vals) {
            vMoves.push(move);
          }
        }
      }
      ///// second call
      if (isSecond == true) {
        if (dir == 'WER') {
          let xIndex = x - 2;
          let yIndex = y - 2;
          if (!wAbleSecondEating(board[xIndex][yIndex])) {
            vMoves.push(new move(piece, `${direction}${seccondDirection}`));
          } else {
            if (whiteAbleEatLeftBack(board[xIndex][yIndex])) {
              vMoves.push(new move(piece, `${direction}${seccondDirection}`));
            }
            if (whiteAbleEatLeft(board[xIndex][yIndex])) {
              seccondDirection += 'WEL';
              let vals = getValidMoves(
                piece,
                board,
                xIndex,
                yIndex,
                `${direction}${seccondDirection}`,
                true
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }
            if (whiteAbleEatRight(board[xIndex][yIndex])) {
              seccondDirection += 'WER';
              let vals = getValidMoves(
                piece,
                board,
                xIndex,
                yIndex,
                `${direction}${seccondDirection}`,
                true
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }

            if (whiteAbleEatRightBack(board[xIndex][yIndex])) {
              seccondDirection += 'WRB';
              let vals = getValidMoves(
                piece,
                board,

                xIndex,
                yIndex,
                `${direction}${seccondDirection}`,
                true
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }
          }
        }
        if (dir == 'WEL') {
          let xIndex = x - 2;
          let yIndex = y + 2;
          if (!wAbleSecondEating(board[xIndex][yIndex])) {
            vMoves.push(new move(piece, `${direction}${seccondDirection}`));
          } else {
            if (whiteAbleEatRightBack(board[xIndex][yIndex])) {
              vMoves.push(new move(piece, `${direction}${seccondDirection}`));
            }
            if (whiteAbleEatLeft(board[xIndex][yIndex])) {
              seccondDirection += 'WEL';
              let vals = getValidMoves(
                piece,
                board,

                xIndex,
                yIndex,
                `${direction}${seccondDirection}`,
                true
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }
            if (whiteAbleEatRight(board[xIndex][yIndex])) {
              seccondDirection += 'WER';
              let vals = getValidMoves(
                piece,
                board,
                xIndex,
                yIndex,
                `${direction}${seccondDirection}`,
                true
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }

            if (whiteAbleEatLeftBack(board[xIndex][yIndex])) {
              seccondDirection += 'WLB';
              let vals = getValidMoves(
                piece,
                board,

                xIndex,
                yIndex,
                `${direction}${seccondDirection}`,
                true
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }
          }
        }
        if (dir == 'WLB') {
          let xIndex = x - 2;
          let yIndex = y + 2;
          if (!wAbleSecondEating(board[xIndex][yIndex])) {
            vMoves.push(new move(piece, `${direction}${seccondDirection}`));
          } else {
            if (whiteAbleEatRight(board[xIndex][yIndex])) {
              vMoves.push(new move(piece, `${direction}${seccondDirection}`));
            }
            if (whiteAbleEatLeft(board[xIndex][yIndex])) {
              seccondDirection += 'WEL';
              let vals = getValidMoves(
                piece,
                board,
                xIndex,
                yIndex,
                `${direction}${seccondDirection}`,
                true
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }
            if (whiteAbleEatLeftBack(board[xIndex][yIndex])) {
              seccondDirection += 'WLB';
              let vals = getValidMoves(
                piece,
                board,
                xIndex,
                yIndex,
                `${direction}${seccondDirection}`,
                true
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }

            if (whiteAbleEatRightBack(board[xIndex][yIndex])) {
              seccondDirection += 'WRB';
              let vals = getValidMoves(
                piece,
                board,
                xIndex,
                yIndex,
                `${direction}${seccondDirection}`,
                true
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }
          }
        }
        if (dir == 'WRB') {
          let xIndex = x - 2;
          let yIndex = y - 2;
          if (!wAbleSecondEating(board[xIndex][yIndex])) {
            vMoves.push(new move(piece, `${direction}${seccondDirection}`));
          } else {
            if (whiteAbleEatLeft(board[xIndex][yIndex])) {
              vMoves.push(new move(piece, `${direction}${seccondDirection}`));
            }
            if (whiteAbleEatLeftBack(board[xIndex][yIndex])) {
              seccondDirection += 'WLB';
              let vals = getValidMoves(
                piece,
                board,
                xIndex,
                yIndex,
                `${direction}${seccondDirection}`,
                true
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }
            if (whiteAbleEatRight(board[xIndex][yIndex])) {
              seccondDirection += 'WER';
              let vals = getValidMoves(
                piece,
                board,
                xIndex,
                yIndex,
                `${direction}${seccondDirection}`,
                true
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }

            if (whiteAbleEatRightBack(board[xIndex][yIndex])) {
              seccondDirection += 'WRB';
              let vals = getSValidMoves(
                piece,
                board,
                xIndex,
                yIndex,
                `${direction}${seccondDirection}`
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }
          }
        }
      }
    }
  }

  return vMoves;
}
function getQueenValidMoves(piece, board, x, y, allTheWay) {
  //moveBlackQueen(board, b_check_ARR,w_check_ARR,   xIndex,    yIndex,    toXIndex,    toYIndex,   direction, leftOrRight, eating) {
  let queenAbleEating = {
    isAble: false,
  };
  let vMoves = [];
  class move {
    constructor(piece, whereFrom, whereTo) {
      this.piece = piece;
      this.whereFrom = whereFrom;
      this.whereT = whereTo;
    }
  }
  if (piece.color == 'black') {
    for (const square of ableBlackQueen(board[x][y])) {
      if (square.eat) {
        queenAbleEating.isAble = true;
      }
    }
    if (!queenAbleEating.isAble) {
      vMoves.push(piece, board, x, y, allTheWay);
    }
  }
  if (piece.color == 'white') {
  }
  return vMoves;
}
function getAllPieces(pieceColor) {
  let pieces = [];
  for (let i = 0; i <= 7; i++)
    for (let j = 0; j <= 7; j++) {
      if (b_check_ARR[i][j])
        if (b_check_ARR[i][j].color === pieceColor) {
          pieces.push(b_check_ARR[i][j]);
        }
      if (w_check_ARR[i][j])
        if (w_check_ARR[i][j].color === pieceColor) {
          pieces.push(w_check_ARR[i][j]);
        }
    }
  return pieces;
}
function hardCopy(checker) {
  let values = [];
  let color = checker.color == 'black' ? 'black' : 'white';
  let id = JSON.parse(JSON.stringify(checker.id));
  let isKing = checker.isKing == true ? true : false;

  let coordX = checker.coordX;
  let coordY = checker.coordY;
  values.push(id);
  values.push(color);
  values.push(isKing);
  values.push(coordX);
  values.push(coordY);
  return values;
}
function bHardCopy(square) {
  let values = [];
  let id = square.id;
  let hasBlackCheck = square.hasBlackCheck;
  let hasWhiteCheck = square.hasWhiteCheck;
  let coordX = square.coordX;
  let coordY = square.coordY;
  let changed = square.changed;
  values.push(id);
  values.push(hasBlackCheck);
  values.push(hasWhiteCheck);
  values.push(coordX);
  values.push(coordY);
  values.push(changed);
  return values;
}
function evaluate(tmpBoard, blackCArr, whiteCArr) {
  let cntBCheckers = 0;
  let cntWCheckers = 0;
  let cntBKings = 0;
  let cntWKings = 0;
  for (let i = 0; i <= 7; i++)
    for (let j = 0; j <= 7; j++) {
      if (tmpBoard[i][j].hasBlackCheck) {
        if (blackCArr[i][j].isKing) {
          cntBKings++;
        } else {
          cntBCheckers++;
        }
      }
      if (tmpBoard[i][j].hasWhiteCheck) {
        if (whiteCArr[i][j].isKing) {
          cntWKings++;
        } else {
          cntWCheckers++;
        }
      }
    }
  return cntBCheckers + cntBKings * 2 - cntWCheckers - cntWKings * 2;
}

function queenValidMoves(piece, board, x, y, allTheWay) {
  class mov {
    constructor(piece, allTheWay) {
      this.piece = piece;
      this.allTheWay = allTheWay;
    }
  }
  allTheWay.push([x, y]);
  let vMoves;
  for (const move of ableBlackQueen(board[x][y])) {
    if (move.eat) {
      let vals = queenValidMoves(
        piece,
        board,
        move.toXIndex,
        move.toYIndex,
        allTheWay
      );
      for (const i of vals) {
        vMoves.push(i);
      }
    } else {
      vMoves.push(new mov(piece, allTheWay));
    }
  }
  return vMoves;
}
