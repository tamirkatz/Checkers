function getValidMoves(piece, board, x, y, direction, isSecond) {
  let vMoves = [];
  let dir = '';
  if (direction.length > 0) {
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
        if (BlackAbleEating(board[piece.coordX][piece.coordY]).length == 0) {
          if (blackAbleRight(board[piece.coordX][piece.coordY])) {
            vMoves.push(new move(piece, 'BMR'));
          }
          if (blackAbleLeft(board[piece.coordX][piece.coordY])) {
            vMoves.push(new move(piece, 'BML'));
          }
        }
        if (blackAbleEatRight(board[piece.coordX][piece.coordY])) {
          let vals = getValidMoves(piece, board, xIndex, yIndex, 'BER', true);
          vMoves.push(new move(vals[0], vals[1]));
        }
        if (blackAbleEatLeft(board[piece.coordX][piece.coordY])) {
          let vals = getValidMoves(piece, board, xIndex, yIndex, 'BEL', true);
          vMoves.push(new move(vals[0], vals[1]));
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
                board,
                piece,
                xIndex,
                yIndex,
                `${direction}${seccondDirection}`
              );
              for (const move in vals) {
                vMoves.push(move);
              }
            }
            if (blackAbleEatRight(board[xIndex][yIndex])) {
              seccondDirection += 'BER';
              let vals = getValidMoves(
                board,
                piece,
                xIndex,
                yIndex,
                `${direction}${seccondDirection}`
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }

            if (blackAbleEatRightBack(board[xIndex][yIndex])) {
              seccondDirection += 'BRB';
              let vals = getValidMoves(
                board,
                piece,
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
                board,
                piece,
                xIndex,
                yIndex,
                `${direction}${seccondDirection}`
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }
            if (blackAbleEatRight(board[xIndex][yIndex])) {
              seccondDirection += 'BER';
              let vals = getValidMoves(
                board,
                piece,
                xIndex,
                yIndex,
                `${direction}${seccondDirection}`
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }

            if (blackAbleEatLeftBack(board[xIndex][yIndex])) {
              seccondDirection += 'BLB';
              let vals = getValidMoves(
                board,
                piece,
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
                board,
                piece,
                xIndex,
                yIndex,
                `${direction}${seccondDirection}`
              );
              for (const move in vals) {
                vMoves.push(move);
              }
            }
            if (blackAbleEatLeftBack(board[xIndex][yIndex])) {
              seccondDirection += 'BLB';
              let vals = getValidMoves(
                board,
                piece,
                xIndex,
                yIndex,
                `${direction}${seccondDirection}`
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }

            if (blackAbleEatRightBack(board[xIndex][yIndex])) {
              seccondDirection += 'BRB';
              let vals = getValidMoves(
                board,
                piece,
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
                board,
                piece,
                xIndex,
                yIndex,
                `${direction}${seccondDirection}`
              );
              for (const move in vals) {
                vMoves.push(move);
              }
            }
            if (blackAbleEatRight(board[xIndex][yIndex])) {
              seccondDirection += 'BER';
              let vals = getValidMoves(
                board,
                piece,
                xIndex,
                yIndex,
                `${direction}${seccondDirection}`
              );
              for (const move of vals) {
                vMoves.push(move);
              }
            }

            if (blackAbleEatRightBack(board[xIndex][yIndex])) {
              seccondDirection += 'BRB';
              let vals = getSValidMoves(
                board,
                piece,
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
  if (piece.isKing) {
    if (piece.color === 'black') {
      vMoves = ableWhiteQueen(board[piece.coordX][piece.coordY]);
    }
    if (piece.color === 'white') {
      vMoves = ableWhiteQueen(board[piece.coordX][piece.coordY]);
    }
  }
  return vMoves;
}
