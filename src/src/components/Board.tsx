import React from "react";
import "./Board.css";

interface TileData {
  letter: string | null;
}

interface BoardProps {
  board: TileData[][];
  onTileClick: (row: number, col: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onTileClick }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div className="board-row" key={rowIndex}>
          {row.map((tile, colIndex) => (
            <div
              className="board-tile"
              key={colIndex}
              onClick={() => onTileClick(rowIndex, colIndex)}
            >
              {tile.letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
