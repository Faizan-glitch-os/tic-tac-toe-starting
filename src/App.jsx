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

const initialPlayer = { X: "Player 1", O: "Player 2" };

function deriveActivePlayer(gameTurn) {
  let currentPlayer = "X";

  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, player) {
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
      winner = player[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurn) {
  let gameBoard = [...initialGameBoard.map((row) => [...row])];

  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {
  const [gameTurn, setGameTurn] = useState([]);
  const [player, setPlayer] = useState(initialPlayer);

  let activePlayer = deriveActivePlayer(gameTurn);
  let gameBoard = deriveGameBoard(gameTurn);
  let winner = deriveWinner(gameBoard, player);

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

  function handlePlayerNameChange(playerSymbol, newName) {
    setPlayer((previousPlayer) => {
      return { ...previousPlayer, [playerSymbol]: newName };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={initialPlayer.X}
            symbol="X"
            isActive={activePlayer == "X" ? true : false}
            onChangName={handlePlayerNameChange}
          />
          <Player
            name={initialPlayer.O}
            symbol="O"
            isActive={activePlayer == "O" ? true : false}
            onChangName={handlePlayerNameChange}
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
