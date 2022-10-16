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