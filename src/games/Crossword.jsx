import React, { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';

// Crossword layout (5 rows x 5 cols, index 0-4)
// Words:
//   1-DOWN:   RELAX  col=2, rows 0-4
//   2-ACROSS: CALM   row=2, cols 0-3  (shares L with RELAX at row2,col2)
//   3-ACROSS: PEACE  row=3, cols 0-4  (shares A with RELAX at row3,col2)

// Answer map: "row-col" -> correct letter
const ANSWERS = {
  '0-2': 'R',
  '1-2': 'E',
  '2-0': 'C', '2-1': 'A', '2-2': 'L', '2-3': 'M',
  '3-0': 'P', '3-1': 'E', '3-2': 'A', '3-3': 'C', '3-4': 'E',
  '4-2': 'X',
};

// Clue number labels on certain cells
const CLUE_NUMBERS = {
  '0-2': 1,
  '2-0': 2,
  '3-0': 3,
};

// Pre-filled hint letters shown to the player
const GIVEN = new Set(['0-2', '2-0', '3-0']);

const ROWS = 5;
const COLS = 5;

const clues = {
  across: [
    { num: 2, clue: 'Peaceful, not anxious or excited' },
    { num: 3, clue: 'Inner tranquility; absence of conflict' },
  ],
  down: [
    { num: 1, clue: 'To unwind and release tension' },
  ],
};

const Crossword = ({ onBack, onComplete }) => {
  const [inputs, setInputs] = useState({});
  const [checked, setChecked] = useState(false);

  const isActiveCell = (r, c) => `${r}-${c}` in ANSWERS;

  const handleInput = (key, value) => {
    const letter = value.toUpperCase().slice(-1);
    setInputs((prev) => ({ ...prev, [key]: letter }));
    setChecked(false);
  };

  const handleCheck = () => {
    setChecked(true);
    const allCorrect = Object.entries(ANSWERS).every(([key, letter]) => {
      if (GIVEN.has(key)) return true;
      return inputs[key] === letter;
    });
    if (allCorrect) {
      setTimeout(() => onComplete && onComplete(), 800);
    }
  };

  const getCellStatus = (key) => {
    if (!checked) return 'neutral';
    if (GIVEN.has(key)) return 'given';
    return inputs[key] === ANSWERS[key] ? 'correct' : 'wrong';
  };

  const allFilled = Object.keys(ANSWERS).every(
    (key) => GIVEN.has(key) || inputs[key]
  );

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
          <h1 className="text-xl font-display font-bold text-gray-800">Crossword</h1>
          <p className="text-sm text-gray-500 font-body">Fill in the puzzle using the clues</p>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto max-w-lg mx-auto w-full">
        {/* Grid */}
        <div className="flex justify-center mb-8">
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: `repeat(${COLS}, 3.5rem)` }}
          >
            {Array.from({ length: ROWS }, (_, r) =>
              Array.from({ length: COLS }, (_, c) => {
                const key = `${r}-${c}`;
                const active = isActiveCell(r, c);
                const num = CLUE_NUMBERS[key];
                const status = getCellStatus(key);
                const isGiven = GIVEN.has(key);

                if (!active) {
                  return (
                    <div
                      key={key}
                      className="w-14 h-14 rounded-lg bg-gray-800"
                    />
                  );
                }

                let cellBg = 'bg-white border-gray-300';
                if (isGiven) cellBg = 'bg-sage-50 border-sage-300';
                else if (status === 'correct') cellBg = 'bg-sage-100 border-sage-400';
                else if (status === 'wrong') cellBg = 'bg-coral-100 border-coral-400';

                return (
                  <div key={key} className={`relative w-14 h-14 rounded-lg border-2 ${cellBg}`}>
                    {num && (
                      <span className="absolute top-0.5 left-1 text-xs font-display font-bold text-gray-500 leading-none">
                        {num}
                      </span>
                    )}
                    {isGiven ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-xl font-display font-bold text-sage-700">
                          {ANSWERS[key]}
                        </span>
                      </div>
                    ) : (
                      <input
                        type="text"
                        maxLength={1}
                        value={inputs[key] || ''}
                        onChange={(e) => handleInput(key, e.target.value)}
                        className="w-full h-full text-center text-xl font-display font-bold bg-transparent outline-none pt-3 uppercase text-gray-800"
                      />
                    )}
                    {status === 'correct' && !isGiven && (
                      <div className="absolute top-0.5 right-0.5">
                        <Check className="w-3 h-3 text-sage-500" />
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Clues */}
        <div className="bg-white rounded-3xl p-5 shadow-soft mb-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-display font-bold text-gray-500 text-xs uppercase tracking-widest mb-3">
                Across
              </h3>
              <div className="space-y-3">
                {clues.across.map(({ num, clue }) => (
                  <div key={num}>
                    <span className="font-display font-bold text-sage-600 text-sm">{num}. </span>
                    <span className="font-body text-gray-700 text-sm">{clue}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display font-bold text-gray-500 text-xs uppercase tracking-widest mb-3">
                Down
              </h3>
              <div className="space-y-3">
                {clues.down.map(({ num, clue }) => (
                  <div key={num}>
                    <span className="font-display font-bold text-sage-600 text-sm">{num}. </span>
                    <span className="font-body text-gray-700 text-sm">{clue}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {checked && (
          <div
            className={`rounded-2xl p-4 mb-4 text-center font-body text-sm ${
              Object.entries(ANSWERS).every(
                ([k, l]) => GIVEN.has(k) || inputs[k] === l
              )
                ? 'bg-sage-100 text-sage-700'
                : 'bg-coral-100 text-coral-700'
            }`}
          >
            {Object.entries(ANSWERS).every(
              ([k, l]) => GIVEN.has(k) || inputs[k] === l
            )
              ? 'Perfect! All correct!'
              : 'Some answers are wrong — keep trying!'}
          </div>
        )}

        <button
          onClick={handleCheck}
          disabled={!allFilled}
          className={`w-full py-4 rounded-2xl font-display font-bold text-lg transition-all active:scale-95 ${
            allFilled
              ? 'bg-gradient-to-r from-sage-400 to-peace-400 text-white shadow-soft'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Check Answers
        </button>
      </div>
    </div>
  );
};

export default Crossword;
