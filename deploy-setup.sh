#!/bin/bash

# MindPlay GitHub Pages Setup Script
# This script helps you set up your repository for GitHub Pages deployment

echo "🎮 MindPlay - GitHub Pages Setup"
echo "================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized!"
else
    echo "✅ Git repository already exists"
fi

# Ask for repository name
echo ""
echo "What is your GitHub repository name?"
echo "Example: mindplay-app or Game-1-Productivity-App"
read -p "Repository name: " REPO_NAME

if [ -z "$REPO_NAME" ]; then
    echo "❌ Repository name cannot be empty"
    exit 1
fi

# Update vite.config.js with the correct base path
echo ""
echo "📝 Updating vite.config.js with base path: /$REPO_NAME/"
sed -i.bak "s|base: '/[^']*'|base: '/$REPO_NAME/'|" vite.config.js
rm -f vite.config.js.bak
echo "✅ vite.config.js updated!"

# Ask for GitHub username
echo ""
read -p "Your GitHub username: " GITHUB_USER

if [ -z "$GITHUB_USER" ]; then
    echo "❌ GitHub username cannot be empty"
    exit 1
fi

# Add and commit files
echo ""
echo "📦 Adding files to git..."
git add .

echo "💾 Creating initial commit..."
git commit -m "Initial commit - MindPlay App ready for GitHub Pages"

# Add remote
REMOTE_URL="https://github.com/$GITHUB_USER/$REPO_NAME.git"
echo ""
echo "🔗 Adding remote repository: $REMOTE_URL"

if git remote | grep -q "^origin$"; then
    git remote set-url origin "$REMOTE_URL"
    echo "✅ Remote 'origin' updated!"
else
    git remote add origin "$REMOTE_URL"
    echo "✅ Remote 'origin' added!"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Create a repository on GitHub named: $REPO_NAME"
echo "2. Push your code:"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Enable GitHub Pages:"
echo "   - Go to: https://github.com/$GITHUB_USER/$REPO_NAME/settings/pages"
echo "   - Set Source to: GitHub Actions"
echo ""
echo "4. Your site will be live at:"
echo "   https://$GITHUB_USER.github.io/$REPO_NAME/"
echo ""
echo "For more details, see DEPLOYMENT.md"

