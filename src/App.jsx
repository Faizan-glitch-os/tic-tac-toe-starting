import { useState } from "react";
import Player from "./components/player";
import GameBoard from "./components/game-board";
import Log from "./components/log";
import { WINNING_COMBINATIONS } from "./wining-combinations";
import GameOver from "./components/game-over";

let initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurn) {
  let currentPlayer = "X";

  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [gameTurn, setGameTurn] = useState([]);

  let activePlayer = deriveActivePlayer(gameTurn);

  let gameBoard = [...initialGameBoard.map((row) => [...row])];

  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  let draw = gameTurn.length === 9 && !winner;

  function handleActivePlayer(rowIndex, playerSymbolIndex) {
    setGameTurn((previousTurn) => {
      let currentPlayer = deriveActivePlayer(previousTurn);

      const updatedTurn = [
        {
          square: { row: rowIndex, col: playerSymbolIndex },
          player: currentPlayer,
        },
        ...previousTurn,
      ];

      return updatedTurn;
    });
  }

  function handleRestart() {
    setGameTurn([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player 1"
            symbol="X"
            isActive={activePlayer == "X" ? true : false}
          />
          <Player
            name="Player 2"
            symbol="O"
            isActive={activePlayer == "O" ? true : false}
          />
        </ol>
        {(winner || draw) && (
          <GameOver winner={winner} onRematch={handleRestart} />
        )}
        <GameBoard
          handleActivePlayerSymbol={handleActivePlayer}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}

export default App;
