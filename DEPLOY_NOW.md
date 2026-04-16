# 🚀 DEPLOY NOW - Copy & Paste Guide

## ⚡ Vercel Build Configuration

### Copy these EXACT values to Vercel:

**Framework Preset:**
```
Other
```

**Root Directory:**
```
./
```

**Build Command:**
```
cd frontend && npm install && npm run build
```

**Output Directory:**
```
frontend/dist
```

**Install Command:**
```
cd backend && npm install
```

---

## 🔐 Environment Variables

### Copy these to Vercel Dashboard → Environment Variables:

#### 1. NODE_ENV
```
production
```

#### 2. MONGODB_URI
```
mongodb+srv://username:password@cluster.mongodb.net/white-label-admin?retryWrites=true&w=majority
```
⚠️ **REPLACE** `username`, `password`, and `cluster` with your MongoDB Atlas credentials

#### 3. PORT
```
5000
```

#### 4. CORS_ORIGIN
```
*
```

#### 5. UPLOAD_DIR (Optional)
```
./uploads
```

#### 6. MAX_FILE_SIZE (Optional)
```
5242880
```

#### 7. CRON_SECRET (Optional)
```
your-random-secret-key-123
```

---

## 📋 MongoDB Connection String Format

Your `MONGODB_URI` should look like:

```
mongodb+srv://whitelabel_admin:MyP@ssw0rd123@cluster0.abc123.mongodb.net/white-label-admin?retryWrites=true&w=majority
```

### Get Your Connection String:

1. Go to https://cloud.mongodb.com
2. Click "Database" → "Connect"
3. Choose "Connect your application"
4. Copy the string
5. Replace `<password>` with your actual password
6. Add database name: `white-label-admin`

---

## 🎯 Deploy Steps

### 1. Setup MongoDB (5 minutes)

```
1. Go to https://cloud.mongodb.com
2. Sign up (free)
3. Create Cluster:
   - Choose FREE tier (M0)
   - Select region (closest to you)
   - Click "Create"
4. Create Database User:
   - Username: whitelabel_admin
   - Password: (auto-generate and SAVE IT)
   - Click "Add User"
5. Network Access:
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere"
   - Confirm
6. Get Connection String:
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the string
   - Replace <password> with your password
   - Add database name: white-label-admin
```

### 2. Deploy to Vercel (10 minutes)

```
1. Go to https://vercel.com
2. Click "Sign Up" → "Continue with GitHub"
3. Authorize Vercel
4. Click "Add New..." → "Project"
5. Find: ae9-in/white-labelling---prod
6. Click "Import"
7. Configure:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: cd frontend && npm install && npm run build
   - Output Directory: frontend/dist
   - Install Command: cd backend && npm install
8. Add Environment Variables:
   - Click "Environment Variables"
   - Add each variable (see above)
   - Select "Production", "Preview", "Development"
9. Click "Deploy"
10. Wait 3-5 minutes
11. Done! 🎉
```

---

## ✅ Test Your Deployment

### 1. Backend API Test
Open in browser:
```
https://your-app.vercel.app/api/v1/health
```

Should see:
```json
{
  "success": true,
  "message": "Server is running"
}
```

### 2. Frontend Test
Open:
```
https://your-app.vercel.app
```

Should see the dashboard.

### 3. Full Flow Test
```
1. Go to "Shops" → "Add New Shop"
2. Fill in details
3. Select Zone: "Bangalore South"
4. Verify 9 places appear in dropdown
5. Create shop
6. Go to "Deliveries" → "Create Delivery"
7. Select the shop
8. Add items
9. Create delivery
10. Go to "Reminders"
11. Verify 30-day reminder was created
```

---

## 🐛 Troubleshooting

### Build Fails
```
Problem: Build command failed
Solution:
1. Check Vercel build logs
2. Verify Node.js version is 18.x
3. Ensure package.json exists in root
```

### API Returns 500
```
Problem: Internal Server Error
Solution:
1. Check Function Logs in Vercel
2. Verify MONGODB_URI is correct
3. Check MongoDB network access (0.0.0.0/0)
4. Verify database user credentials
```

### Environment Variables Not Working
```
Problem: Variables undefined
Solution:
1. Go to Vercel → Settings → Environment Variables
2. Verify all variables are added
3. Ensure "Production" is selected
4. Redeploy: Deployments → ... → Redeploy
```

### CORS Errors
```
Problem: CORS policy blocked
Solution:
1. Set CORS_ORIGIN=* in Vercel
2. Redeploy
```

---

## 📊 What You Get

### Your Live App
- **URL**: `https://your-app.vercel.app`
- **Frontend**: React app with Tailwind CSS
- **Backend**: Node.js API (serverless)
- **Database**: MongoDB Atlas (cloud)

### Features
- ✅ 75 places across 9 zones
- ✅ Shop management
- ✅ Delivery tracking
- ✅ Automatic 30-day reminders
- ✅ Dashboard with statistics
- ✅ Reports and analytics

### Automatic Features
- ✅ HTTPS (free SSL)
- ✅ Global CDN
- ✅ Auto-deploy on git push
- ✅ Preview deployments for PRs
- ✅ Daily cron job for reminders

---

## 💰 Cost

**Free Tier Includes:**
- ✅ 100 GB bandwidth/month
- ✅ 100 GB-hours serverless execution
- ✅ Unlimited deployments
- ✅ Free SSL
- ✅ Global CDN

**MongoDB Atlas Free:**
- ✅ 512 MB storage
- ✅ Enough for 1000+ shops

**Total Cost: $0/month**

---

## 🔄 Updating Your App

Every time you push to GitHub:
```bash
git add .
git commit -m "Update feature"
git push origin main
```

Vercel automatically:
1. Detects changes
2. Builds app
3. Deploys to production
4. Updates live site (2-3 minutes)

---

## 📞 Need Help?

- **Quick Guide**: `VERCEL_QUICK_DEPLOY.md`
- **Full Guide**: `VERCEL_DEPLOYMENT_CONFIG.md`
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Docs**: https://docs.mongodb.com

---

## ✅ Checklist

Before deploying:
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string copied
- [ ] Vercel account created

During deployment:
- [ ] Repository imported
- [ ] Build commands configured
- [ ] Environment variables added
- [ ] Deployment started

After deployment:
- [ ] Health endpoint tested
- [ ] Frontend loads
- [ ] Test shop created
- [ ] Test delivery created
- [ ] Reminder verified

---

## 🎉 Ready to Deploy!

**Time**: 15 minutes  
**Cost**: $0  
**Result**: Live full-stack app

**Repository**: https://github.com/ae9-in/white-labelling---prod

**Start here**: https://vercel.com

---

**Status**: ✅ Optimized and Ready  
**Build**: Single optimized build  
**Commands**: Exact commands provided  
**Variables**: All environment variables listed

Deploy now! 🚀
