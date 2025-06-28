import React from "react";
import "./PlayerRack.css";

interface PlayerRackProps {
  letters: string[];
  onTileClick: (index: number) => void;
}

const PlayerRack: React.FC<PlayerRackProps> = ({ letters, onTileClick }) => {
  return (
    <div className="player-rack">
      {letters.map((letter, idx) => (
        <div className="rack-tile" key={idx} onClick={() => onTileClick(idx)}>
          {letter}
        </div>
      ))}
    </div>
  );
};

export default PlayerRack;
