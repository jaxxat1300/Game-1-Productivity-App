# MindPlay - Mindful Gaming App

A beautiful React productivity app that gamifies daily engagement through mindful games and streaks.

## Features

- 🎯 Welcome & Authentication Flow
- 🎨 Beautiful gradient UI with Tailwind CSS
- 🧠 Personalized onboarding experience
- 🏆 Daily streaks and coin rewards
- 🎮 Multiple game categories (Word Puzzles, Logic, Memory, Strategy, Quick Games, Zen Mode)
- 📊 Dashboard with user stats
- ⚡ Built with React and Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Build and deploy to GitHub Pages

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Lucide React (icons)

## Project Structure

```
src/
├── components/
│   └── MindfulGamesApp.jsx    # Main app component
├── App.jsx                     # Root app component
├── main.jsx                    # Entry point
└── index.css                   # Global styles with Tailwind
```

## Usage

1. Click "Get Started" on the welcome screen
2. Create an account (mock authentication)
3. Complete the onboarding:
   - Select why you're using the app
   - Choose your favorite game categories
4. Access your personalized dashboard
5. Start playing games to build your streak!

## Deployment

This app is configured for GitHub Pages deployment. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Quick Deploy

1. Create a GitHub repository
2. Update `vite.config.js` with your repository name
3. Push your code to GitHub
4. Enable GitHub Pages in repository settings
5. Your app will automatically deploy!

For detailed step-by-step instructions, see the [Deployment Guide](./DEPLOYMENT.md).

## License

MIT

