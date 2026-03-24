import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

// 10x10 grid with 6 words hidden inside
const GRID = [
  ['C','A','L','M','K','F','O','C','U','S'],
  ['B','R','E','A','T','H','E','W','Z','P'],
  ['O','N','V','X','J','Q','M','D','E','R'],
  ['R','E','L','A','X','G','T','Y','N','B'],
  ['W','K','P','S','I','U','F','C','L','V'],
  ['P','E','A','C','E','H','O','J','Q','X'],
  ['T','M','Z','L','K','N','W','R','D','G'],
  ['Y','X','C','F','V','B','P','S','A','U'],
  ['J','Q','N','H','M','T','E','K','L','O'],
  ['D','W','R','G','P','C','V','Y','F','N'],
];

// All word answers (uppercase)
const WORD_LIST = ['CALM', 'FOCUS', 'BREATHE', 'ZEN', 'RELAX', 'PEACE'];

const cellKey = (r, c) => `${r}-${c}`;

const getCellsInLine = (start, end) => {
  const rowDiff = end.row - start.row;
  const colDiff = end.col - start.col;
  const dr = Math.sign(rowDiff);
  const dc = Math.sign(colDiff);
  const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));

  // Must be strictly horizontal, vertical, or 45-degree diagonal
  if (rowDiff !== 0 && colDiff !== 0 && Math.abs(rowDiff) !== Math.abs(colDiff)) {
    return null;
  }

  const cells = [];
  for (let i = 0; i <= steps; i++) {
    cells.push([start.row + dr * i, start.col + dc * i]);
  }
  return cells;
};

const WordSearch = ({ onBack, onComplete }) => {
  const [firstCell, setFirstCell] = useState(null);
  // foundWords: [{ word: string, cells: [[r,c],...] }]
  const [foundWords, setFoundWords] = useState([]);
  const [flashError, setFlashError] = useState(false);

  const foundWordNames = foundWords.map((w) => w.word);
  const foundCellSet = new Set(
    foundWords.flatMap((w) => w.cells.map(([r, c]) => cellKey(r, c)))
  );
  const allFound = foundWordNames.length === WORD_LIST.length;

  const handleCellPress = (row, col) => {
    if (allFound) return;

    if (!firstCell) {
      setFirstCell({ row, col });
      return;
    }

    // Tap same cell again = deselect
    if (firstCell.row === row && firstCell.col === col) {
      setFirstCell(null);
      return;
    }

    const lineCells = getCellsInLine(firstCell, { row, col });
    if (!lineCells) {
      setFirstCell({ row, col });
      return;
    }

    const forward = lineCells.map(([r, c]) => GRID[r][c]).join('');
    const backward = forward.split('').reverse().join('');

    const matchedWord = WORD_LIST.find(
      (w) => !foundWordNames.includes(w) && (w === forward || w === backward)
    );

    if (matchedWord) {
      const newFound = [...foundWords, { word: matchedWord, cells: lineCells }];
      setFoundWords(newFound);
      if (newFound.length === WORD_LIST.length) {
        setTimeout(() => onComplete && onComplete(), 800);
      }
    } else {
      setFlashError(true);
      setTimeout(() => setFlashError(false), 500);
    }

    setFirstCell(null);
  };

  const getCellClass = (row, col) => {
    const key = cellKey(row, col);
    const isFound = foundCellSet.has(key);
    const isSelected = firstCell && firstCell.row === row && firstCell.col === col;

    if (isFound) return 'bg-sage-400 text-white border-sage-500 scale-95';
    if (isSelected)
      return `border-peace-400 text-gray-800 scale-110 shadow-soft ${
        flashError ? 'bg-coral-200' : 'bg-peace-200'
      }`;
    return 'bg-white text-gray-700 border-gray-200 hover:bg-sage-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-peace-50 to-lavender-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 pt-10 pb-4 flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-xl active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-display font-bold text-gray-800">Word Search</h1>
          <p className="text-sm text-gray-500 font-body">
            {foundWordNames.length}/{WORD_LIST.length} words found
          </p>
        </div>
        <div className="text-sm font-body text-gray-400">
          Tap start then end of a word
        </div>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        {allFound ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-16">
            <div className="text-7xl mb-6 animate-bounce-soft">🎉</div>
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-3">
              You found them all!
            </h2>
            <p className="text-gray-600 font-body text-lg mb-8">
              Nice work taking a mindful break.
            </p>
            <button
              onClick={onBack}
              className="px-8 py-4 bg-gradient-to-r from-sage-400 to-peace-400 text-white rounded-3xl font-display font-bold text-lg shadow-soft active:scale-95 transition-transform"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className="flex justify-center mb-5">
              <div
                className="grid gap-1"
                style={{ gridTemplateColumns: 'repeat(10, 2rem)' }}
              >
                {GRID.map((row, r) =>
                  row.map((letter, c) => (
                    <button
                      key={`${r}-${c}`}
                      onClick={() => handleCellPress(r, c)}
                      className={`w-8 h-8 rounded-lg border text-xs font-display font-bold transition-all active:scale-90 ${getCellClass(r, c)}`}
                    >
                      {letter}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Word list */}
            <div className="bg-white rounded-3xl p-5 shadow-soft">
              <h3 className="font-display font-semibold text-gray-500 mb-3 text-xs uppercase tracking-widest">
                Find these words
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {WORD_LIST.map((word) => (
                  <div
                    key={word}
                    className={`text-center py-2 px-3 rounded-xl font-display font-semibold text-sm transition-all ${
                      foundWordNames.includes(word)
                        ? 'bg-sage-100 text-sage-600 line-through opacity-60'
                        : 'bg-gray-50 text-gray-700'
                    }`}
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>

            {/* Hint */}
            <p className="text-center text-xs text-gray-400 font-body mt-4">
              Words run horizontal, vertical, or diagonal
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default WordSearch;
