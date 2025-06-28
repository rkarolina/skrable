# Scrabble-like Game (React + TypeScript + Vite)

This project is a modern, visually appealing Scrabble-like game built with React, TypeScript, and Vite.

## Features

- Interactive board for placing letters
- Random letter generation for each player
- Modern, attractive UI
- Modular components: Board, Tiles, Player Racks
- Word placement validation and scoring logic (if possible)

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
3. Open your browser at the local address shown in the terminal.

## Project Structure

- `src/` - Main source code
- `src/components/` - React components (Board, Tile, PlayerRack, etc.)
- `src/styles/` - CSS or styled-components for a modern look

## Customization

You can easily extend the game by adding new features, improving the UI, or adjusting the rules.

---

This project was bootstrapped with [Vite](https://vitejs.dev/) and uses React + TypeScript.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
