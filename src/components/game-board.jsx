import { useState } from "react";

let initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({
  handleActivePlayerSymbol,
  activePlayerSymbol,
}) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleSymbol(rowIndex, colIndex) {
    setGameBoard((oldGameBoard) => {
      const updatedGameBoard = [
        ...oldGameBoard.map((innerArray) => [...innerArray]),
      ];
      updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
      return updatedGameBoard;
    });

    handleActivePlayerSymbol();
  }
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, playerSymbolIndex) => (
              <li key={playerSymbolIndex}>
                <button
                  onClick={() => handleSymbol(rowIndex, playerSymbolIndex)}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
