# Railway Deployment Guide for Express Banking System

## Prerequisites
- GitHub account
- Railway account (sign up at railway.com using GitHub)

## Steps to Deploy

### 1. Push Code to GitHub
Since GitHub CLI had issues, manually create a repo:

1. Go to https://github.com/new
2. Repository name: `express-banking-system`
3. Set to Public
4. Do NOT initialize with README (we already have code)
5. Click "Create repository"

Then run these commands in PowerShell:
```powershell
cd "C:\Users\run40\Downloads\Express Banking System"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/express-banking-system.git
git push -u origin main
```

### 2. Deploy to Railway

1. Go to https://railway.com and sign in with GitHub
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Select `express-banking-system` repository
5. Railway will automatically detect it's a Node.js app

### 3. Configure Environment Variables

In Railway project settings, go to "Variables" tab and add:
```
NODE_ENV=production
```

### 4. Generate Domain

1. Go to project Settings
2. Scroll to "Networking" section
3. Click "Generate Domain"
4. Your API will be live at: `https://express-banking-system.up.railway.app`

### 5. Update Frontend API URL

Once you have the Railway URL, update `frontend/script.js` line 1:
```javascript
const API_BASE = 'https://YOUR_RAILWAY_URL/api';
```

## Verification

Test your deployment:
- Visit: `https://YOUR_RAILWAY_URL/`
- API endpoint: `https://YOUR_RAILWAY_URL/api/accounts`

## Notes

- The server listens on `process.env.PORT` (already configured)
- dotenv is installed for environment variables
- Cyclic.sh is shutting down, so Railway is used instead
