import React, { useState } from "react";
import Board from "./components/Board";
import PlayerRack from "./components/PlayerRack";
import "./App.css";

const BOARD_SIZE = 11;
const RACK_SIZE = 7;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

type TileData = { letter: string | null };

function getRandomLetters(count: number) {
  return Array.from(
    { length: count },
    () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
  );
}

function createEmptyBoard(size: number): TileData[][] {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({ letter: null as string | null }))
  );
}

const App: React.FC = () => {
  const [board, setBoard] = useState<TileData[][]>(
    createEmptyBoard(BOARD_SIZE)
  );
  const [playerRack, setPlayerRack] = useState(getRandomLetters(RACK_SIZE));
  const [selectedTile, setSelectedTile] = useState<number | null>(null);

  const handleRackTileClick = (idx: number) => {
    setSelectedTile(idx);
  };

  const handleBoardTileClick = (row: number, col: number) => {
    if (selectedTile !== null && !board[row][col].letter) {
      const newBoard = board.map((r, rIdx) =>
        r.map((tile, cIdx) =>
          rIdx === row && cIdx === col
            ? { letter: playerRack[selectedTile] || null }
            : tile
        )
      );
      const newRack = playerRack.slice();
      newRack[selectedTile] = "";
      setBoard(newBoard);
      setPlayerRack(newRack);
      setSelectedTile(null);
    }
  };

  const handleShuffle = () => {
    setPlayerRack(getRandomLetters(RACK_SIZE));
    setBoard(createEmptyBoard(BOARD_SIZE));
    setSelectedTile(null);
  };

  return (
    <div className="app-container">
      <h1 className="game-title">Scrabble-like Game</h1>
      <Board board={board} onTileClick={handleBoardTileClick} />
      <PlayerRack letters={playerRack} onTileClick={handleRackTileClick} />
      <div className="controls">
        <button onClick={handleShuffle} className="shuffle-btn">
          Shuffle Letters
        </button>
        {selectedTile !== null && (
          <span className="info">
            Select a board tile to place: <b>{playerRack[selectedTile]}</b>
          </span>
        )}
      </div>
    </div>
  );
};

export default App;
