import React, { useState, useEffect } from 'react';
import { Brain, Sparkles, Trophy, Clock, Zap, Coffee, Target, Heart, User, Settings, Award, TrendingUp, Filter, Search, Calendar, Star, Lock } from 'lucide-react';
import { gameLibrary, getMoodRecommendations, getCategoryLabel } from '../data/gameLibrary';
import { achievements, checkAchievement, getAchievementProgress } from '../data/achievements';

const MindfulGamesApp = () => {
  const [screen, setScreen] = useState('welcome');
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [currentMood, setCurrentMood] = useState(null);
  const [moodIntensity, setMoodIntensity] = useState(3);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [profileTab, setProfileTab] = useState('overview');

  const moods = [
    { id: 'happy', label: 'Happy/Energized', emoji: '😊', color: 'bg-sage-400', hoverColor: 'hover:bg-sage-500' },
    { id: 'calm', label: 'Calm/Peaceful', emoji: '😌', color: 'bg-peace-300', hoverColor: 'hover:bg-peace-400' },
    { id: 'stressed', label: 'Stressed/Anxious', emoji: '😰', color: 'bg-coral-400', hoverColor: 'hover:bg-coral-500' },
    { id: 'sad', label: 'Sad/Down', emoji: '😔', color: 'bg-lavender-400', hoverColor: 'hover:bg-lavender-500' },
    { id: 'frustrated', label: 'Frustrated/Angry', emoji: '😤', color: 'bg-coral-500', hoverColor: 'hover:bg-coral-600' },
    { id: 'tired', label: 'Tired/Drained', emoji: '😴', color: 'bg-lavender-300', hoverColor: 'hover:bg-lavender-400' },
    { id: 'unfocused', label: 'Unfocused/Scattered', emoji: '🤔', color: 'bg-yellow-300', hoverColor: 'hover:bg-yellow-400' },
    { id: 'neutral', label: 'Neutral/Okay', emoji: '😐', color: 'bg-sage-300', hoverColor: 'hover:bg-sage-400' },
  ];

  const handleLogin = () => {
    const mockUser = {
      name: formData.name || 'Player',
      email: formData.email,
      streak: 5,
      totalGamesPlayed: 47,
      categoryCounts: {
        word: 15,
        logic: 12,
        memory: 8,
        zen: 20,
        strategy: 7,
        quick: 10,
      },
      dailyLimit: 4,
      gamesPlayedToday: 2,
      coins: 125,
      totalCoinsEarned: 245,
      moodLogs: [],
      unlockedAchievements: ['streak-3'],
      uniqueGamesPlayed: ['word-search', 'sudoku-easy', 'mandala-coloring'],
      avatar: '🎮',
      joinDate: new Date('2024-10-01'),
    };
    setUser(mockUser);
    setScreen('moodCheck');
  };

  const handleMoodSelection = (moodId) => {
    setCurrentMood(moodId);
  };

  const completeMoodCheck = () => {
    if (!currentMood) return;
    
    // Log mood with timestamp
    const moodLog = {
      mood: currentMood,
      intensity: moodIntensity,
      timestamp: new Date(),
    };
    
    setUser(prev => ({
      ...prev,
      moodLogs: [...(prev.moodLogs || []), moodLog],
    }));
    
    setScreen('dashboard');
  };

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getGreetingEmoji = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '🌅';
    if (hour < 18) return '☀️';
    return '🌙';
  };

  const getRecommendedGames = () => {
    if (!currentMood) return [];
    const recommendations = getMoodRecommendations(currentMood, moodIntensity);
    return {
      games: recommendations.games.map(gameId => 
        gameLibrary.find(g => g.id === gameId)
      ).filter(Boolean).slice(0, 3),
      reason: recommendations.reason,
    };
  };

  const filteredGames = gameLibrary.filter(game => {
    const matchesFilter = selectedFilter === 'all' || game.category === selectedFilter;
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getDifficultyDots = (difficulty) => {
    return Array.from({ length: 3 }, (_, i) => (
      <span key={i} className={`text-xs ${i < difficulty ? 'opacity-100' : 'opacity-30'}`}>●</span>
    ));
  };

  const getDailyChallenge = () => {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    return gameLibrary[dayOfYear % gameLibrary.length];
  };

  // Welcome Screen
  if (screen === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-400 via-peace-300 to-lavender-300 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 bg-white rounded-4xl flex items-center justify-center shadow-card transform transition-transform hover:scale-105 animate-float">
                <Brain className="w-20 h-20 text-sage-500" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-coral-400 animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-6xl font-display font-bold text-white mb-4 drop-shadow-lg">MindPlay</h1>
          <p className="text-2xl text-white/90 mb-12 max-w-md mx-auto font-body">
            Your daily dose of mindful gaming. Play, grow, thrive.
          </p>

          <div className="space-y-4 max-w-sm mx-auto">
            <button
              onClick={() => setScreen('signup')}
              className="w-full bg-white text-sage-600 py-4 px-6 rounded-3xl font-display font-semibold text-lg shadow-card hover:shadow-hover hover:scale-105 transition-all duration-300"
            >
              Get Started
            </button>
            <button
              onClick={() => setScreen('login')}
              className="w-full bg-white/20 backdrop-blur-lg text-white py-4 px-6 rounded-3xl font-display font-semibold text-lg border-2 border-white/30 hover:bg-white/30 transition-all duration-300"
            >
              Log In
            </button>
          </div>

          <div className="mt-16 flex justify-center gap-12 text-white/90">
            <div className="text-center transform hover:scale-110 transition-transform">
              <Trophy className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm font-body">Daily Streaks</p>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm font-body">Earn Coins</p>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform">
              <Brain className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm font-body">Stay Sharp</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Login/Signup Screen
  if (screen === 'login' || screen === 'signup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-100 via-peace-50 to-lavender-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-4xl shadow-card p-10 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-sage-400 to-peace-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-soft">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-display font-bold text-gray-800 mb-2">
              {screen === 'signup' ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-gray-600 font-body">
              {screen === 'signup' ? 'Start your mindful gaming journey' : 'Continue your streak'}
            </p>
          </div>

          <div className="space-y-5">
            {screen === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-body">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-sage-400 focus:outline-none transition-colors font-body"
                  placeholder="Your name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-body">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-sage-400 focus:outline-none transition-colors font-body"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-body">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-sage-400 focus:outline-none transition-colors font-body"
                placeholder="••••••••"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-sage-400 to-peace-400 text-white py-4 rounded-2xl font-display font-semibold hover:from-sage-500 hover:to-peace-500 transition-all shadow-soft hover:shadow-card"
            >
              {screen === 'signup' ? 'Create Account' : 'Log In'}
            </button>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setScreen(screen === 'login' ? 'signup' : 'login')}
              className="text-sage-600 hover:text-sage-700 font-medium font-body"
            >
              {screen === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
            </button>
          </div>

          <button
            onClick={() => setScreen('welcome')}
            className="mt-6 text-gray-500 hover:text-gray-700 text-sm w-full font-body"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  // Mood Check-In Screen
  if (screen === 'moodCheck') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-50 via-peace-50 to-lavender-50 p-4 flex items-center justify-center">
        <div className="max-w-3xl w-full bg-white rounded-4xl shadow-card p-10">
          <div className="text-center mb-10">
            <div className="text-6xl mb-4 animate-bounce-soft">💭</div>
            <h2 className="text-4xl font-display font-bold text-gray-800 mb-3">
              How are you feeling today?
            </h2>
            <p className="text-gray-600 text-lg font-body">
              We'll recommend games to match your mood
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {moods.map((mood) => {
              const isSelected = currentMood === mood.id;
              return (
                <button
                  key={mood.id}
                  onClick={() => handleMoodSelection(mood.id)}
                  className={`p-6 rounded-3xl border-3 transition-all duration-300 transform hover:scale-105 ${
                    isSelected
                      ? `${mood.color} border-gray-800 shadow-card scale-105`
                      : `bg-gray-50 border-gray-200 ${mood.hoverColor}`
                  }`}
                >
                  <div className="text-5xl mb-3">{mood.emoji}</div>
                  <div className={`text-sm font-medium text-center font-body ${
                    isSelected ? 'text-white' : 'text-gray-700'
                  }`}>
                    {mood.label}
                  </div>
                </button>
              );
            })}
          </div>

          {currentMood && (
            <div className="mb-8 bg-gradient-to-r from-sage-50 to-peace-50 rounded-3xl p-6">
              <label className="block text-center text-sm font-medium text-gray-700 mb-4 font-body">
                How intense is this feeling?
              </label>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 font-body">Mild</span>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={moodIntensity}
                  onChange={(e) => setMoodIntensity(parseInt(e.target.value))}
                  className="flex-1 h-3 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #8FBC8F 0%, #8FBC8F ${(moodIntensity-1)*25}%, #E5E7EB ${(moodIntensity-1)*25}%, #E5E7EB 100%)`
                  }}
                />
                <span className="text-sm text-gray-500 font-body">Intense</span>
              </div>
              <div className="flex justify-center gap-2 mt-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all ${
                      i < moodIntensity ? 'bg-sage-500 scale-110' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          <button
            onClick={completeMoodCheck}
            disabled={!currentMood}
            className="w-full bg-gradient-to-r from-sage-400 to-peace-400 text-white py-5 rounded-3xl font-display font-semibold text-lg hover:from-sage-500 hover:to-peace-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-soft hover:shadow-card"
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Profile Screen
  if (screen === 'profile') {
    const tabs = [
      { id: 'overview', label: 'Overview', icon: User },
      { id: 'mood', label: 'Mood History', icon: TrendingUp },
      { id: 'achievements', label: 'Achievements', icon: Award },
      { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-50 via-peace-50 to-lavender-50 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-4xl shadow-card p-8 mb-6">
            <button
              onClick={() => setScreen('dashboard')}
              className="text-sage-600 hover:text-sage-700 mb-6 flex items-center gap-2 font-body"
            >
              ← Back to Dashboard
            </button>

            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-sage-400 to-peace-400 rounded-3xl flex items-center justify-center text-5xl shadow-soft">
                {user?.avatar || '🎮'}
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-display font-bold text-gray-800 mb-2">{user?.name}</h1>
                <p className="text-gray-600 font-body">{user?.email}</p>
                <div className="flex gap-4 mt-4">
                  <div className="bg-gradient-to-r from-coral-100 to-coral-200 px-4 py-2 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-coral-600" />
                      <span className="font-display font-bold text-coral-700">{user?.streak} Day Streak</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 px-4 py-2 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-600" />
                      <span className="font-display font-bold text-yellow-700">{user?.coins} Coins</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mt-8 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setProfileTab(tab.id)}
                    className={`px-6 py-3 rounded-2xl font-display font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                      profileTab === tab.id
                        ? 'bg-gradient-to-r from-sage-400 to-peace-400 text-white shadow-soft'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-4xl shadow-card p-8">
            {profileTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-display font-bold text-gray-800 mb-6">Your Stats</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-sage-50 to-sage-100 rounded-3xl p-6 text-center">
                    <div className="text-4xl font-display font-bold text-sage-600 mb-2">{user?.totalGamesPlayed}</div>
                    <div className="text-gray-600 font-body">Games Played</div>
                  </div>
                  <div className="bg-gradient-to-br from-peace-50 to-peace-100 rounded-3xl p-6 text-center">
                    <div className="text-4xl font-display font-bold text-peace-600 mb-2">{user?.totalCoinsEarned}</div>
                    <div className="text-gray-600 font-body">Total Coins Earned</div>
                  </div>
                  <div className="bg-gradient-to-br from-lavender-50 to-lavender-100 rounded-3xl p-6 text-center">
                    <div className="text-4xl font-display font-bold text-lavender-600 mb-2">{user?.unlockedAchievements?.length || 0}</div>
                    <div className="text-gray-600 font-body">Achievements</div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-display font-bold text-gray-800 mb-4">Category Breakdown</h3>
                  <div className="space-y-3">
                    {Object.entries(user?.categoryCounts || {}).map(([category, count]) => (
                      <div key={category} className="flex items-center gap-4">
                        <div className="w-32 font-body text-gray-700">{getCategoryLabel(category)}</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-sage-400 to-peace-400 h-full rounded-full transition-all duration-500"
                            style={{ width: `${(count / user.totalGamesPlayed) * 100}%` }}
                          />
                        </div>
                        <div className="w-12 text-right font-display font-bold text-gray-700">{count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {profileTab === 'mood' && (
              <div>
                <h2 className="text-2xl font-display font-bold text-gray-800 mb-6">Mood History</h2>
                <div className="bg-gradient-to-br from-sage-50 to-lavender-50 rounded-3xl p-8 text-center">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-sage-500" />
                  <p className="text-gray-600 font-body">Your mood tracking journey will appear here</p>
                  <p className="text-sm text-gray-500 mt-2 font-body">Keep logging your moods to see patterns and insights</p>
                </div>
              </div>
            )}

            {profileTab === 'achievements' && (
              <div>
                <h2 className="text-2xl font-display font-bold text-gray-800 mb-6">Achievements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => {
                    const isUnlocked = user?.unlockedAchievements?.includes(achievement.id);
                    const progress = getAchievementProgress(achievement, user || {});
                    
                    return (
                      <div
                        key={achievement.id}
                        className={`rounded-3xl p-6 transition-all ${
                          isUnlocked
                            ? 'bg-gradient-to-br from-sage-100 to-peace-100 border-2 border-sage-300'
                            : 'bg-gray-50 border-2 border-gray-200'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`text-4xl ${isUnlocked ? 'grayscale-0' : 'grayscale opacity-50'}`}>
                            {isUnlocked ? achievement.icon : <Lock className="w-10 h-10 text-gray-400" />}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-display font-bold text-gray-800 mb-1">{achievement.name}</h3>
                            <p className="text-sm text-gray-600 mb-3 font-body">{achievement.description}</p>
                            {!isUnlocked && (
                              <div>
                                <div className="flex justify-between text-xs text-gray-500 mb-1 font-body">
                                  <span>{progress.current} / {progress.total}</span>
                                  <span>{Math.floor(progress.percentage)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-sage-400 to-peace-400 h-full rounded-full transition-all duration-500"
                                    style={{ width: `${progress.percentage}%` }}
                                  />
                                </div>
                              </div>
                            )}
                            {isUnlocked && (
                              <div className="flex items-center gap-2 text-sage-600">
                                <Zap className="w-4 h-4" />
                                <span className="text-sm font-display font-semibold">+{achievement.reward} coins</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {profileTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-display font-bold text-gray-800 mb-6">Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div>
                      <div className="font-display font-medium text-gray-800">Daily Reminders</div>
                      <div className="text-sm text-gray-600 font-body">Get notified to play daily</div>
                    </div>
                    <div className="w-12 h-6 bg-sage-400 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div>
                      <div className="font-display font-medium text-gray-800">Theme</div>
                      <div className="text-sm text-gray-600 font-body">Light mode</div>
                    </div>
                    <button className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl font-body text-sm">
                      Change
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Screen
  if (screen === 'dashboard') {
    const recommended = getRecommendedGames();
    const dailyChallenge = getDailyChallenge();

    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-50 via-peace-50 to-lavender-50 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Top Section */}
          <div className="bg-white rounded-4xl shadow-card p-8 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div>
                <h1 className="text-4xl font-display font-bold text-gray-800 mb-2">
                  {getTimeGreeting()}, {user?.name}! {getGreetingEmoji()}
                </h1>
                <p className="text-gray-600 font-body">Ready for today's games?</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setScreen('profile')}
                  className="px-6 py-3 bg-gradient-to-r from-sage-100 to-peace-100 text-sage-700 rounded-2xl font-display font-medium hover:from-sage-200 hover:to-peace-200 transition-all shadow-soft flex items-center gap-2"
                >
                  <User className="w-5 h-5" />
                  Profile
                </button>
                <button
                  onClick={() => setScreen('moodCheck')}
                  className="px-6 py-3 bg-gradient-to-r from-coral-100 to-coral-200 text-coral-700 rounded-2xl font-display font-medium hover:from-coral-200 hover:to-coral-300 transition-all shadow-soft flex items-center gap-2"
                >
                  <Heart className="w-5 h-5" />
                  Update Mood
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-coral-100 to-coral-200 rounded-3xl p-5 text-center transform hover:scale-105 transition-transform">
                <Trophy className="w-10 h-10 text-coral-600 mx-auto mb-2" />
                <p className="text-3xl font-display font-bold text-coral-700 mb-1">{user?.streak}</p>
                <p className="text-sm text-coral-600 font-body">Day Streak 🔥</p>
              </div>
              <div className="bg-gradient-to-br from-peace-100 to-peace-200 rounded-3xl p-5 text-center transform hover:scale-105 transition-transform">
                <Brain className="w-10 h-10 text-peace-600 mx-auto mb-2" />
                <p className="text-3xl font-display font-bold text-peace-700 mb-1">{user?.gamesPlayedToday}/{user?.dailyLimit}</p>
                <p className="text-sm text-peace-600 font-body">Games Today</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-3xl p-5 text-center transform hover:scale-105 transition-transform">
                <Zap className="w-10 h-10 text-yellow-600 mx-auto mb-2" />
                <p className="text-3xl font-display font-bold text-yellow-700 mb-1">{user?.coins}</p>
                <p className="text-sm text-yellow-600 font-body">Coins</p>
              </div>
              <div className="bg-gradient-to-br from-lavender-100 to-lavender-200 rounded-3xl p-5 text-center transform hover:scale-105 transition-transform">
                <div className="text-3xl mb-2">{moods.find(m => m.id === currentMood)?.emoji || '😊'}</div>
                <p className="text-sm text-lavender-700 font-display font-bold mb-1">Feeling</p>
                <p className="text-xs text-lavender-600 font-body">{moods.find(m => m.id === currentMood)?.label || 'Good'}</p>
              </div>
            </div>
          </div>

          {/* Recommended Games */}
          {recommended.games.length > 0 && (
            <div className="bg-white rounded-4xl shadow-card p-8 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-6 h-6 text-sage-500" />
                <h2 className="text-2xl font-display font-bold text-gray-800">
                  Recommended for You
                </h2>
              </div>
              <p className="text-gray-600 mb-6 font-body">{recommended.reason}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommended.games.map((game) => (
                  <div
                    key={game.id}
                    className="bg-gradient-to-br from-sage-50 to-peace-50 rounded-3xl p-6 hover:shadow-card transition-all cursor-pointer transform hover:scale-105 border-2 border-sage-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 ${game.color} rounded-2xl flex items-center justify-center text-2xl shadow-soft`}>
                        {game.icon}
                      </div>
                      <div className="flex gap-1">
                        {getDifficultyDots(game.difficulty)}
                      </div>
                    </div>
                    <h3 className="text-xl font-display font-bold text-gray-800 mb-2">{game.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 font-body">{game.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 flex items-center gap-1 font-body">
                        <Clock className="w-4 h-4" />
                        {game.estimatedTime}
                      </span>
                      <button className="px-4 py-2 bg-gradient-to-r from-sage-400 to-peace-400 text-white rounded-xl font-display font-medium hover:from-sage-500 hover:to-peace-500 transition-all shadow-soft">
                        Play
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Daily Challenge */}
          <div className="bg-gradient-to-r from-coral-400 to-coral-500 rounded-4xl shadow-card p-8 mb-6 text-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-3xl">
                  ⭐
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold mb-1">Daily Challenge</h3>
                  <p className="text-coral-100 font-body">{dailyChallenge?.name} • Bonus +10 coins</p>
                </div>
              </div>
              <button className="px-8 py-4 bg-white text-coral-600 rounded-2xl font-display font-bold hover:bg-coral-50 transition-all shadow-soft">
                Start Challenge
              </button>
            </div>
          </div>

          {/* Game Library */}
          <div className="bg-white rounded-4xl shadow-card p-8">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h2 className="text-2xl font-display font-bold text-gray-800">Game Library</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-2xl focus:border-sage-400 focus:outline-none font-body"
                  />
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {['all', 'word', 'logic', 'memory', 'zen', 'strategy', 'quick'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-5 py-2 rounded-2xl font-display font-medium whitespace-nowrap transition-all ${
                    selectedFilter === filter
                      ? 'bg-gradient-to-r from-sage-400 to-peace-400 text-white shadow-soft'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter === 'all' ? 'All Games' : getCategoryLabel(filter)}
                </button>
              ))}
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGames.map((game) => (
                <div
                  key={game.id}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-6 hover:shadow-card transition-all cursor-pointer transform hover:scale-105 border-2 border-gray-200 hover:border-sage-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 ${game.color} rounded-2xl flex items-center justify-center text-2xl shadow-soft`}>
                      {game.icon}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex gap-1">
                        {getDifficultyDots(game.difficulty)}
                      </div>
                      <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-lg font-body">
                        {getCategoryLabel(game.category)}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-display font-bold text-gray-800 mb-2">{game.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 font-body line-clamp-2">{game.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {game.moodTags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs bg-sage-100 text-sage-700 px-2 py-1 rounded-lg font-body">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 flex items-center gap-1 font-body">
                      <Clock className="w-4 h-4" />
                      {game.estimatedTime}
                    </span>
                    <button className="px-4 py-2 bg-gradient-to-r from-sage-400 to-peace-400 text-white rounded-xl font-display font-medium hover:from-sage-500 hover:to-peace-500 transition-all shadow-soft">
                      Play
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredGames.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 font-body">No games found matching your search</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default MindfulGamesApp;
