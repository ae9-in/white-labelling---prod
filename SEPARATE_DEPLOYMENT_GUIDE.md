# 🚀 Separate Deployment Guide - Frontend & Backend

## Overview
This guide will help you deploy the frontend and backend separately for optimal performance and cost-effectiveness.

## ✅ Recommended Setup

**Frontend**: Vercel (Free, Global CDN, Auto-deploy)  
**Backend**: Render (Free tier, Auto-deploy, SSL)  
**Database**: MongoDB Atlas (Free tier, 512MB)

**Total Cost**: $0/month (Free tiers)

---

## 📋 Prerequisites

1. GitHub account (already done ✅)
2. Vercel account (sign up with GitHub)
3. Render account (sign up with GitHub)
4. MongoDB Atlas account (free)

---

## Part 1: Setup MongoDB Atlas (5 minutes)

### Step 1: Create MongoDB Cluster

1. Go to https://cloud.mongodb.com
2. Sign up or log in
3. Click "Build a Database"
4. Choose **FREE** tier (M0 Sandbox)
5. Select region closest to you (e.g., AWS Mumbai for India)
6. Cluster Name: `white-label-cluster`
7. Click "Create"

### Step 2: Create Database User

1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Authentication Method: Password
4. Username: `whitelabel_admin`
5. Password: Click "Autogenerate Secure Password" (SAVE THIS!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### Step 3: Configure Network Access

1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 4: Get Connection String

1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Driver: Node.js, Version: 5.5 or later
5. Copy the connection string:
   ```
   mongodb+srv://whitelabel_admin:<password>@white-label-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual password
7. Add database name: `white-label-admin`
   ```
   mongodb+srv://whitelabel_admin:YOUR_PASSWORD@white-label-cluster.xxxxx.mongodb.net/white-label-admin?retryWrites=true&w=majority
   ```

**SAVE THIS CONNECTION STRING!** You'll need it for backend deployment.

---

## Part 2: Deploy Backend to Render (10 minutes)

### Step 1: Create Render Account

1. Go to https://render.com
2. Click "Get Started"
3. Sign up with GitHub
4. Authorize Render to access your GitHub

### Step 2: Create Web Service

1. Click "New +" button (top right)
2. Select "Web Service"
3. Click "Connect account" if needed
4. Find and select: `ae9-in/white-labelling---prod`
5. Click "Connect"

### Step 3: Configure Service

Fill in these settings:

**Basic Settings:**
- **Name**: `white-label-backend`
- **Region**: Choose closest to you (e.g., Singapore for Asia)
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Instance Type:**
- Select **Free** (or Starter for better performance)

### Step 4: Add Environment Variables

Click "Advanced" and add these environment variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGODB_URI` | Your MongoDB connection string from Part 1 |
| `CORS_ORIGIN` | `*` (we'll update this after frontend is deployed) |
| `UPLOAD_DIR` | `./uploads` |
| `MAX_FILE_SIZE` | `5242880` |

### Step 5: Deploy

1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Watch the logs for any errors
4. Once deployed, you'll see "Your service is live 🎉"

### Step 6: Get Backend URL

1. Copy your backend URL (e.g., `https://white-label-backend.onrender.com`)
2. Test it by visiting: `https://white-label-backend.onrender.com/api/v1/health`
3. You should see:
   ```json
   {
     "success": true,
     "message": "Server is running"
   }
   ```

**SAVE THIS BACKEND URL!** You'll need it for frontend.

### Step 7: Seed Database (Optional)

1. In Render dashboard, click on your service
2. Click "Shell" tab
3. Run:
   ```bash
   cd backend
   node src/utils/seed-shops.js
   ```
4. This creates sample shops and deliveries

---

## Part 3: Update Frontend API URL (2 minutes)

### Step 1: Update API Configuration

Open `frontend/src/services/api.js` and update the baseURL:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://white-label-backend.onrender.com/api/v1', // Your Render backend URL
  headers: {
    'Content-Type': 'application/json'
  }
});

// Rest of the file stays the same...
```

### Step 2: Commit and Push

```bash
git add frontend/src/services/api.js
git commit -m "Update API URL for production deployment"
git push origin main
```

---

## Part 4: Deploy Frontend to Vercel (5 minutes)

### Step 1: Create Vercel Account

1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel

### Step 2: Import Project

1. Click "Add New..." → "Project"
2. Find `ae9-in/white-labelling---prod`
3. Click "Import"

### Step 3: Configure Project

**Framework Preset**: Vite (should auto-detect)

**Root Directory**: Click "Edit" and select `frontend`

**Build Settings**:
- Build Command: `npm run build` (auto-filled)
- Output Directory: `dist` (auto-filled)
- Install Command: `npm install` (auto-filled)

**Environment Variables**: None needed for frontend

### Step 4: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes
3. You'll see "Congratulations! 🎉"
4. Click "Visit" to see your live app

### Step 5: Get Frontend URL

1. Copy your frontend URL (e.g., `https://white-label-xxxx.vercel.app`)
2. Test by opening it in browser
3. Navigate to "Shops" → "Add New Shop"
4. Select a zone and verify places appear

**SAVE THIS FRONTEND URL!**

---

## Part 5: Update Backend CORS (2 minutes)

### Step 1: Update CORS Origin

1. Go back to Render dashboard
2. Click on your backend service
3. Click "Environment" in left sidebar
4. Find `CORS_ORIGIN` variable
5. Update value to your Vercel URL:
   ```
   https://white-label-xxxx.vercel.app
   ```
6. Click "Save Changes"

### Step 2: Redeploy Backend

1. Backend will automatically redeploy
2. Wait 2-3 minutes
3. Test your frontend again to ensure API calls work

---

## ✅ Deployment Complete!

### Your Live URLs

- **Frontend**: https://white-label-xxxx.vercel.app
- **Backend**: https://white-label-backend.onrender.com
- **Database**: MongoDB Atlas

### Test Your Application

1. **Open Frontend**: Visit your Vercel URL
2. **Create Shop**:
   - Go to "Shops" → "Add New Shop"
   - Fill in details
   - Select Zone: "Bangalore South"
   - Select Place: "Jayanagar"
   - Click "Create Business / Shop"
3. **Create Delivery**:
   - Go to "Deliveries" → "Create Delivery"
   - Select the shop you created
   - Add items
   - Click "Create Delivery"
4. **Check Reminder**:
   - Go to "Reminders"
   - You should see a 30-day reminder automatically created
5. **View Dashboard**:
   - Go to "Dashboard"
   - See statistics and recent activity

---

## 🔧 Troubleshooting

### Backend Issues

**Problem**: Backend not starting
- Check Render logs for errors
- Verify MongoDB connection string is correct
- Ensure all environment variables are set

**Problem**: Database connection failed
- Check MongoDB Atlas network access (0.0.0.0/0)
- Verify database user credentials
- Check connection string format

### Frontend Issues

**Problem**: API calls failing
- Check browser console for errors
- Verify backend URL in `frontend/src/services/api.js`
- Check CORS_ORIGIN in backend matches frontend URL
- Ensure backend is running (visit health endpoint)

**Problem**: Places not showing in dropdown
- Clear browser cache
- Check if latest code is deployed
- Verify `frontend/src/constants/places.js` is correct

### CORS Errors

**Problem**: "CORS policy" error in browser
- Update `CORS_ORIGIN` in Render backend settings
- Must match exact frontend URL (including https://)
- Redeploy backend after changing

---

## 📊 Monitoring & Maintenance

### Render (Backend)

1. **View Logs**: Dashboard → Your Service → Logs
2. **Monitor Performance**: Dashboard → Metrics
3. **Auto-deploy**: Enabled by default on git push

### Vercel (Frontend)

1. **View Deployments**: Dashboard → Your Project → Deployments
2. **Analytics**: Dashboard → Analytics (free)
3. **Auto-deploy**: Enabled by default on git push

### MongoDB Atlas

1. **Monitor Database**: Dashboard → Metrics
2. **View Collections**: Dashboard → Browse Collections
3. **Backup**: Automatic backups enabled

---

## 🚀 Updating Your Application

### Update Backend

```bash
# Make changes to backend code
git add backend/
git commit -m "Update backend feature"
git push origin main
# Render auto-deploys in 2-3 minutes
```

### Update Frontend

```bash
# Make changes to frontend code
git add frontend/
git commit -m "Update frontend feature"
git push origin main
# Vercel auto-deploys in 1-2 minutes
```

---

## 💰 Cost Breakdown

### Free Tier Limits

**Vercel (Frontend)**:
- ✅ Unlimited bandwidth
- ✅ Unlimited deployments
- ✅ 100 GB-hours compute
- ✅ Free SSL
- ✅ Global CDN

**Render (Backend)**:
- ✅ 750 hours/month (enough for 1 service)
- ✅ 512 MB RAM
- ✅ Free SSL
- ⚠️ Spins down after 15 min inactivity (first request takes 30s)

**MongoDB Atlas**:
- ✅ 512 MB storage
- ✅ Shared RAM
- ✅ Enough for 1000+ shops

### Upgrade Options

If you need better performance:

**Render Starter**: $7/month
- No spin down
- 512 MB RAM
- Better performance

**MongoDB M2**: $9/month
- 2 GB storage
- Dedicated RAM
- Better performance

**Total for Production**: ~$16/month

---

## 🎉 Success!

Your application is now live with:
- ✅ Frontend on global CDN (Vercel)
- ✅ Backend on cloud server (Render)
- ✅ Database on MongoDB Atlas
- ✅ Automatic deployments from GitHub
- ✅ Free SSL certificates
- ✅ 75 places across 9 zones
- ✅ Automatic 30-day reminders

**Frontend**: https://white-label-xxxx.vercel.app  
**Backend**: https://white-label-backend.onrender.com

---

## 📞 Need Help?

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Docs**: https://docs.mongodb.com

---

**Deployment Status**: ✅ Complete  
**Total Time**: ~25 minutes  
**Cost**: $0/month (Free tiers)
