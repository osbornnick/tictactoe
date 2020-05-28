const playerFactory = (move) => {
  return { move }
}

playerOne = playerFactory('x');
playerTwo = playerFactory('o');

const Game = ((playerOne, playerTwo) => {
  let board = Array(9).fill(false);
  let turn = playerOne;

  function makeMove(i) {
    if (!board[i]) {
      board[i] = turn.move;
      turn = turn == playerOne ? playerTwo : playerOne;
    }
    if (winner()) {
      // do something
    }
  }

  function winner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return squares[a];
      }
    }
    return false;
  }
  return { board, makeMove }
})(playerOne, playerTwo);
