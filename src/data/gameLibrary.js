export const gameLibrary = [
  // Word Games
  {
    id: 'daily-crossword',
    name: 'Daily Crossword',
    category: 'word',
    description: 'Classic crossword puzzles with daily challenges',
    difficulty: 2,
    estimatedTime: '10min',
    moodTags: ['focusing', 'challenging', 'satisfying'],
    icon: '📰',
    color: 'bg-sage-400',
  },
  {
    id: 'word-search',
    name: 'Word Search',
    category: 'word',
    description: 'Find hidden words in the grid',
    difficulty: 1,
    estimatedTime: '5min',
    moodTags: ['calming', 'focusing', 'easy'],
    icon: '🔍',
    color: 'bg-sage-300',
  },
  {
    id: 'anagrams',
    name: 'Anagrams',
    category: 'word',
    description: 'Unscramble letters to form words',
    difficulty: 2,
    estimatedTime: '5min',
    moodTags: ['energizing', 'challenging', 'quick'],
    icon: '🔤',
    color: 'bg-sage-400',
  },
  {
    id: 'word-connect',
    name: 'Word Connect',
    category: 'word',
    description: 'Connect letters to create words',
    difficulty: 2,
    estimatedTime: '5min',
    moodTags: ['energizing', 'satisfying', 'focusing'],
    icon: '🔗',
    color: 'bg-sage-400',
  },

  // Logic & Puzzle
  {
    id: 'sudoku-easy',
    name: 'Sudoku (Easy)',
    category: 'logic',
    description: 'Classic number puzzle - beginner friendly',
    difficulty: 1,
    estimatedTime: '5min',
    moodTags: ['focusing', 'calming', 'logical'],
    icon: '🔢',
    color: 'bg-peace-300',
  },
  {
    id: 'sudoku-medium',
    name: 'Sudoku (Medium)',
    category: 'logic',
    description: 'Classic number puzzle - moderate challenge',
    difficulty: 2,
    estimatedTime: '10min',
    moodTags: ['focusing', 'challenging', 'logical'],
    icon: '🧩',
    color: 'bg-peace-400',
  },
  {
    id: 'nonogram',
    name: 'Nonogram',
    category: 'logic',
    description: 'Reveal pictures by solving number clues',
    difficulty: 2,
    estimatedTime: '10min',
    moodTags: ['satisfying', 'focusing', 'creative'],
    icon: '🎨',
    color: 'bg-peace-300',
  },
  {
    id: 'pattern-match',
    name: 'Pattern Matching',
    category: 'logic',
    description: 'Find and complete visual patterns',
    difficulty: 2,
    estimatedTime: '5min',
    moodTags: ['focusing', 'energizing', 'quick'],
    icon: '🔷',
    color: 'bg-peace-400',
  },
  {
    id: '2048-tiles',
    name: '2048 Tile Game',
    category: 'logic',
    description: 'Combine tiles to reach 2048',
    difficulty: 2,
    estimatedTime: '5min',
    moodTags: ['energizing', 'challenging', 'addictive'],
    icon: '🎯',
    color: 'bg-peace-400',
  },

  // Memory
  {
    id: 'card-memory',
    name: 'Memory Match',
    category: 'memory',
    description: 'Classic card matching game',
    difficulty: 1,
    estimatedTime: '3min',
    moodTags: ['calming', 'focusing', 'gentle'],
    icon: '🃏',
    color: 'bg-lavender-300',
  },
  {
    id: 'sequence-repeat',
    name: 'Sequence Repeat',
    category: 'memory',
    description: 'Remember and repeat sequences',
    difficulty: 2,
    estimatedTime: '5min',
    moodTags: ['challenging', 'focusing', 'brain-training'],
    icon: '🔄',
    color: 'bg-lavender-400',
  },
  {
    id: 'simon-says',
    name: 'Simon Says',
    category: 'memory',
    description: 'Follow the color pattern sequence',
    difficulty: 2,
    estimatedTime: '5min',
    moodTags: ['energizing', 'challenging', 'quick'],
    icon: '🎵',
    color: 'bg-lavender-400',
  },

  // Zen/Relaxing
  {
    id: 'mandala-coloring',
    name: 'Mandala Coloring',
    category: 'zen',
    description: 'Meditative coloring experience',
    difficulty: 1,
    estimatedTime: '10min',
    moodTags: ['calming', 'meditative', 'creative'],
    icon: '🌸',
    color: 'bg-coral-300',
  },
  {
    id: 'flow-connect',
    name: 'Flow Connect',
    category: 'zen',
    description: 'Connect matching colors with pipes',
    difficulty: 1,
    estimatedTime: '5min',
    moodTags: ['calming', 'satisfying', 'gentle'],
    icon: '🌊',
    color: 'bg-coral-200',
  },
  {
    id: 'tile-sorting',
    name: 'Tile Sorting',
    category: 'zen',
    description: 'Sort colorful tiles into order',
    difficulty: 1,
    estimatedTime: '3min',
    moodTags: ['calming', 'satisfying', 'organizing'],
    icon: '🎴',
    color: 'bg-coral-200',
  },
  {
    id: 'breath-timer',
    name: 'Breath Timer',
    category: 'zen',
    description: 'Guided breathing with visual cues',
    difficulty: 1,
    estimatedTime: '2min',
    moodTags: ['calming', 'meditative', 'stress-relief'],
    icon: '🫁',
    color: 'bg-coral-300',
  },

  // Strategy
  {
    id: 'chess-puzzles',
    name: 'Chess Puzzles',
    category: 'strategy',
    description: 'Solve chess positions and tactics',
    difficulty: 3,
    estimatedTime: '5min',
    moodTags: ['challenging', 'strategic', 'focusing'],
    icon: '♟️',
    color: 'bg-lavender-500',
  },
  {
    id: 'maze-solver',
    name: 'Maze Solver',
    category: 'strategy',
    description: 'Find the path through complex mazes',
    difficulty: 2,
    estimatedTime: '5min',
    moodTags: ['focusing', 'challenging', 'strategic'],
    icon: '🗺️',
    color: 'bg-lavender-400',
  },
  {
    id: 'block-puzzle',
    name: 'Block Puzzle',
    category: 'strategy',
    description: 'Fit blocks into the grid strategically',
    difficulty: 2,
    estimatedTime: '5min',
    moodTags: ['strategic', 'satisfying', 'planning'],
    icon: '🧱',
    color: 'bg-lavender-400',
  },

  // Quick Games
  {
    id: 'spot-difference',
    name: 'Spot the Difference',
    category: 'quick',
    description: 'Find differences between two images',
    difficulty: 1,
    estimatedTime: '2min',
    moodTags: ['quick', 'focusing', 'gentle'],
    icon: '👀',
    color: 'bg-coral-400',
  },
  {
    id: 'color-switch',
    name: 'Color Switch',
    category: 'quick',
    description: 'Match colors in this fast-paced game',
    difficulty: 2,
    estimatedTime: '2min',
    moodTags: ['energizing', 'quick', 'reflex'],
    icon: '🎨',
    color: 'bg-coral-400',
  },
  {
    id: 'reaction-time',
    name: 'Reaction Game',
    category: 'quick',
    description: 'Test and improve your reaction speed',
    difficulty: 1,
    estimatedTime: '2min',
    moodTags: ['energizing', 'quick', 'reflex'],
    icon: '⚡',
    color: 'bg-coral-500',
  },
];

export const getMoodRecommendations = (mood, intensity = 3) => {
  const recommendations = {
    happy: {
      games: ['word-connect', 'pattern-match', 'chess-puzzles', 'anagrams'],
      reason: 'Channel your energy into fun challenges',
    },
    calm: {
      games: ['word-search', 'sudoku-easy', 'flow-connect', 'mandala-coloring'],
      reason: 'Maintain your peaceful state',
    },
    stressed: {
      games: ['breath-timer', 'mandala-coloring', 'flow-connect', 'tile-sorting'],
      reason: 'Games to help you unwind and relax',
    },
    sad: {
      games: ['color-switch', 'tile-sorting', 'spot-difference', 'card-memory'],
      reason: 'Gentle games for uplifting your mood',
    },
    frustrated: {
      games: ['block-puzzle', 'maze-solver', '2048-tiles', 'nonogram'],
      reason: 'Satisfying puzzles to work through',
    },
    tired: {
      games: ['card-memory', 'sudoku-easy', 'spot-difference', 'word-search'],
      reason: 'Low-pressure games that are easy on the mind',
    },
    unfocused: {
      games: ['pattern-match', 'simon-says', 'sequence-repeat', 'sudoku-medium'],
      reason: 'Games to sharpen your focus',
    },
    neutral: {
      games: ['word-connect', 'sudoku-medium', 'card-memory', 'flow-connect'],
      reason: 'Popular picks to get you started',
    },
  };

  const moodData = recommendations[mood] || recommendations.neutral;
  
  // Adjust recommendations based on intensity
  if (intensity >= 4) {
    // High intensity - need more calming/releasing games
    if (mood === 'stressed' || mood === 'frustrated' || mood === 'sad') {
      moodData.games = ['breath-timer', 'mandala-coloring', 'flow-connect', 'tile-sorting'];
    }
  }

  return moodData;
};

export const getCategoryLabel = (categoryId) => {
  const labels = {
    word: 'Word Puzzles',
    logic: 'Logic Games',
    memory: 'Memory',
    zen: 'Zen Mode',
    strategy: 'Strategy',
    quick: 'Quick Games',
  };
  return labels[categoryId] || categoryId;
};

