const playerFactory = (move) => {
  let score = 0;
  return { move, score }
}

playerOne = playerFactory('x');
playerTwo = playerFactory('o');

const Game = ((playerOne, playerTwo) => {
  let board = Array(9).fill('');
  let whoseTurn = playerOne;

  function restartGame() {
    board = Array(9).fill('');
    whoseTurn = playerOne;
  }

  function makeMove(i) {
    if (!board[i]) {
      board[i] = whoseTurn.move;
      if (winner()) {
        whoseTurn.score += 1;
        displayController.endGame();
      }
      whoseTurn = whoseTurn == playerOne ? playerTwo : playerOne;
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

  return { board, makeMove, winner, whoseTurn }
})(playerOne, playerTwo);

const displayController = (() => {
  const _game = document.querySelector('.game');

  function _renderSquares() {
    Game.board.forEach((square, i) => {
      const div = document.createElement('div');
      div.className = 'square';
      div.style.gridRow = Math.ceil(i / 3 + .1);
      div.style.gridColumn = (i % 3) + 1;
      div.setAttribute('data', i);
      div.textContent = Game.board[i];
      _game.appendChild(div);

      div.addEventListener("click", e => {
        Game.makeMove(e.target.attributes.data.value);
        render();
      })
    })
  }

  function _renderScore() {
    const p1 = document.querySelector('#playerOneScore');
    const p2 = document.querySelector('#playerTwoScore');

    p1.textContent = `score: ${playerOne.score}`;
    p2.textContent = `score: ${playerTwo.score}`;
  }

  function _renderCurrentPlayer() {

    function _toggleActiveClass(ele) {
      if (ele.classList.contains('activePlayer')) {
        ele.classList.remove('activePlayer');
        ele.classList.add('inactivePlayer');
      } else {
        ele.classList.remove('inactivePlayer');
        ele.classList.add('activePlayer');
      }
    }

    const p1 = document.querySelector('.p1');
    const p2 = document.querySelector('.p2');

    if (Game.whoseTurn === playerOne && p1.classList.contains('activePlayer')) {
      return true
    } else {
      _toggleActiveClass(p1);
      _toggleActiveClass(p2);
    }
  }

  function render() {
    _game.innerHTML = '' // reset contents
    _renderSquares();
    _renderScore();
    _renderCurrentPlayer();
  }

  function endGame() {
    console.log('game over');
  }

  return { render, endGame }
})();

displayController.render();
