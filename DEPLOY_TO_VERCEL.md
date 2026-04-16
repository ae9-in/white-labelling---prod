# 🚀 Deploy to Vercel - Fixed Build Commands

## ✅ CORRECTED Build Commands

Copy these EXACT values to Vercel:

### Framework Preset
```
Other
```

### Root Directory
```
./
```

### Build Command
```
cd frontend && npm install && npm run build
```

### Output Directory
```
frontend/dist
```

### Install Command
```
cd backend && npm install
```

---

## 🔐 Environment Variables

Add these in Vercel Dashboard → Environment Variables:

### Required (4 variables)

**1. NODE_ENV**
```
production
```

**2. MONGODB_URI** (Replace with your MongoDB connection string)
```
mongodb+srv://username:password@cluster.mongodb.net/white-label-admin?retryWrites=true&w=majority
```

**3. PORT**
```
5000
```

**4. CORS_ORIGIN**
```
*
```

### Optional (3 variables)

**5. UPLOAD_DIR**
```
./uploads
```

**6. MAX_FILE_SIZE**
```
5242880
```

**7. CRON_SECRET**
```
your-random-secret-key-123
```

---

## 📋 Deployment Steps

### 1. Setup MongoDB Atlas (5 minutes)

1. Go to https://cloud.mongodb.com
2. Sign up (free)
3. Create Cluster → Choose FREE tier (M0)
4. Create Database User:
   - Username: `whitelabel_admin`
   - Password: (auto-generate and SAVE IT)
5. Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
6. Get Connection String:
   - Click "Connect" → "Connect your application"
   - Copy the string
   - Replace `<password>` with your password
   - Add database name: `white-label-admin`

### 2. Deploy to Vercel (10 minutes)

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New..." → "Project"
4. Import: `ae9-in/white-labelling---prod`
5. Configure:
   - Framework Preset: **Other**
   - Root Directory: **./
   - Build Command: **cd frontend && npm install && npm run build**
   - Output Directory: **frontend/dist**
   - Install Command: **cd backend && npm install**
6. Add Environment Variables (see above)
7. Click "Deploy"
8. Wait 3-5 minutes
9. Done! 🎉

---

## ✅ Test Your Deployment

### Backend API
```
https://your-app.vercel.app/api/v1/health
```
Expected: `{"success": true, "message": "Server is running"}`

### Frontend
```
https://your-app.vercel.app
```
Should load the dashboard

### Full Test
1. Go to "Shops" → "Add New Shop"
2. Select Zone: "Bangalore South"
3. Verify 9 places appear
4. Create a shop
5. Create a delivery
6. Check reminders

---

## 🐛 Troubleshooting

### Build Fails
- Verify commands are exactly as shown above
- Check build logs in Vercel
- Ensure Node.js version is 18.x

### API 500 Error
- Check MONGODB_URI is correct
- Verify MongoDB network access (0.0.0.0/0)
- Check Function Logs in Vercel

### Environment Variables Not Working
- Go to Settings → Environment Variables
- Verify all variables are added
- Select "Production", "Preview", "Development"
- Redeploy

---

## 💰 Cost

**Free Tier:**
- ✅ 100 GB bandwidth/month
- ✅ 100 GB-hours serverless execution
- ✅ Unlimited deployments
- ✅ Free SSL
- ✅ Global CDN

**Total: $0/month**

---

## 🎉 Success!

Your app will be live at:
```
https://your-app.vercel.app
```

**Features:**
- ✅ 75 places across 9 zones
- ✅ Shop management
- ✅ Delivery tracking
- ✅ Automatic 30-day reminders
- ✅ Dashboard with statistics

---

**Repository**: https://github.com/ae9-in/white-labelling---prod  
**Time**: 15 minutes  
**Cost**: $0/month

Deploy now! 🚀
