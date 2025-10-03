# 🚀 Secure Deployment Guide

## Overview
This guide will help you deploy your React Logo Maker with a secure backend that protects your OpenAI API keys and prevents abuse.

## Architecture
- **Frontend**: React app (deployed to GitHub Pages/Vercel/Netlify)
- **Backend**: Express API (deployed to Railway)
- **Security**: API keys stored safely on backend, rate limiting, CORS protection

---

## 🚂 Step 1: Deploy Backend to Railway

### 1.1 Prepare Railway Account
1. Go to [Railway.app](https://railway.app) and sign up/login
2. Connect your GitHub account to Railway

### 1.2 Deploy the Backend
1. In Railway dashboard, click "New Project"
2. Select "Deploy from GitHub repo" 
3. Choose your `react-logo-maker` repository
4. Railway will detect the Express app in the `/backend` folder

### 1.3 Set Environment Variables
In Railway project settings, add these environment variables:
```
OPENAI_API_KEY=your_actual_openai_api_key_here
NODE_ENV=production
```

### 1.4 Get Your Backend URL
- After deployment, Railway provides a URL like: `https://react-logo-maker-backend-production.up.railway.app`
- Copy this URL - you'll need it for the frontend

---

## 🌐 Step 2: Update Frontend Configuration

### 2.1 Update Environment Variables
Edit `.env.local`:
```bash
VITE_API_BASE_URL=https://your-railway-url-here.railway.app
```

### 2.2 Update CORS Settings (Backend)
In `backend/server.js`, update the CORS origins with your frontend domain:
```javascript
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourusername.github.io', 'https://your-custom-domain.com']
    : ['http://localhost:5173', 'http://localhost:5174'],
  // ...
};
```

---

## 📱 Step 3: Deploy Frontend

### Option A: GitHub Pages
1. Go to your repository settings
2. Navigate to "Pages" section  
3. Select source: "Deploy from a branch"
4. Choose `main` branch and `/` folder
5. Your app will be available at: `https://yourusername.github.io/react-logo-maker`

### Option B: Vercel (Recommended)
1. Go to [Vercel.com](https://vercel.com) and connect GitHub
2. Import your `react-logo-maker` repository
3. Vercel auto-detects Vite configuration
4. Add environment variable: `VITE_API_BASE_URL=https://your-railway-url`
5. Deploy!

### Option C: Netlify
1. Go to [Netlify.com](https://netlify.com) and connect GitHub
2. Select your repository
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variable: `VITE_API_BASE_URL=https://your-railway-url`
5. Deploy!

---

## 🔧 Step 4: Test Your Deployment

### 4.1 Backend Health Check
Visit: `https://your-railway-url.railway.app/api/health`

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2024-10-03T...",
  "environment": "production"
}
```

### 4.2 Frontend AI Generation
1. Visit your deployed frontend
2. Try generating AI logos
3. Check browser console for successful API calls
4. Verify you get real OpenAI images (not mock SVGs)

---

## 💰 Cost Management

### Railway Costs
- **Hobby Plan**: $5/month for backend hosting
- **Starter Plan**: First $5 free, then usage-based

### OpenAI Costs  
- **DALL-E 3 Standard**: ~$0.04 per image
- **Rate limiting**: 10 requests/minute prevents abuse
- **Monitor usage** in OpenAI dashboard

---

## 🛡️ Security Features

✅ **API Key Protection**: Keys stored securely on Railway
✅ **Rate Limiting**: 10 requests/minute per IP
✅ **CORS Protection**: Only your domains can access the API
✅ **Input Validation**: Prevents malicious requests
✅ **Error Handling**: No sensitive data leaked in errors

---

## 🐛 Troubleshooting

### Backend Issues
- **500 Errors**: Check Railway logs for API key issues
- **CORS Errors**: Verify frontend domain in CORS settings  
- **Rate Limits**: Wait 1 minute between rapid requests

### Frontend Issues
- **Network Errors**: Verify `VITE_API_BASE_URL` is correct
- **Mock Images**: Backend might be down, check health endpoint
- **Build Errors**: Ensure all dependencies are installed

### Common Fixes
```bash
# Rebuild frontend with new environment variables
npm run build

# Check Railway backend logs
railway logs

# Test backend locally
cd backend && npm run dev
```

---

## 📋 Deployment Checklist

**Backend (Railway):**
- [ ] Railway account created and connected to GitHub
- [ ] Backend deployed successfully  
- [ ] `OPENAI_API_KEY` environment variable set
- [ ] `NODE_ENV=production` set
- [ ] Health endpoint returns OK
- [ ] CORS configured with frontend domains

**Frontend:**
- [ ] `VITE_API_BASE_URL` updated with Railway URL
- [ ] Application builds without errors
- [ ] Deployed to hosting platform
- [ ] AI logo generation works end-to-end
- [ ] No API keys exposed in frontend code

**Security:**
- [ ] OpenAI API key not committed to git
- [ ] Rate limiting active (10 req/min)
- [ ] CORS protecting backend endpoints
- [ ] Error messages don't leak sensitive data

---

## 🎉 Success!

Once completed, you'll have:
- **Secure AI logo generation** with protected API keys
- **Professional hosting** on Railway + GitHub Pages/Vercel
- **Cost controls** with rate limiting
- **Production-ready** architecture that scales

Your users can now generate AI logos safely without exposing your OpenAI credentials! 🚀