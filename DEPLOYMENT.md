# Deployment Guide - GitHub Pages

This guide will help you deploy your MindPlay app to GitHub Pages.

## Option 1: Automatic Deployment with GitHub Actions (Recommended)

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it whatever you want (e.g., `mindplay-app` or `Game-1-Productivity-App`)
3. **Important**: Note your repository name - you'll need it!

### Step 2: Update the Base Path

Edit `vite.config.js` and update the `base` path with your repository name:

```javascript
base: '/your-repository-name/', // Replace with YOUR repository name
```

For example, if your repo is `mindplay-app`, use:
```javascript
base: '/mindplay-app/',
```

### Step 3: Initialize Git and Push

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add your GitHub repository as remote (replace with YOUR repo URL)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**

### Step 5: Wait for Deployment

- The GitHub Action will automatically run and deploy your site
- Check the **Actions** tab to see the deployment progress
- Once complete, your site will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

## Option 2: Manual Deployment with gh-pages

If you prefer to deploy manually:

### Step 1: Install gh-pages

```bash
npm install
```

### Step 2: Update Base Path

Same as Option 1 - update `vite.config.js` with your repository name.

### Step 3: Deploy

```bash
# Build and deploy
npm run deploy
```

This will:
1. Build your app
2. Create/update the `gh-pages` branch
3. Push the built files to GitHub Pages

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** → **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Select the `gh-pages` branch and `/ (root)` folder
5. Click **Save**

Your site will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

## Important Notes

- **Base Path**: Make sure the `base` in `vite.config.js` matches your repository name exactly (including slashes)
- **Branch**: The automatic deployment uses the `main` branch by default
- **Build Time**: First deployment may take 2-3 minutes
- **Updates**: Any push to `main` will trigger a new deployment (with GitHub Actions)

## Troubleshooting

### Blank Page / 404 Errors
- Check that the `base` path in `vite.config.js` matches your repository name
- Ensure it has leading and trailing slashes: `/repo-name/`

### GitHub Actions Not Running
- Make sure GitHub Pages is set to use "GitHub Actions" as the source
- Check that the workflow file is in `.github/workflows/deploy.yml`
- Verify you pushed the `.github` folder to your repository

### Manual Deploy Not Working
- Run `npm install` to ensure `gh-pages` is installed
- Make sure you've committed all changes before running `npm run deploy`
- Check that you have push access to the repository

## Custom Domain (Optional)

To use a custom domain:

1. Go to **Settings** → **Pages**
2. Enter your custom domain in the **Custom domain** field
3. Add a `CNAME` file to the `public` folder with your domain name
4. Configure your DNS settings with your domain provider

## Testing Locally

Before deploying, test the production build locally:

```bash
npm run build
npm run preview
```

This will show you exactly how your app will look when deployed.

---

Need help? Check the [GitHub Pages documentation](https://docs.github.com/en/pages) or [Vite deployment guide](https://vitejs.dev/guide/static-deploy.html).

