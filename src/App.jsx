import { useState } from "react";
import Player from "./components/player";
import GameBoard from "./components/game-board";
import Log from "./components/log";

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
        <GameBoard
          handleActivePlayerSymbol={handleActivePlayer}
          turns={gameTurn}
        />
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}

export default App;
