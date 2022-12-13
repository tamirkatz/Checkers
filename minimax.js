function minimax(board, depth = 2) {}

function OptionalMoves(board, pieceColor) {
  let bestMove = {
    whereTo: undefined,
    rank: -Infinity,
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
    let validMoves = getValidMoves(piece, board);
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
      if (i.whereTo === 'blackMoveRight') {
        demo.isDemo = true;
        checkArrB[piece.coordX][piece.coordY].Move(
          tempBoard,
          checkArrB,
          checkArrW,
          'right',
          'black'
        );
      }
      if (i.whereTo === 'blackMoveLeft') {
        demo.isDemo = true;
        checkArrB[piece.coordX][piece.coordY].Move(
          tempBoard,
          checkArrB,
          checkArrW,
          'left',
          'black'
        );
      }
      if (i.whereTo === 'blackEatRight') {
        demo.isDemo = true;
        checkArrB[piece.coordX][piece.coordY].blackEatRight(
          tempBoard,
          checkArrB,
          checkArrW
        );
      }
      if (i.whereTo === 'blackEatLeft') {
        demo.isDemo = true;
        checkArrB[piece.coordX][piece.coordY].blackEatLeft(
          tempBoard,
          checkArrB,
          checkArrW
        );
      }
      if (i.whereTo === 'whiteMoveRight') {
        demo.isDemo = true;
        checkArrW[piece.coordX][piece.coordY].Move(
          tempBoard,
          checkArrB,
          checkArrW,
          'right',
          'white'
        );
      }
      if (i.whereTo === 'whiteMoveLeft') {
        demo.isDemo = true;
        checkArrW[piece.coordX][piece.coordY].Move(
          tempBoard,
          checkArrB,
          checkArrW,
          'left',
          'white'
        );
      }
      if (i.whereTo === 'whiteEatRight') {
        demo.isDemo = true;
        checkArrW[piece.coordX][piece.coordY].whiteEatRight(
          tempBoard,
          checkArrB,
          checkArrW
        );
      }
      if (i.whereTo === 'whiteEatLeft') {
        demo.isDemo = true;
        checkArrW[piece.coordX][piece.coordY].whiteEatLeft(
          tempBoard,
          checkArrB,
          checkArrW
        );
      }

      if (evaluate(tempBoard, checkArrB, checkArrW) > bestMove.rank) {
        bestMove.whereTo = i.whereTo;
        bestMove.rank = evaluate(tempBoard, checkArrB, checkArrW);
      }
    }
  }
  return bestMove;
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
function getValidMoves(piece, board) {
  let vMoves = [];
  class move {
    constructor(piece, whereTo) {
      this.piece = piece;
      this.whereTo = whereTo;
    }
  }
  if (!piece.isKing) {
    if (piece.color == 'black') {
      if (BlackAbleEating(board[piece.coordX][piece.coordY]).length == 0) {
        if (blackAbleRight(board[piece.coordX][piece.coordY])) {
          vMoves.push(new move(piece, 'blackMoveRight'));
        }
        if (blackAbleLeft(board[piece.coordX][piece.coordY])) {
          vMoves.push(new move(piece, 'blackMoveLeft'));
        }
      }
      if (blackAbleEatRight(board[piece.coordX][piece.coordY])) {
        vMoves.push(new move(piece, 'blackEatRight'));
      }
      if (blackAbleEatLeft(board[piece.coordX][piece.coordY])) {
        vMoves.push(new move(piece, 'blackEatLeft'));
      }
    }
    if (piece.color == 'white') {
      if (whiteAbleEating(board[piece.coordX][piece.coordY]).length == 0) {
        if (whiteAbleRight(board[piece.coordX][piece.coordY])) {
          vMoves.push(new move(piece, 'whiteMoveRight'));
        }
        if (whiteAbleLeft(board[piece.coordX][piece.coordY])) {
          vMoves.push(new move(piece, 'whiteMoveLeft'));
        }
      }
      if (whiteAbleEatLeft(board[piece.coordX][piece.coordY])) {
        vMoves.push(new move(piece, 'whiteEatLeft'));
      }
      if (whiteAbleEatRight(board[piece.coordX][piece.coordY])) {
        vMoves.push(new move(piece, 'whiteEatRight'));
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
console.log(OptionalMoves(board, 'black'));
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
