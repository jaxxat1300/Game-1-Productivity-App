import React, { useState, useEffect } from 'react';
import { Brain, Sparkles, Trophy, Clock, Zap, Coffee, Target, Heart, User, Settings, Award, TrendingUp, Filter, Search, Calendar, Star, Lock, Home, ArrowLeft, Plus } from 'lucide-react';
import { gameLibrary, getMoodRecommendations, getCategoryLabel } from '../data/gameLibrary';
import { achievements, checkAchievement, getAchievementProgress } from '../data/achievements';
import MobileNav from './MobileNav';
import SwipeableCard from './SwipeableCard';

const MindfulGamesApp = () => {
  const [screen, setScreen] = useState('welcome');
  const [mobileTab, setMobileTab] = useState('dashboard');
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
    { id: 'happy', label: 'Happy', emoji: '😊', color: 'bg-sage-400', hoverColor: 'hover:bg-sage-500' },
    { id: 'calm', label: 'Calm', emoji: '😌', color: 'bg-peace-300', hoverColor: 'hover:bg-peace-400' },
    { id: 'stressed', label: 'Stressed', emoji: '😰', color: 'bg-coral-400', hoverColor: 'hover:bg-coral-500' },
    { id: 'sad', label: 'Sad', emoji: '😔', color: 'bg-lavender-400', hoverColor: 'hover:bg-lavender-500' },
    { id: 'frustrated', label: 'Frustrated', emoji: '😤', color: 'bg-coral-500', hoverColor: 'hover:bg-coral-600' },
    { id: 'tired', label: 'Tired', emoji: '😴', color: 'bg-lavender-300', hoverColor: 'hover:bg-lavender-400' },
    { id: 'unfocused', label: 'Unfocused', emoji: '🤔', color: 'bg-yellow-300', hoverColor: 'hover:bg-yellow-400' },
    { id: 'neutral', label: 'Okay', emoji: '😐', color: 'bg-sage-300', hoverColor: 'hover:bg-sage-400' },
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
    
    const moodLog = {
      mood: currentMood,
      intensity: moodIntensity,
      timestamp: new Date(),
    };
    
    setUser(prev => ({
      ...prev,
      moodLogs: [...(prev.moodLogs || []), moodLog],
    }));
    
    setScreen('main');
    setMobileTab('dashboard');
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
    if (!currentMood) return { games: [], reason: '' };
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
      <div className="h-screen bg-gradient-to-br from-sage-400 via-peace-300 to-lavender-300 flex items-center justify-center p-6">
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
          <p className="text-lg text-white/90 mb-16 font-body px-4">
            Your daily dose of mindful gaming
          </p>

          <div className="space-y-4 px-6">
            <button
              onClick={() => setScreen('signup')}
              className="w-full bg-white text-sage-600 py-5 px-6 rounded-3xl font-display font-bold text-lg shadow-card active:scale-95 transition-transform"
            >
              Get Started
            </button>
            <button
              onClick={() => setScreen('login')}
              className="w-full bg-white/20 backdrop-blur-lg text-white py-5 px-6 rounded-3xl font-display font-semibold text-lg border-2 border-white/30 active:scale-95 transition-transform"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Login/Signup Screen
  if (screen === 'login' || screen === 'signup') {
    return (
      <div className="h-screen bg-gradient-to-br from-sage-100 via-peace-50 to-lavender-50 flex items-center justify-center p-6 overflow-auto">
        <div className="bg-white rounded-4xl shadow-card p-8 w-full max-w-md my-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-sage-400 to-peace-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-soft">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-2">
              {screen === 'signup' ? 'Create Account' : 'Welcome Back'}
            </h2>
          </div>

          <div className="space-y-4">
            {screen === 'signup' && (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-sage-400 focus:outline-none font-body text-lg"
                placeholder="Your name"
              />
            )}

            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-sage-400 focus:outline-none font-body text-lg"
              placeholder="Email"
            />

            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-sage-400 focus:outline-none font-body text-lg"
              placeholder="Password"
            />

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-sage-400 to-peace-400 text-white py-5 rounded-3xl font-display font-bold text-lg active:scale-95 transition-transform shadow-soft mt-6"
            >
              {screen === 'signup' ? 'Create Account' : 'Log In'}
            </button>
          </div>

          <button
            onClick={() => setScreen(screen === 'login' ? 'signup' : 'login')}
            className="mt-8 text-sage-600 font-medium font-body w-full text-center"
          >
            {screen === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
          </button>

          <button
            onClick={() => setScreen('welcome')}
            className="mt-4 text-gray-500 text-sm w-full font-body flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </div>
    );
  }

  // Mood Check-In Screen
  if (screen === 'moodCheck') {
    return (
      <div className="h-screen bg-gradient-to-br from-sage-50 via-peace-50 to-lavender-50 flex items-center justify-center p-6 overflow-auto">
        <div className="w-full max-w-2xl bg-white rounded-4xl shadow-card p-8 my-auto">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bounce-soft">💭</div>
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-3">
              How are you feeling?
            </h2>
            <p className="text-gray-600 font-body">
              We'll recommend games to match your mood
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8">
            {moods.map((mood) => {
              const isSelected = currentMood === mood.id;
              return (
                <button
                  key={mood.id}
                  onClick={() => handleMoodSelection(mood.id)}
                  className={`p-6 rounded-3xl border-3 transition-all active:scale-95 ${
                    isSelected
                      ? `${mood.color} border-gray-800 shadow-card scale-105`
                      : `bg-gray-50 border-gray-200 active:bg-gray-100`
                  }`}
                >
                  <div className="text-5xl mb-2">{mood.emoji}</div>
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
                How intense?
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={moodIntensity}
                onChange={(e) => setMoodIntensity(parseInt(e.target.value))}
                className="w-full h-3 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #8FBC8F 0%, #8FBC8F ${(moodIntensity-1)*25}%, #E5E7EB ${(moodIntensity-1)*25}%, #E5E7EB 100%)`
                }}
              />
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
            className="w-full bg-gradient-to-r from-sage-400 to-peace-400 text-white py-5 rounded-3xl font-display font-bold text-lg active:scale-95 transition-transform disabled:opacity-50 disabled:active:scale-100 shadow-soft"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // Main App with Mobile Navigation
  if (screen === 'main') {
    const recommended = getRecommendedGames();
    const dailyChallenge = getDailyChallenge();

    // Dashboard Tab
    if (mobileTab === 'dashboard') {
      return (
        <div className="h-screen bg-gradient-to-br from-sage-50 via-peace-50 to-lavender-50 flex flex-col">
          <div className="flex-1 overflow-auto pb-20">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-10 px-6 pt-8 pb-6">
              <h1 className="text-3xl font-display font-bold text-gray-800 mb-1">
                {getTimeGreeting()} {getGreetingEmoji()}
              </h1>
              <p className="text-gray-600 font-body">{user?.name}</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-coral-100 to-coral-200 rounded-3xl p-5 text-center active:scale-95 transition-transform">
                  <Trophy className="w-8 h-8 text-coral-600 mx-auto mb-2" />
                  <p className="text-3xl font-display font-bold text-coral-700">{user?.streak}</p>
                  <p className="text-xs text-coral-600 font-body">Day Streak</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-3xl p-5 text-center active:scale-95 transition-transform">
                  <Zap className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-3xl font-display font-bold text-yellow-700">{user?.coins}</p>
                  <p className="text-xs text-yellow-600 font-body">Coins</p>
                </div>
                <div className="bg-gradient-to-br from-peace-100 to-peace-200 rounded-3xl p-5 text-center active:scale-95 transition-transform">
                  <Brain className="w-8 h-8 text-peace-600 mx-auto mb-2" />
                  <p className="text-2xl font-display font-bold text-peace-700">{user?.gamesPlayedToday}/{user?.dailyLimit}</p>
                  <p className="text-xs text-peace-600 font-body">Today</p>
                </div>
                <button
                  onClick={() => setScreen('moodCheck')}
                  className="bg-gradient-to-br from-lavender-100 to-lavender-200 rounded-3xl p-5 text-center active:scale-95 transition-transform"
                >
                  <div className="text-3xl mb-2">{moods.find(m => m.id === currentMood)?.emoji || '😊'}</div>
                  <p className="text-xs text-lavender-700 font-display font-bold">Update Mood</p>
                </button>
              </div>

              {/* Daily Challenge */}
              <div className="bg-gradient-to-r from-coral-400 to-coral-500 rounded-4xl p-6 text-white shadow-card active:scale-95 transition-transform">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-2xl">
                    ⭐
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-bold">Daily Challenge</h3>
                    <p className="text-coral-100 text-sm font-body">{dailyChallenge?.name}</p>
                  </div>
                </div>
                <button className="w-full bg-white text-coral-600 rounded-2xl py-3 font-display font-bold active:scale-95 transition-transform">
                  +10 Coins • Play Now
                </button>
              </div>

              {/* Recommended */}
              {recommended.games.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-sage-500" />
                    <h2 className="text-xl font-display font-bold text-gray-800">For You</h2>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 font-body">{recommended.reason}</p>
                  
                  <div className="space-y-3">
                    {recommended.games.map((game) => (
                      <div
                        key={game.id}
                        className="bg-white rounded-3xl p-5 shadow-soft active:scale-95 transition-transform flex items-center gap-4"
                      >
                        <div className={`w-16 h-16 ${game.color} rounded-2xl flex items-center justify-center text-3xl shadow-soft flex-shrink-0`}>
                          {game.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-display font-bold text-gray-800 truncate">{game.name}</h3>
                          <p className="text-sm text-gray-600 font-body flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {game.estimatedTime}
                          </p>
                        </div>
                        <button className="px-5 py-2 bg-gradient-to-r from-sage-400 to-peace-400 text-white rounded-xl font-display font-medium active:scale-95 transition-transform flex-shrink-0">
                          Play
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <MobileNav activeTab={mobileTab} onTabChange={setMobileTab} />
        </div>
      );
    }

    // Games Tab
    if (mobileTab === 'games') {
      return (
        <div className="h-screen bg-gradient-to-br from-sage-50 via-peace-50 to-lavender-50 flex flex-col">
          <div className="flex-1 overflow-auto pb-20">
            <div className="bg-white shadow-sm sticky top-0 z-10 px-6 pt-8 pb-4">
              <h1 className="text-3xl font-display font-bold text-gray-800 mb-4">All Games</h1>
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-sage-400 focus:outline-none font-body text-lg"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6">
                {['all', 'word', 'logic', 'memory', 'zen', 'strategy', 'quick'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-2 rounded-2xl font-display font-medium whitespace-nowrap transition-all active:scale-95 ${
                      selectedFilter === filter
                        ? 'bg-gradient-to-r from-sage-400 to-peace-400 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {filter === 'all' ? 'All' : getCategoryLabel(filter)}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 space-y-3">
              {filteredGames.map((game) => (
                <div
                  key={game.id}
                  className="bg-white rounded-3xl p-5 shadow-soft active:scale-95 transition-transform"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div className={`w-14 h-14 ${game.color} rounded-2xl flex items-center justify-center text-2xl shadow-soft flex-shrink-0`}>
                      {game.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-display font-bold text-gray-800">{game.name}</h3>
                      <p className="text-sm text-gray-600 font-body line-clamp-2">{game.description}</p>
                    </div>
                    <div className="flex gap-1">
                      {getDifficultyDots(game.difficulty)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 flex items-center gap-1 font-body">
                      <Clock className="w-4 h-4" />
                      {game.estimatedTime}
                    </span>
                    <button className="px-6 py-2 bg-gradient-to-r from-sage-400 to-peace-400 text-white rounded-xl font-display font-medium active:scale-95 transition-transform">
                      Play
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <MobileNav activeTab={mobileTab} onTabChange={setMobileTab} />
        </div>
      );
    }

    // Mood Tab
    if (mobileTab === 'mood') {
      return (
        <div className="h-screen bg-gradient-to-br from-sage-50 via-peace-50 to-lavender-50 flex flex-col">
          <div className="flex-1 overflow-auto pb-20">
            <div className="bg-white shadow-sm px-6 pt-8 pb-6">
              <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">Mood Tracker</h1>
              <p className="text-gray-600 font-body">Track how you feel over time</p>
            </div>

            <div className="p-6 space-y-6">
              <button
                onClick={() => setScreen('moodCheck')}
                className="w-full bg-gradient-to-r from-sage-400 to-peace-400 text-white rounded-3xl p-6 shadow-card active:scale-95 transition-transform"
              >
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Heart className="w-6 h-6" />
                  <span className="text-xl font-display font-bold">Log Your Mood</span>
                </div>
                <p className="text-white/80 text-sm font-body">How are you feeling right now?</p>
              </button>

              <div className="bg-white rounded-4xl p-6 shadow-soft">
                <h2 className="text-xl font-display font-bold text-gray-800 mb-4">Current Mood</h2>
                <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-sage-50 to-peace-50 rounded-3xl">
                  <div className="text-5xl">{moods.find(m => m.id === currentMood)?.emoji || '😊'}</div>
                  <div>
                    <p className="text-lg font-display font-bold text-gray-800">
                      {moods.find(m => m.id === currentMood)?.label || 'Happy'}
                    </p>
                    <p className="text-sm text-gray-600 font-body">Intensity: {moodIntensity}/5</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-4xl p-6 shadow-soft text-center">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-sage-400" />
                <h3 className="text-lg font-display font-bold text-gray-800 mb-2">Mood History</h3>
                <p className="text-gray-600 text-sm font-body">Keep logging to see patterns and insights</p>
              </div>
            </div>
          </div>
          <MobileNav activeTab={mobileTab} onTabChange={setMobileTab} />
        </div>
      );
    }

    // Achievements Tab
    if (mobileTab === 'achievements') {
      return (
        <div className="h-screen bg-gradient-to-br from-sage-50 via-peace-50 to-lavender-50 flex flex-col">
          <div className="flex-1 overflow-auto pb-20">
            <div className="bg-white shadow-sm px-6 pt-8 pb-6">
              <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">Achievements</h1>
              <p className="text-gray-600 font-body">{user?.unlockedAchievements?.length || 0} of {achievements.length} unlocked</p>
            </div>

            <div className="p-6 space-y-3">
              {achievements.map((achievement) => {
                const isUnlocked = user?.unlockedAchievements?.includes(achievement.id);
                const progress = getAchievementProgress(achievement, user || {});
                
                return (
                  <div
                    key={achievement.id}
                    className={`rounded-3xl p-5 transition-all active:scale-95 ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-sage-100 to-peace-100 border-2 border-sage-300'
                        : 'bg-white border-2 border-gray-200'
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
                                className="bg-gradient-to-r from-sage-400 to-peace-400 h-full rounded-full transition-all"
                                style={{ width: `${progress.percentage}%` }}
                              />
                            </div>
                          </div>
                        )}
                        {isUnlocked && (
                          <div className="flex items-center gap-2 text-sage-600">
                            <Zap className="w-4 h-4" />
                            <span className="text-sm font-display font-semibold">+{achievement.reward} coins earned</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <MobileNav activeTab={mobileTab} onTabChange={setMobileTab} />
        </div>
      );
    }

    // Profile Tab
    if (mobileTab === 'profile') {
      return (
        <div className="h-screen bg-gradient-to-br from-sage-50 via-peace-50 to-lavender-50 flex flex-col">
          <div className="flex-1 overflow-auto pb-20">
            <div className="bg-white shadow-sm px-6 pt-8 pb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-sage-400 to-peace-400 rounded-3xl flex items-center justify-center text-4xl shadow-soft">
                  {user?.avatar || '🎮'}
                </div>
                <div>
                  <h1 className="text-2xl font-display font-bold text-gray-800">{user?.name}</h1>
                  <p className="text-gray-600 font-body text-sm">{user?.email}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-1 bg-gradient-to-r from-coral-100 to-coral-200 px-4 py-3 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-coral-600" />
                    <span className="font-display font-bold text-coral-700">{user?.streak} Days</span>
                  </div>
                </div>
                <div className="flex-1 bg-gradient-to-r from-yellow-100 to-yellow-200 px-4 py-3 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-600" />
                    <span className="font-display font-bold text-yellow-700">{user?.coins} Coins</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-white rounded-4xl p-6 shadow-soft">
                <h2 className="text-xl font-display font-bold text-gray-800 mb-4">Stats</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-sage-50 to-sage-100 rounded-3xl p-4 text-center">
                    <div className="text-3xl font-display font-bold text-sage-600 mb-1">{user?.totalGamesPlayed}</div>
                    <div className="text-sm text-gray-600 font-body">Games</div>
                  </div>
                  <div className="bg-gradient-to-br from-peace-50 to-peace-100 rounded-3xl p-4 text-center">
                    <div className="text-3xl font-display font-bold text-peace-600 mb-1">{user?.totalCoinsEarned}</div>
                    <div className="text-sm text-gray-600 font-body">Earned</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-4xl p-6 shadow-soft">
                <h3 className="text-lg font-display font-bold text-gray-800 mb-4">Settings</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl active:scale-95 transition-transform">
                    <span className="font-body text-gray-800">Notifications</span>
                    <div className="w-12 h-6 bg-sage-400 rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </button>
                  <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl active:scale-95 transition-transform">
                    <span className="font-body text-gray-800">Theme</span>
                    <span className="text-sm text-gray-500 font-body">Light</span>
                  </button>
                  <button 
                    onClick={() => setScreen('welcome')}
                    className="w-full p-4 bg-red-50 text-red-600 rounded-2xl font-body active:scale-95 transition-transform"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>
          <MobileNav activeTab={mobileTab} onTabChange={setMobileTab} />
        </div>
      );
    }
  }

  return null;
};

export default MindfulGamesApp;
