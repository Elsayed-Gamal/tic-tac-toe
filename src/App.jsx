import { useState } from 'react';
import styles from './App.module.css';
import Cell from './Cell';

function App() {
  const [currentPlayer, setCurrentPlayer] = useState('X');

  function handleClick(e) {
    if (e.target.textContent) return;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer === 'X' ? 'player-x' : 'player-o');

    const arrOfPlays = Array.from(e.target.parentNode.children).map(
      (node) => node.textContent
    );

    console.log(arrOfPlays);

    const winner = checkWinner(arrOfPlays);

    if (winner || !arrOfPlays.includes('')) {
      alert(winner ? `Player ${winner} wins!` : 'Draw');
      reset();
      return;
    }

    setCurrentPlayer((value) => (value === 'X' ? 'O' : 'X'));
  }

  function checkWinner(arrOfPlays) {
    const winnerCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of winnerCombos) {
      if (
        arrOfPlays[a] &&
        arrOfPlays[a] === arrOfPlays[b] &&
        arrOfPlays[a] === arrOfPlays[c]
      ) {
        return arrOfPlays[a];
      }
    }

    return null;
  }

  function reset() {
    const board = document.querySelector('.board');
    const elements = board.children;

    for (const element of elements) {
      element.textContent = '';
      element.classList.remove('player-x', 'player-o');
    }

    setCurrentPlayer('X');
  }

  return (
    <>
      <h1 className={styles.heading}>Tic Tac Toe Game</h1>
      <div className="board">
        {Array.from({ length: 9 }).map((_cell, i) => (
          <Cell key={i} index={i} onClick={handleClick} />
        ))}
      </div>
    </>
  );
}

export default App;
