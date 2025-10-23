export const achievements = [
  {
    id: 'streak-3',
    name: '3-Day Starter',
    description: 'Maintain a 3-day streak',
    icon: '🔥',
    requirement: { type: 'streak', value: 3 },
    reward: 10,
  },
  {
    id: 'streak-7',
    name: '7-Day Warrior',
    description: 'Maintain a 7-day streak',
    icon: '⚔️',
    requirement: { type: 'streak', value: 7 },
    reward: 25,
  },
  {
    id: 'streak-14',
    name: '2-Week Champion',
    description: 'Maintain a 14-day streak',
    icon: '🏆',
    requirement: { type: 'streak', value: 14 },
    reward: 50,
  },
  {
    id: 'streak-30',
    name: 'Monthly Master',
    description: 'Maintain a 30-day streak',
    icon: '👑',
    requirement: { type: 'streak', value: 30 },
    reward: 100,
  },
  {
    id: 'zen-master',
    name: 'Zen Master',
    description: 'Complete 50 zen games',
    icon: '🧘',
    requirement: { type: 'category', category: 'zen', value: 50 },
    reward: 30,
  },
  {
    id: 'word-wizard',
    name: 'Word Wizard',
    description: 'Complete 100 word games',
    icon: '📚',
    requirement: { type: 'category', category: 'word', value: 100 },
    reward: 40,
  },
  {
    id: 'logic-legend',
    name: 'Logic Legend',
    description: 'Complete 75 logic games',
    icon: '🧠',
    requirement: { type: 'category', category: 'logic', value: 75 },
    reward: 35,
  },
  {
    id: 'memory-master',
    name: 'Memory Master',
    description: 'Complete 50 memory games',
    icon: '🎴',
    requirement: { type: 'category', category: 'memory', value: 50 },
    reward: 30,
  },
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'Play before 9 AM, 10 times',
    icon: '🌅',
    requirement: { type: 'time', condition: 'before', hour: 9, value: 10 },
    reward: 20,
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'Play after 9 PM, 10 times',
    icon: '🦉',
    requirement: { type: 'time', condition: 'after', hour: 21, value: 10 },
    reward: 20,
  },
  {
    id: 'game-collector',
    name: 'Game Collector',
    description: 'Try all game types',
    icon: '🎮',
    requirement: { type: 'unique_games', value: 20 },
    reward: 50,
  },
  {
    id: 'centurion',
    name: 'Centurion',
    description: 'Play 100 total games',
    icon: '💯',
    requirement: { type: 'total_games', value: 100 },
    reward: 40,
  },
  {
    id: 'daily-dedication',
    name: 'Daily Dedication',
    description: 'Complete daily challenge 7 times',
    icon: '📅',
    requirement: { type: 'daily_challenges', value: 7 },
    reward: 35,
  },
  {
    id: 'mood-tracker',
    name: 'Mood Tracker',
    description: 'Log your mood 20 times',
    icon: '😊',
    requirement: { type: 'mood_logs', value: 20 },
    reward: 25,
  },
  {
    id: 'coin-collector',
    name: 'Coin Collector',
    description: 'Earn 500 total coins',
    icon: '💰',
    requirement: { type: 'total_coins', value: 500 },
    reward: 50,
  },
];

export const checkAchievement = (achievement, userStats) => {
  const { requirement } = achievement;
  
  switch (requirement.type) {
    case 'streak':
      return userStats.streak >= requirement.value;
    
    case 'category':
      return (userStats.categoryCounts?.[requirement.category] || 0) >= requirement.value;
    
    case 'time':
      return (userStats.timeCounts?.[achievement.id] || 0) >= requirement.value;
    
    case 'unique_games':
      return (userStats.uniqueGamesPlayed?.length || 0) >= requirement.value;
    
    case 'total_games':
      return userStats.totalGamesPlayed >= requirement.value;
    
    case 'daily_challenges':
      return (userStats.dailyChallengesCompleted || 0) >= requirement.value;
    
    case 'mood_logs':
      return (userStats.moodLogs?.length || 0) >= requirement.value;
    
    case 'total_coins':
      return userStats.totalCoinsEarned >= requirement.value;
    
    default:
      return false;
  }
};

export const getAchievementProgress = (achievement, userStats) => {
  const { requirement } = achievement;
  let current = 0;
  
  switch (requirement.type) {
    case 'streak':
      current = userStats.streak;
      break;
    case 'category':
      current = userStats.categoryCounts?.[requirement.category] || 0;
      break;
    case 'time':
      current = userStats.timeCounts?.[achievement.id] || 0;
      break;
    case 'unique_games':
      current = userStats.uniqueGamesPlayed?.length || 0;
      break;
    case 'total_games':
      current = userStats.totalGamesPlayed;
      break;
    case 'daily_challenges':
      current = userStats.dailyChallengesCompleted || 0;
      break;
    case 'mood_logs':
      current = userStats.moodLogs?.length || 0;
      break;
    case 'total_coins':
      current = userStats.totalCoinsEarned;
      break;
  }
  
  return {
    current,
    total: requirement.value,
    percentage: Math.min((current / requirement.value) * 100, 100),
  };
};

