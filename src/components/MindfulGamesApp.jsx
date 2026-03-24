import React, { useState, useEffect, useRef } from 'react';
import { Brain, Sparkles, Clock, ArrowLeft, RotateCcw } from 'lucide-react';
import OnboardingScreen from '../screens/OnboardingScreen';
import DailyCheckIn from '../screens/DailyCheckIn';
import WordSearch from '../games/WordSearch';
import Crossword from '../games/Crossword';
import FindTheItem from '../games/FindTheItem';

// ─── LocalStorage helpers ───────────────────────────────────────────────────
const LS = {
  get: (key) => {
    try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
  },
  set: (key, val) => localStorage.setItem(key, JSON.stringify(val)),
  remove: (key) => localStorage.removeItem(key),
};

const todayKey = () => new Date().toISOString().slice(0, 10);

const getSecondsUsedToday = () => {
  const data = LS.get('mindplay_daily');
  if (!data || data.date !== todayKey()) return 0;
  return data.seconds || 0;
};

const addSecondsToday = (secs) => {
  const current = getSecondsUsedToday();
  LS.set('mindplay_daily', { date: todayKey(), seconds: current + secs });
};

const dailyCheckInDone = () => {
  const data = LS.get('mindplay_checkin');
  return data && data.date === todayKey();
};

// ─── Welcome Screen ──────────────────────────────────────────────────────────
const WelcomeScreen = ({ onGetStarted, onLogin }) => (
  <div className="min-h-screen bg-gradient-to-br from-sage-400 via-peace-300 to-lavender-300 flex items-center justify-center p-6">
    <div className="text-center w-full max-w-md">
      <div className="mb-12 flex justify-center">
        <div className="relative">
          <div className="w-28 h-28 bg-white rounded-4xl flex items-center justify-center shadow-card animate-float">
            <Brain className="w-16 h-16 text-sage-500" />
          </div>
          <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-coral-400 animate-pulse" />
        </div>
      </div>
      <h1 className="text-5xl font-display font-bold text-white mb-3 drop-shadow-lg">MindPlay</h1>
      <p className="text-lg text-white/90 mb-4 font-body px-4">
        Play a game instead of scrolling.
      </p>
      <p className="text-sm text-white/70 mb-14 font-body px-4">
        Word search, crossword, and hidden object puzzles — all designed to give your brain a real break.
      </p>
      <div className="space-y-4 px-6">
        <button
          onClick={onGetStarted}
          className="w-full bg-white text-sage-600 py-5 px-6 rounded-3xl font-display font-bold text-lg shadow-card active:scale-95 transition-transform"
        >
          Get Started
        </button>
        <button
          onClick={onLogin}
          className="w-full bg-white/20 backdrop-blur-lg text-white py-5 px-6 rounded-3xl font-display font-semibold text-lg border-2 border-white/30 active:scale-95 transition-transform"
        >
          Log In
        </button>
      </div>
    </div>
  </div>
);

// ─── Auth Screen ─────────────────────────────────────────────────────────────
const AuthScreen = ({ mode, onSubmit, onToggle, onBack }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-100 via-peace-50 to-lavender-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-4xl shadow-card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-sage-400 to-peace-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-soft">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-1">
            {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-500 font-body text-sm">
            {mode === 'signup' ? 'Start your mindful gaming journey' : 'Good to see you again'}
          </p>
        </div>

        <div className="space-y-4">
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-sage-400 focus:outline-none font-body text-lg"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-sage-400 focus:outline-none font-body text-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-sage-400 focus:outline-none font-body text-lg"
          />
          <button
            onClick={() => onSubmit(form)}
            className="w-full bg-gradient-to-r from-sage-400 to-peace-400 text-white py-5 rounded-3xl font-display font-bold text-lg active:scale-95 transition-transform shadow-soft mt-2"
          >
            {mode === 'signup' ? 'Create Account' : 'Log In'}
          </button>
        </div>

        <button
          onClick={onToggle}
          className="mt-8 text-sage-600 font-medium font-body w-full text-center"
        >
          {mode === 'login'
            ? "Don't have an account? Sign up"
            : 'Already have an account? Log in'}
        </button>
        <button
          onClick={onBack}
          className="mt-4 text-gray-400 text-sm w-full font-body flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>
    </div>
  );
};

// ─── Home / Game Selector ────────────────────────────────────────────────────
const HomeScreen = ({ user, checkIn, timeLimit, secondsUsed, onSelectGame, onLogout }) => {
  const limitSecs = timeLimit * 60;
  const remaining = Math.max(0, limitSecs - secondsUsed);
  const pct = limitSecs >= 999 * 60 ? 100 : Math.round((remaining / limitSecs) * 100);

  const moodEmojis = {
    happy: '😊', calm: '😌', stressed: '😰', sad: '😔',
    frustrated: '😤', tired: '😴', anxious: '😟', bored: '😑',
  };

  const games = [
    {
      id: 'wordsearch',
      icon: '🔤',
      label: 'Word Search',
      desc: 'Find CALM, ZEN, PEACE + more hidden in a 10×10 grid',
      time: '~5 min',
      color: 'from-sage-100 to-sage-200',
      accent: 'text-sage-700',
    },
    {
      id: 'crossword',
      icon: '✏️',
      label: 'Crossword',
      desc: 'Fill in a mini crossword using the clues',
      time: '~7 min',
      color: 'from-peace-100 to-peace-200',
      accent: 'text-peace-700',
    },
    {
      id: 'finditem',
      icon: '🔍',
      label: 'Find the Item',
      desc: "Spot hidden items in a scene — like Where's Waldo",
      time: '~5 min',
      color: 'from-lavender-100 to-lavender-200',
      accent: 'text-lavender-600',
    },
  ];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-peace-50 to-lavender-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 pt-10 pb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-800">
              {greeting} {moodEmojis[checkIn?.mood] || '👋'}
            </h1>
            <p className="text-gray-500 font-body text-sm mt-0.5">{user?.name}</p>
          </div>
          <button
            onClick={onLogout}
            className="text-xs text-gray-400 font-body px-3 py-2 rounded-xl bg-gray-50 active:scale-95"
          >
            Log out
          </button>
        </div>

        {/* Time limit bar */}
        {timeLimit < 999 && (
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex items-center gap-1.5 text-sm font-body text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Daily time left</span>
              </div>
              <span className="text-sm font-display font-bold text-gray-700">
                {remaining === 0
                  ? "Time's up!"
                  : `${Math.floor(remaining / 60)}m ${remaining % 60}s`}
              </span>
            </div>
            <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  pct > 40 ? 'bg-gradient-to-r from-sage-400 to-peace-400' : 'bg-coral-400'
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Why you're here */}
      {checkIn?.reason && (
        <div className="mx-6 mt-5 bg-white rounded-3xl p-4 shadow-soft flex items-center gap-3">
          <span className="text-2xl">💬</span>
          <p className="text-sm font-body text-gray-600">
            You came here because: <span className="font-medium text-gray-800">"{checkIn.reason}"</span>
            <br />
            <span className="text-gray-400 text-xs">That's a good enough reason. Pick a game.</span>
          </p>
        </div>
      )}

      {/* Games */}
      <div className="flex-1 p-6 space-y-4 overflow-auto">
        <h2 className="font-display font-bold text-gray-700 text-sm uppercase tracking-widest">
          Choose a game
        </h2>

        {remaining === 0 && timeLimit < 999 ? (
          <div className="bg-white rounded-3xl p-6 shadow-soft text-center">
            <div className="text-5xl mb-4">⏰</div>
            <h3 className="text-xl font-display font-bold text-gray-800 mb-2">
              You've hit your daily limit
            </h3>
            <p className="text-gray-600 font-body text-sm">
              You set a {timeLimit}-minute daily goal. Come back tomorrow!
            </p>
            <p className="text-gray-400 font-body text-xs mt-3">
              Being honest with yourself is part of the practice.
            </p>
          </div>
        ) : (
          games.map((g) => (
            <button
              key={g.id}
              onClick={() => onSelectGame(g.id)}
              className={`w-full bg-gradient-to-r ${g.color} rounded-3xl p-5 shadow-soft active:scale-95 transition-transform text-left`}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{g.icon}</div>
                <div className="flex-1">
                  <div className={`font-display font-bold text-lg ${g.accent}`}>{g.label}</div>
                  <div className="text-gray-600 font-body text-sm mt-0.5">{g.desc}</div>
                </div>
                <div className={`text-xs font-body ${g.accent} opacity-70 flex-shrink-0`}>
                  {g.time}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

// ─── Game Complete Screen ────────────────────────────────────────────────────
const GameComplete = ({ onPlayAnother, onGoHome }) => (
  <div className="min-h-screen bg-gradient-to-br from-sage-50 via-peace-50 to-lavender-50 flex flex-col items-center justify-center p-8 text-center">
    <div className="text-7xl mb-6 animate-bounce-soft">🎉</div>
    <h2 className="text-3xl font-display font-bold text-gray-800 mb-3">
      Game complete!
    </h2>
    <p className="text-gray-600 font-body text-lg mb-2">
      Nice work choosing to play instead of scroll.
    </p>
    <p className="text-gray-400 font-body text-sm mb-10">
      That's your brain getting a real break.
    </p>
    <div className="w-full max-w-xs space-y-3">
      <button
        onClick={onPlayAnother}
        className="w-full py-4 bg-gradient-to-r from-sage-400 to-peace-400 text-white rounded-3xl font-display font-bold text-lg shadow-soft active:scale-95 transition-transform"
      >
        Play Another
      </button>
      <button
        onClick={onGoHome}
        className="w-full py-4 bg-white text-gray-700 rounded-3xl font-display font-semibold text-lg border-2 border-gray-200 active:scale-95 transition-transform"
      >
        I'm good for now
      </button>
    </div>
  </div>
);

// ─── Main App ────────────────────────────────────────────────────────────────
const MindfulGamesApp = () => {
  const [screen, setScreen] = useState('welcome'); // welcome | login | signup | onboarding | checkin | home | game | done
  const [authMode, setAuthMode] = useState('signup');
  const [user, setUser] = useState(null);
  const [onboardingData, setOnboardingData] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [activeGame, setActiveGame] = useState(null);
  const [secondsUsed, setSecondsUsed] = useState(getSecondsUsedToday());

  const timerRef = useRef(null);

  // Restore from localStorage on mount
  useEffect(() => {
    const savedUser = LS.get('mindplay_user');
    const savedOnboarding = LS.get('mindplay_onboarding');
    const savedCheckIn = LS.get('mindplay_checkin');

    if (savedUser && savedOnboarding) {
      setUser(savedUser);
      setOnboardingData(savedOnboarding);

      if (savedCheckIn && savedCheckIn.date === todayKey()) {
        setCheckIn(savedCheckIn);
        setScreen('home');
      } else {
        setScreen('checkin');
      }
    }
  }, []);

  // Timer while game is active
  useEffect(() => {
    if (screen === 'game') {
      timerRef.current = setInterval(() => {
        setSecondsUsed((prev) => {
          const next = prev + 1;
          addSecondsToday(1);
          return next;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [screen]);

  const timeLimit = onboardingData?.timeLimit ?? 20;
  const limitSecs = timeLimit * 60;
  const timeUp = timeLimit < 999 && secondsUsed >= limitSecs;

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleAuth = (form) => {
    const newUser = {
      name: form.name || form.email.split('@')[0] || 'Player',
      email: form.email,
    };
    setUser(newUser);
    LS.set('mindplay_user', newUser);

    const existing = LS.get('mindplay_onboarding');
    if (existing) {
      setOnboardingData(existing);
      if (dailyCheckInDone()) {
        const ci = LS.get('mindplay_checkin');
        setCheckIn(ci);
        setScreen('home');
      } else {
        setScreen('checkin');
      }
    } else {
      setScreen('onboarding');
    }
  };

  const handleOnboardingComplete = (data) => {
    setOnboardingData(data);
    LS.set('mindplay_onboarding', data);
    setScreen('checkin');
  };

  const handleCheckInComplete = (data) => {
    const ci = { ...data, date: todayKey() };
    setCheckIn(ci);
    LS.set('mindplay_checkin', ci);
    setScreen('home');
  };

  const handleSelectGame = (gameId) => {
    setActiveGame(gameId);
    setScreen('game');
  };

  const handleGameComplete = () => {
    setScreen('done');
  };

  const handlePlayAnother = () => {
    setScreen('home');
    setActiveGame(null);
  };

  const handleLogout = () => {
    LS.remove('mindplay_checkin');
    setUser(null);
    setCheckIn(null);
    setActiveGame(null);
    setScreen('welcome');
  };

  const handleReset = () => {
    LS.remove('mindplay_user');
    LS.remove('mindplay_onboarding');
    LS.remove('mindplay_checkin');
    LS.remove('mindplay_daily');
    setUser(null);
    setOnboardingData(null);
    setCheckIn(null);
    setActiveGame(null);
    setSecondsUsed(0);
    setScreen('welcome');
  };

  // ── Routing ───────────────────────────────────────────────────────────────

  if (screen === 'welcome') {
    return (
      <WelcomeScreen
        onGetStarted={() => { setAuthMode('signup'); setScreen('login'); }}
        onLogin={() => { setAuthMode('login'); setScreen('login'); }}
      />
    );
  }

  if (screen === 'login') {
    return (
      <AuthScreen
        mode={authMode}
        onSubmit={handleAuth}
        onToggle={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
        onBack={() => setScreen('welcome')}
      />
    );
  }

  if (screen === 'onboarding') {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  if (screen === 'checkin') {
    return <DailyCheckIn onComplete={handleCheckInComplete} />;
  }

  if (screen === 'home') {
    return (
      <HomeScreen
        user={user}
        checkIn={checkIn}
        timeLimit={timeLimit}
        secondsUsed={secondsUsed}
        onSelectGame={handleSelectGame}
        onLogout={handleLogout}
      />
    );
  }

  if (screen === 'game') {
    // If time is up, show limit screen instead
    if (timeUp) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-sage-50 via-peace-50 to-lavender-50 flex flex-col items-center justify-center p-8 text-center">
          <div className="text-7xl mb-6">⏰</div>
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-3">
            Time's up for today
          </h2>
          <p className="text-gray-600 font-body mb-2">
            You set a {timeLimit}-minute daily limit.
          </p>
          <p className="text-gray-500 font-body text-sm mb-10">
            You kept your promise to yourself. Come back tomorrow.
          </p>
          <button
            onClick={() => setScreen('home')}
            className="px-8 py-4 bg-gradient-to-r from-sage-400 to-peace-400 text-white rounded-3xl font-display font-bold text-lg shadow-soft active:scale-95 transition-transform"
          >
            Go Home
          </button>
        </div>
      );
    }

    const gameProps = {
      onBack: () => { setScreen('home'); setActiveGame(null); },
      onComplete: handleGameComplete,
    };

    if (activeGame === 'wordsearch') return <WordSearch {...gameProps} />;
    if (activeGame === 'crossword') return <Crossword {...gameProps} />;
    if (activeGame === 'finditem') return <FindTheItem {...gameProps} />;
  }

  if (screen === 'done') {
    return (
      <GameComplete
        onPlayAnother={handlePlayAnother}
        onGoHome={() => setScreen('home')}
      />
    );
  }

  // Dev reset button (bottom of welcome/any stuck state)
  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={handleReset}
        className="flex items-center gap-2 text-gray-400 font-body text-sm"
      >
        <RotateCcw className="w-4 h-4" />
        Reset App
      </button>
    </div>
  );
};

export default MindfulGamesApp;
