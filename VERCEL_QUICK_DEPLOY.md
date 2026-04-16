# ⚡ Vercel Quick Deploy Guide

## 🎯 Build Commands (Copy-Paste to Vercel)

```
Framework Preset: Other
Root Directory: ./
Build Command: npm run build
Output Directory: frontend/dist
Install Command: npm install && cd backend && npm install
```

---

## 🔐 Environment Variables (Copy-Paste to Vercel)

### Required (4 variables)

```
NODE_ENV=production
```

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/white-label-admin?retryWrites=true&w=majority
```
⚠️ **REPLACE** with your actual MongoDB connection string

```
PORT=5000
```

```
CORS_ORIGIN=*
```

### Optional (3 variables)

```
UPLOAD_DIR=./uploads
```

```
MAX_FILE_SIZE=5242880
```

```
CRON_SECRET=your-random-secret-key-123
```

---

## 📋 Quick Deploy Steps

### 1. MongoDB Setup (5 min)
```
1. Go to https://cloud.mongodb.com
2. Create free cluster (M0)
3. Create user: whitelabel_admin
4. Network Access: 0.0.0.0/0
5. Get connection string
```

### 2. Vercel Deploy (10 min)
```
1. Go to https://vercel.com
2. Sign up with GitHub
3. Import: ae9-in/white-labelling---prod
4. Configure:
   - Framework: Other
   - Root: ./
   - Build: npm run build
   - Output: frontend/dist
   - Install: npm install && cd backend && npm install
5. Add 4 required environment variables
6. Deploy
7. Done! 🎉
```

---

## ✅ Test After Deploy

### Backend Health Check
```
https://your-app.vercel.app/api/v1/health
```
Should return: `{"success": true, "message": "Server is running"}`

### Frontend
```
https://your-app.vercel.app
```
Should load dashboard

### Create Test Shop
```
1. Go to Shops → Add New Shop
2. Select Zone: Bangalore South
3. Verify 9 places appear
4. Create shop
```

---

## 🐛 Common Issues

### Build Fails
- Check Node.js version is 18.x
- Verify package.json exists in root
- Check build logs in Vercel

### API 500 Error
- Verify MONGODB_URI is correct
- Check MongoDB network access
- View Function Logs in Vercel

### CORS Error
- Set CORS_ORIGIN=*
- Redeploy after changing

---

## 📞 Full Guide

See `VERCEL_DEPLOYMENT_CONFIG.md` for detailed instructions.

---

**Time**: 15 minutes  
**Cost**: $0 (Free tier)  
**Result**: Live full-stack app on Vercel
