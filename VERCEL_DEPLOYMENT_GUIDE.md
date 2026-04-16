# 🚀 Deploy Full Stack on Vercel - Single Application

## Overview
Deploy both frontend and backend as a single application on Vercel. This is the simplest deployment option.

## ✅ What's Configured

- ✅ `vercel.json` - Vercel configuration for monorepo
- ✅ `package.json` - Root build scripts
- ✅ `backend/api/index.js` - Serverless API entry point
- ✅ Frontend API configured for relative URLs

## 📋 Prerequisites

1. GitHub account (already done ✅)
2. Vercel account (sign up with GitHub)
3. MongoDB Atlas account (free)

---

## Part 1: Setup MongoDB Atlas (5 minutes)

### Step 1: Create MongoDB Cluster

1. Go to https://cloud.mongodb.com
2. Sign up or log in
3. Click "Build a Database"
4. Choose **FREE** tier (M0 Sandbox)
5. Select region closest to you
6. Cluster Name: `white-label-cluster`
7. Click "Create"

### Step 2: Create Database User

1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Username: `whitelabel_admin`
4. Password: Click "Autogenerate Secure Password" (SAVE THIS!)
5. Database User Privileges: "Read and write to any database"
6. Click "Add User"

### Step 3: Configure Network Access

1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 4: Get Connection String

1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy and modify the connection string:
   ```
   mongodb+srv://whitelabel_admin:YOUR_PASSWORD@white-label-cluster.xxxxx.mongodb.net/white-label-admin?retryWrites=true&w=majority
   ```

**SAVE THIS CONNECTION STRING!**

---

## Part 2: Deploy to Vercel (10 minutes)

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

**Framework Preset**: Other (Vercel will detect the monorepo)

**Root Directory**: Leave as `.` (root)

**Build Settings**:
- Build Command: `npm run build` (auto-detected from package.json)
- Output Directory: `frontend/dist`
- Install Command: `npm install`

### Step 4: Add Environment Variables

Click "Environment Variables" and add:

| Name | Value |
|------|-------|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | Your MongoDB connection string from Part 1 |
| `PORT` | `5000` |
| `CORS_ORIGIN` | `*` |
| `UPLOAD_DIR` | `./uploads` |
| `MAX_FILE_SIZE` | `5242880` |

**Important**: Make sure to add these for all environments (Production, Preview, Development)

### Step 5: Deploy

1. Click "Deploy"
2. Wait 3-5 minutes
3. Watch the build logs
4. You'll see "Congratulations! 🎉"

### Step 6: Test Your Application

1. Click "Visit" to open your app
2. Your app URL will be like: `https://white-labelling-prod.vercel.app`
3. Test the application:
   - Go to "Shops" → "Add New Shop"
   - Select Zone: "Bangalore South"
   - Verify places appear in dropdown
   - Create a test shop

---

## ✅ Deployment Complete!

### Your Live Application

**Single URL**: https://white-labelling-prod.vercel.app

- Frontend: `https://white-labelling-prod.vercel.app`
- Backend API: `https://white-labelling-prod.vercel.app/api/v1`
- Health Check: `https://white-labelling-prod.vercel.app/api/v1/health`

---

## 🧪 Testing

### Test Backend API

Open in browser or use curl:
```bash
https://white-labelling-prod.vercel.app/api/v1/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running"
}
```

### Test Frontend

1. Open your Vercel URL
2. Navigate through all pages:
   - Dashboard
   - Shops (create, list, edit)
   - Deliveries (create, list)
   - Reminders (list, complete)

### Test Full Flow

1. **Create Shop**:
   - Go to "Shops" → "Add New Shop"
   - Fill in all details
   - Select Zone and Place
   - Click "Create Business / Shop"

2. **Create Delivery**:
   - Go to "Deliveries" → "Create Delivery"
   - Select the shop
   - Add items (Dhoop, Agarbatti, etc.)
   - Click "Create Delivery"

3. **Check Reminder**:
   - Go to "Reminders"
   - You should see a 30-day reminder automatically created

4. **View Dashboard**:
   - Go to "Dashboard"
   - See statistics update

---

## 🔧 How It Works

### Architecture

```
Your Vercel App
├── Frontend (Static Files)
│   └── Served from /
│
└── Backend (Serverless Functions)
    └── Served from /api/v1/*
```

### Request Routing

- `https://your-app.vercel.app/` → Frontend (React)
- `https://your-app.vercel.app/api/v1/*` → Backend (Node.js)
- `https://your-app.vercel.app/uploads/*` → File uploads

### Serverless Backend

- Backend runs as Vercel serverless functions
- Each API request spins up a function
- Functions auto-scale based on traffic
- No server management needed

---

## 🚀 Updating Your Application

### Automatic Deployments

Every time you push to GitHub, Vercel automatically:
1. Detects the changes
2. Builds the application
3. Deploys to production
4. Updates your live site

### Manual Update

```bash
# Make changes to your code
git add .
git commit -m "Update feature"
git push origin main

# Vercel auto-deploys in 2-3 minutes
```

### View Deployments

1. Go to Vercel dashboard
2. Click on your project
3. See all deployments with preview URLs
4. Rollback to any previous deployment if needed

---

## ⚠️ Important Notes

### Serverless Limitations

1. **Execution Time**: Max 10 seconds per request (Hobby plan)
2. **File Uploads**: Limited to 4.5MB per request
3. **Cold Starts**: First request may be slower (~1-2 seconds)
4. **Stateless**: No persistent file storage (use MongoDB for data)

### Cron Jobs

⚠️ **Important**: Vercel serverless functions don't support cron jobs natively.

**Solution**: Use Vercel Cron (Beta) or external service:

#### Option 1: Vercel Cron (Recommended)

Create `vercel.json` with cron:
```json
{
  "crons": [{
    "path": "/api/v1/cron/update-reminders",
    "schedule": "0 0 * * *"
  }]
}
```

Then create endpoint: `backend/api/cron/update-reminders.js`

#### Option 2: External Cron Service

Use https://cron-job.org (free):
1. Create account
2. Add cron job
3. URL: `https://your-app.vercel.app/api/v1/cron/update-reminders`
4. Schedule: Daily at midnight

---

## 💰 Cost

### Vercel Hobby Plan (Free)

**Included**:
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ 100 GB-hours serverless execution
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Preview deployments
- ✅ Custom domains

**Limits**:
- 10 second function timeout
- 4.5 MB request body size
- 100 GB bandwidth/month

### When to Upgrade

Upgrade to **Pro ($20/month)** if you need:
- 60 second function timeout
- 4.5 MB → 50 MB request body
- 1 TB bandwidth/month
- Team collaboration
- Advanced analytics

### MongoDB Atlas

**Free Tier (M0)**:
- ✅ 512 MB storage
- ✅ Shared RAM
- ✅ Enough for 1000+ shops

**Upgrade to M2 ($9/month)** for:
- 2 GB storage
- Dedicated RAM
- Better performance

---

## 🔧 Troubleshooting

### Build Fails

**Problem**: Build fails on Vercel

**Solutions**:
1. Check build logs in Vercel dashboard
2. Verify `package.json` scripts are correct
3. Ensure all dependencies are in `package.json`
4. Check Node.js version compatibility

### API Not Working

**Problem**: API calls return 404 or 500

**Solutions**:
1. Check environment variables are set in Vercel
2. Verify MongoDB connection string is correct
3. Check function logs in Vercel dashboard
4. Test API endpoint directly: `/api/v1/health`

### Database Connection Failed

**Problem**: "MongoServerError: Authentication failed"

**Solutions**:
1. Verify MongoDB username and password
2. Check network access allows 0.0.0.0/0
3. Ensure connection string includes database name
4. Test connection string locally first

### CORS Errors

**Problem**: CORS errors in browser console

**Solutions**:
1. Set `CORS_ORIGIN=*` in Vercel environment variables
2. Or set to your specific domain
3. Redeploy after changing environment variables

### Uploads Not Working

**Problem**: File uploads fail

**Solutions**:
1. Vercel serverless has 4.5MB limit
2. Consider using external storage (AWS S3, Cloudinary)
3. Or upgrade to Vercel Pro for 50MB limit

---

## 📊 Monitoring

### Vercel Dashboard

1. **Deployments**: See all deployments and their status
2. **Analytics**: View page views and performance
3. **Logs**: Real-time function logs
4. **Metrics**: Function execution time and errors

### MongoDB Atlas

1. **Metrics**: Database performance
2. **Collections**: Browse data
3. **Alerts**: Set up alerts for issues

---

## 🎯 Best Practices

### Environment Variables

- ✅ Never commit `.env` files
- ✅ Use Vercel environment variables
- ✅ Set for all environments (Production, Preview, Development)

### Database

- ✅ Use connection pooling
- ✅ Add indexes for frequently queried fields
- ✅ Regular backups (Atlas does this automatically)

### Performance

- ✅ Minimize function execution time
- ✅ Use database indexes
- ✅ Cache static assets
- ✅ Optimize images

### Security

- ✅ Validate all inputs
- ✅ Use environment variables for secrets
- ✅ Enable MongoDB authentication
- ✅ Keep dependencies updated

---

## 🎉 Success!

Your full-stack application is now live on Vercel!

**Single URL**: https://white-labelling-prod.vercel.app

**Features**:
- ✅ Frontend and Backend on same domain
- ✅ Automatic deployments from GitHub
- ✅ Free SSL certificate
- ✅ Global CDN
- ✅ Serverless auto-scaling
- ✅ 75 places across 9 zones
- ✅ Automatic 30-day reminders

---

## 📞 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **MongoDB Docs**: https://docs.mongodb.com

---

## 🔄 Alternative: Deploy Separately

If you prefer separate deployments for better control:
- See `SEPARATE_DEPLOYMENT_GUIDE.md`
- Frontend on Vercel, Backend on Render
- More flexibility for scaling

---

**Deployment Status**: ✅ Ready to Deploy  
**Total Time**: ~15 minutes  
**Cost**: $0/month (Free tier)
