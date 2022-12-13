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
  blackMoveLeft(board, b_check_ARR) {
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

  blackMoveRight(board, b_check_ARR) {
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
  whiteMoveRight(board, w_check_ARR) {
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
    document.getElementById('score--1').textContent =
      Number(document.getElementById('score--1').textContent) - 1;
    countCheckers.white--;
    w_check_ARR[this.coordX + 1][this.coordY + 1].id.style.display = 'none'; //the white he he eats disappears
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
    document.getElementById('score--1').textContent =
      Number(document.getElementById('score--1').textContent) - 1;
    countCheckers.white--;
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
    document.getElementById('score--1').textContent =
      Number(document.getElementById('score--1').textContent) - 1;
    countCheckers.white--;
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
    document.getElementById('score--1').textContent =
      Number(document.getElementById('score--1').textContent) - 1;
    countCheckers.white--;
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
    document.getElementById('score--0').textContent =
      Number(document.getElementById('score--0').textContent) - 1;
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
    document.getElementById('score--0').textContent =
      Number(document.getElementById('score--0').textContent) - 1;
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
    document.getElementById('score--0').textContent =
      Number(document.getElementById('score--0').textContent) - 1;
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
    document.getElementById('score--0').textContent =
      Number(document.getElementById('score--0').textContent) - 1;
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
