import { useState } from "react";
import Player from "./components/player";
import GameBoard from "./components/game-board";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");

  function handleActivePlayer() {
    setActivePlayer((currentActivePlayer) =>
      currentActivePlayer == "X" ? "O" : "X"
    );
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
          activePlayerSymbol={activePlayer}
        />
      </div>
      Log
    </main>
  );
}

export default App;
