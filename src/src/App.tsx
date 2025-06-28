import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import PlayerRack from "./components/PlayerRack";
import "./App.css";


const BOARD_SIZE = 15;
const RACK_SIZE = 7;
const ALPHABETS = {
  EN: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  PL: "AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUVWXYZŹŻ"
};

const LANG_LABELS = {
  EN: "English",
  PL: "Polski"
};

type TileData = { letter: string | null };
type Language = keyof typeof ALPHABETS;

function getRandomLetters(count: number, alphabet: string) {
  return Array.from(
    { length: count },
    () => alphabet[Math.floor(Math.random() * alphabet.length)]
  );
}


function createEmptyBoard(size: number): TileData[][] {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({ letter: null as string | null }))
  );
}

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language | null>(
    () => (localStorage.getItem("scrabble_lang") as Language) || null
  );
  const [board, setBoard] = useState<TileData[][]>(createEmptyBoard(BOARD_SIZE));
  const [playerRack, setPlayerRack] = useState<string[]>([]);
  const [selectedTile, setSelectedTile] = useState<number | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [newTiles, setNewTiles] = useState<{ row: number; col: number; letter: string }[]>([]);
  const [firstMove, setFirstMove] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  // const [totalScore, setTotalScore] = useState<number>(0);

  useEffect(() => {
    if (language) {
      setPlayerRack(getRandomLetters(RACK_SIZE, ALPHABETS[language]));
      setBoard(createEmptyBoard(BOARD_SIZE));
      localStorage.setItem("scrabble_lang", language);
    }
  }, [language]);

  const handleRackTileClick = (idx: number) => {
    setSelectedTile(idx);
  };

  const handleBoardTileClick = (row: number, col: number) => {
    if (selectedTile !== null && !board[row][col].letter) {
      const letterPlaced = playerRack[selectedTile] || null;
      const newBoard = board.map((r, rIdx) =>
        r.map((tile, cIdx) =>
          rIdx === row && cIdx === col
            ? { letter: letterPlaced }
            : tile
        )
      );
      const newRack = playerRack.slice();
      newRack[selectedTile] = "";
      setBoard(newBoard);
      setPlayerRack(newRack);
      setSelectedTile(null);
      setNewTiles((prev) => [...prev, { row, col, letter: letterPlaced! }]);
    }
  };

  const handleClear = () => {
    if (newTiles.length === 0) return;
    // Remove new tiles from board
    setBoard(prevBoard => {
      const updated = prevBoard.map((row, rIdx) =>
        row.map((tile, cIdx) => {
          const isNew = newTiles.some(nt => nt.row === rIdx && nt.col === cIdx);
          return isNew ? { letter: null } : tile;
        })
      );
      return updated;
    });
    // Return letters to rack
    setPlayerRack(prevRack => {
      const rackCopy = [...prevRack];
      newTiles.forEach(({ letter }) => {
        // Place back in first empty slot
        const idx = rackCopy.findIndex(l => l === "");
        if (idx !== -1) rackCopy[idx] = letter;
      });
      return rackCopy;
    });
    setNewTiles([]);
    setSelectedTile(null);
  };

  const handleShuffle = () => {
    if (language) {
      setPlayerRack(getRandomLetters(RACK_SIZE, ALPHABETS[language]));
      setBoard(createEmptyBoard(BOARD_SIZE));
      setSelectedTile(null);
      setNewTiles([]);
    }
  };

  const handleSubmit = () => {
    if (firstMove) {
      // Center tile is (7,7) for 15x15
      const coversCenter = newTiles.some(t => t.row === 7 && t.col === 7);
      if (!coversCenter) {
        setErrorMsg("The first word must cover the center tile");
        return;
      }
    }
    setFirstMove(false);
    setErrorMsg(null);
    setNewTiles([]);
    // No scoring or bonus logic
  };

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setShowDropdown(false);
  };

  return (
    <div className="app-container">
      {!language && (
        <div className="language-modal">
          <button className="lang-btn" onClick={() => setShowDropdown((v) => !v)}>
            Choose a language
          </button>
          {showDropdown && (
            <div className="lang-dropdown">
              {Object.keys(ALPHABETS).map((lang) => (
                <div
                  className="lang-option"
                  key={lang}
                  onClick={() => handleLanguageSelect(lang as Language)}
                >
                  {LANG_LABELS[lang as Language]}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <h1 className="game-title">Scrabble-like Game</h1>
      {/* Score display removed: no scoring logic active */}
      {language && (
        <>
          {errorMsg && (
            <div className="warning-modal">
              <div className="warning-content">
                <span className="warning-title">⚠️ Warning</span>
                <div className="warning-message">{errorMsg}</div>
                <button className="warning-close" onClick={() => setErrorMsg(null)}>
                  OK
                </button>
              </div>
            </div>
          )}
          <Board board={board} onTileClick={handleBoardTileClick} />
          <PlayerRack letters={playerRack} onTileClick={handleRackTileClick} />
          <div className="controls">
            <button onClick={handleShuffle} className="shuffle-btn">
              {language === "PL" ? "Wylosuj litery" : "Shuffle Letters"}
            </button>
            {selectedTile !== null && (
              <span className="info">
                {language === "PL"
                  ? "Wybierz pole na planszy: "
                  : "Select a board tile to place: "}
                <b>{playerRack[selectedTile]}</b>
              </span>
            )}
            {(newTiles.length > 0 || true) && (
              <button
                className="clear-btn"
                onClick={handleClear}
                disabled={newTiles.length === 0}
                style={{ marginTop: 12, marginRight: 8 }}
              >
                {language === "PL" ? "Wyczyść ruch" : "Clear"}
              </button>
            )}
            {newTiles.length >= 2 && (
              <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={newTiles.length < 2}
                style={{ marginTop: 12 }}
              >
                {language === "PL" ? "Zatwierdź ruch" : "Submit"}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
