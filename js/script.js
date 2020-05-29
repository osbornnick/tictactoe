const playerFactory = (move) => {
  let score = 0;
  return { move, score }
}

playerOne = playerFactory('x');
playerTwo = playerFactory('o');

const Game = ((playerOne, playerTwo) => {
  let board = Array(9).fill('');
  let turnPlayer = playerOne;

  function _restartGame() {
    board = Array(9).fill('');
    turnPlayer = playerOne;
  }

  function makeMove(i) {
    if (!board[i]) {
      board[i] = turnPlayer.move;
      if (winner()) {
        turnPlayer.score += 1;
        // announce winner
      }
      turnPlayer = turnPlayer == playerOne ? playerTwo : playerOne;
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
        //return squares[a];
        return true
      }
    }
    return false
  }

  return { board, makeMove, winner }
})(playerOne, playerTwo);

const displayController = (() => {

  const _game = document.querySelector('.game');
  function _renderSquares() {
    Game.board.forEach((square, i) => {
      const div = document.createElement('div');
      div.className = 'square';
      div.style.gridRow = Math.ceil(i / 3 + .1);
      div.style.gridColumn = (i % 3) + 1;
      div.setAttribute('data', i)
      div.textContent = Game.board[i];
      _game.appendChild(div);

      div.addEventListener("click", e => {
        Game.makeMove(e.target.attributes.data.value);
        render();
      })
    })
  }

  function render() {
    _game.innerHTML = '' // reset contents
    _renderSquares();
  }

  return { render }
})(Game);

// Game.board = ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'x', 'x'];
displayController.render();
