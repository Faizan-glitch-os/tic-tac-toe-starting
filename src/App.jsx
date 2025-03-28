import { useState } from "react";
import Player from "./components/player";
import GameBoard from "./components/game-board";

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player name="Player 1" symbol="X" />
          <Player name="Player 2" symbol="O" />
        </ol>
        <GameBoard />
      </div>
      Log
    </main>
  );
}

export default App;
