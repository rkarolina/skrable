import React from "react";
import "./Tile.css";

interface TileProps {
  letter: string | null;
  onClick?: () => void;
}

const Tile: React.FC<TileProps> = ({ letter, onClick }) => {
  return (
    <div className="tile" onClick={onClick}>
      {letter}
    </div>
  );
};

export default Tile;
