blackMoveLeft(board, b_check_ARR) {
    //const prevX = this.coordX;
    //const prevY = this.coordY;
    //b_check_ARR[this.coordX + 1][this.coordY + 1] =
     // b_check_ARR[this.coordX][this.coordY];
    //board[this.coordX][this.coordY].hasBlackCheck = false;
    
    //this.coordX += 1;
    //this.coordY += 1;
    //board[this.coordX][this.coordY].hasBlackCheck = true;
    b_check_ARR[prevX][prevY] = undefined;
    if (demo.isDemo === false) {
      const x = (this.coordX + 1) * moveLength + moveDeviation;
      const y = (this.coordY + 1) * moveLength + moveDeviation;
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