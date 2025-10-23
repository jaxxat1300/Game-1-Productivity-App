import React, { useState } from 'react';
import { Brain, Sparkles, Trophy, Clock, Zap, Coffee, Target, Heart } from 'lucide-react';

const MindfulGamesApp = () => {
  const [screen, setScreen] = useState('welcome');
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [preferences, setPreferences] = useState({
    reasons: [],
    categories: []
  });

  const reasons = [
    { id: 'transit', label: 'Kill time on transit/appointments', icon: Clock },
    { id: 'work', label: 'Quick break at work', icon: Coffee },
    { id: 'destress', label: 'Destress & unwind', icon: Heart },
    { id: 'focus', label: 'Sharpen focus', icon: Target }
  ];

  const gameCategories = [
    { id: 'word', label: 'Word Puzzles', description: 'Crosswords, word searches' },
    { id: 'logic', label: 'Logic Games', description: 'Sudoku, pattern matching' },
    { id: 'memory', label: 'Memory', description: 'Card matching, sequences' },
    { id: 'strategy', label: 'Strategy', description: 'Chess puzzles, planning games' },
    { id: 'quick', label: 'Quick Games', description: '2-minute brain teasers' },
    { id: 'zen', label: 'Zen Mode', description: 'Relaxing, meditative puzzles' }
  ];

  const handleLogin = () => {
    const mockUser = {
      name: formData.name || 'Player',
      email: formData.email,
      streak: 0,
      gamesPlayed: 0,
      dailyLimit: 4,
      coins: 0
    };
    setUser(mockUser);
    setScreen('onboarding');
  };

  const handleReasonToggle = (reasonId) => {
    setPreferences(prev => ({
      ...prev,
      reasons: prev.reasons.includes(reasonId)
        ? prev.reasons.filter(r => r !== reasonId)
        : [...prev.reasons, reasonId]
    }));
  };

  const handleCategoryToggle = (categoryId) => {
    setPreferences(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(c => c !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const completeOnboarding = () => {
    setScreen('dashboard');
  };

  if (screen === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center shadow-2xl transform rotate-6 transition-transform hover:rotate-12">
                <Brain className="w-20 h-20 text-purple-600" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-300 animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4">MindPlay</h1>
          <p className="text-xl text-purple-100 mb-12 max-w-md mx-auto">
            Your daily dose of mindful gaming. Play, streak, thrive.
          </p>

          <div className="space-y-4 max-w-sm mx-auto">
            <button
              onClick={() => setScreen('signup')}
              className="w-full bg-white text-purple-600 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              Get Started
            </button>
            <button
              onClick={() => setScreen('login')}
              className="w-full bg-purple-500 bg-opacity-30 backdrop-blur text-white py-4 rounded-2xl font-semibold text-lg border-2 border-white border-opacity-30 hover:bg-opacity-40 transition-all"
            >
              Log In
            </button>
          </div>

          <div className="mt-12 flex justify-center gap-8 text-purple-100">
            <div className="text-center">
              <Trophy className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm">Daily Streaks</p>
            </div>
            <div className="text-center">
              <Zap className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm">Earn Coins</p>
            </div>
            <div className="text-center">
              <Brain className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm">Stay Sharp</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'login' || screen === 'signup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              {screen === 'signup' ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-gray-600 mt-2">
              {screen === 'signup' ? 'Start your mindful gaming journey' : 'Continue your streak'}
            </p>
          </div>

          <div className="space-y-4">
            {screen === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-purple-600 text-white py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors shadow-lg"
            >
              {screen === 'signup' ? 'Create Account' : 'Log In'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setScreen(screen === 'login' ? 'signup' : 'login')}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              {screen === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
            </button>
          </div>

          <button
            onClick={() => setScreen('welcome')}
            className="mt-4 text-gray-500 hover:text-gray-700 text-sm w-full"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'onboarding') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-8">
          <div className="mb-8">
            <div className="flex gap-2 mb-6">
              {[0, 1].map((step) => (
                <div
                  key={step}
                  className={`h-2 rounded-full flex-1 transition-colors ${
                    step <= onboardingStep ? 'bg-purple-600' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {onboardingStep === 0 ? 'Why are you here?' : 'Pick your games'}
            </h2>
            <p className="text-gray-600">
              {onboardingStep === 0
                ? 'Help us personalize your experience'
                : 'Choose the types of games you enjoy'}
            </p>
          </div>

          {onboardingStep === 0 ? (
            <div className="space-y-3">
              {reasons.map((reason) => {
                const Icon = reason.icon;
                const isSelected = preferences.reasons.includes(reason.id);
                return (
                  <button
                    key={reason.id}
                    onClick={() => handleReasonToggle(reason.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-purple-600' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <span className="font-medium text-gray-800 text-left">{reason.label}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {gameCategories.map((category) => {
                const isSelected = preferences.categories.includes(category.id);
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryToggle(category.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-800 mb-1">{category.label}</h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-8 flex gap-3">
            {onboardingStep > 0 && (
              <button
                onClick={() => setOnboardingStep(0)}
                className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={() => {
                if (onboardingStep === 0) {
                  setOnboardingStep(1);
                } else {
                  completeOnboarding();
                }
              }}
              disabled={
                (onboardingStep === 0 && preferences.reasons.length === 0) ||
                (onboardingStep === 1 && preferences.categories.length === 0)
              }
              className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {onboardingStep === 0 ? 'Continue' : 'Get Started'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user?.name}!</h1>
                <p className="text-gray-600">Ready for today's games?</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end mb-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span className="text-2xl font-bold text-gray-800">{user?.coins}</span>
                </div>
                <p className="text-sm text-gray-600">Coins</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-purple-50 rounded-xl p-4 text-center">
                <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{user?.streak}</p>
                <p className="text-sm text-gray-600">Day Streak</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <Brain className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{user?.gamesPlayed}/{user?.dailyLimit}</p>
                <p className="text-sm text-gray-600">Games Today</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <Sparkles className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">Active</p>
                <p className="text-sm text-gray-600">Status</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-2">🎉 Keep your streak alive!</h3>
              <p className="text-purple-100 text-sm">Play daily to earn bonus coins and unlock more games.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {preferences.categories.map((catId) => {
              const category = gameCategories.find(c => c.id === catId);
              return (
                <div key={catId} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{category?.label}</h3>
                  <p className="text-gray-600 text-sm mb-4">{category?.description}</p>
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                    Play Now
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default MindfulGamesApp;

