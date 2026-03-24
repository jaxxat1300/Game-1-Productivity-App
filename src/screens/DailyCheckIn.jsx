import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const moods = [
  { id: 'happy', emoji: '😊', label: 'Happy' },
  { id: 'calm', emoji: '😌', label: 'Calm' },
  { id: 'stressed', emoji: '😰', label: 'Stressed' },
  { id: 'sad', emoji: '😔', label: 'Sad' },
  { id: 'frustrated', emoji: '😤', label: 'Frustrated' },
  { id: 'tired', emoji: '😴', label: 'Tired' },
  { id: 'anxious', emoji: '😟', label: 'Anxious' },
  { id: 'bored', emoji: '😑', label: 'Bored' },
];

const reasons = [
  "I'm bored",
  "I'm stressed",
  "I need a break",
  "It's a habit",
  "I just want to play",
];

const games = [
  { id: 'wordsearch', icon: '🔤', label: 'Word Search', desc: 'Find hidden words in a grid (~5 min)' },
  { id: 'crossword', icon: '✏️', label: 'Crossword', desc: 'Fill in the puzzle with clues (~7 min)' },
  { id: 'finditem', icon: '🔍', label: 'Find the Item', desc: "Like Where's Waldo but simpler (~5 min)" },
  { id: 'surprise', icon: '🎲', label: 'Surprise Me!', desc: 'Pick a random game for me' },
];

const DailyCheckIn = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [mood, setMood] = useState(null);
  const [reason, setReason] = useState(null);
  const [game, setGame] = useState(null);

  const handleContinue = () => {
    if (step === 0 && mood) {
      setStep(1);
    } else if (step === 1 && reason) {
      setStep(2);
    } else if (step === 2 && game) {
      const gameOptions = ['wordsearch', 'crossword', 'finditem'];
      const selectedGame =
        game === 'surprise'
          ? gameOptions[Math.floor(Math.random() * gameOptions.length)]
          : game;
      onComplete({ mood, reason, game: selectedGame });
    }
  };

  const canContinue =
    (step === 0 && mood) ||
    (step === 1 && reason) ||
    (step === 2 && game);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-peace-50 to-lavender-50 flex flex-col">
      <div className="flex gap-2 p-6 justify-center pt-10">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === step
                ? 'w-8 bg-sage-500'
                : i < step
                ? 'w-4 bg-sage-300'
                : 'w-4 bg-gray-200'
            }`}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col p-6 max-w-lg mx-auto w-full">
        {step === 0 && (
          <>
            <h2 className="text-2xl font-display font-bold text-gray-800 mb-1">
              How are you feeling right now?
            </h2>
            <p className="text-gray-500 font-body text-sm mb-6">
              We'll match you with the best game for your mood
            </p>
            <div className="grid grid-cols-4 gap-3">
              {moods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMood(m.id)}
                  className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all active:scale-95 ${
                    mood === m.id
                      ? 'bg-sage-100 border-sage-400 shadow-soft'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <span className="text-3xl mb-1">{m.emoji}</span>
                  <span className="text-xs font-body text-gray-600 text-center leading-tight">
                    {m.label}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="text-2xl font-display font-bold text-gray-800 mb-1">
              What brought you here today?
            </h2>
            <p className="text-gray-500 font-body text-sm mb-6">
              No judgment — just helps us understand your moment
            </p>
            <div className="space-y-3">
              {reasons.map((r) => (
                <button
                  key={r}
                  onClick={() => setReason(r)}
                  className={`w-full text-left px-5 py-4 rounded-2xl border-2 font-body text-base transition-all active:scale-95 ${
                    reason === r
                      ? 'bg-gradient-to-r from-sage-100 to-peace-100 border-sage-400 font-medium text-gray-800'
                      : 'bg-white border-gray-200 text-gray-700'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-display font-bold text-gray-800 mb-1">
              What would you like to play?
            </h2>
            <p className="text-gray-500 font-body text-sm mb-6">
              All games are a quick mindful break from scrolling
            </p>
            <div className="space-y-3">
              {games.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGame(g.id)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 transition-all active:scale-95 ${
                    game === g.id
                      ? 'bg-gradient-to-r from-sage-100 to-peace-100 border-sage-400'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <span className="text-3xl flex-shrink-0">{g.icon}</span>
                  <div className="flex-1 text-left">
                    <div className="font-display font-bold text-gray-800 text-base">
                      {g.label}
                    </div>
                    <div className="text-xs text-gray-500 font-body mt-0.5">{g.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className={`mt-8 w-full py-4 rounded-2xl font-display font-bold text-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${
            canContinue
              ? 'bg-gradient-to-r from-sage-400 to-peace-400 text-white shadow-soft'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {step === 2 ? 'Play!' : 'Next'}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default DailyCheckIn;
