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
  const centerRow = 7;
  const centerCol = 7;
  return (
    <div className="board">
      {board.flatMap((row, rowIndex) =>
        row.map((tile, colIndex) => {
          const isCenter = rowIndex === centerRow && colIndex === centerCol;
          return (
            <div
              className={`board-tile${isCenter ? " center-tile" : ""}`}
              key={`${rowIndex}-${colIndex}`}
              onClick={() => onTileClick(rowIndex, colIndex)}
            >
              {isCenter && !tile.letter ? <span className="center-star">★</span> : null}
              <span>{tile.letter}</span>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Board;
