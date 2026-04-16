# ⚙️ Vercel Dashboard Settings

## ✅ Use Vercel Dashboard (Not vercel.json)

Since vercel.json with `builds` causes errors, configure everything in Vercel Dashboard.

---

## 📋 Exact Settings for Vercel Dashboard

### 1. Go to Your Project Settings

1. Go to https://vercel.com
2. Click on your project
3. Click "Settings" tab
4. Click "General" in left sidebar
5. Scroll to "Build & Development Settings"
6. Click "Override" (if not already overridden)

### 2. Configure Build Settings

**Framework Preset:**
```
Other
```

**Root Directory:**
```
./
```
(Leave as root)

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

**Development Command:**
```
(leave empty)
```

### 3. Click "Save"

---

## 🔐 Environment Variables

Go to Settings → Environment Variables

Add these variables:

### Required (4 variables)

**1. NODE_ENV**
- Key: `NODE_ENV`
- Value: `production`
- Environments: ✅ Production, ✅ Preview, ✅ Development

**2. MONGODB_URI**
- Key: `MONGODB_URI`
- Value: `mongodb+srv://username:password@cluster.mongodb.net/white-label-admin?retryWrites=true&w=majority`
- Environments: ✅ Production, ✅ Preview, ✅ Development
- ⚠️ Replace with your actual MongoDB connection string

**3. PORT**
- Key: `PORT`
- Value: `5000`
- Environments: ✅ Production, ✅ Preview, ✅ Development

**4. CORS_ORIGIN**
- Key: `CORS_ORIGIN`
- Value: `*`
- Environments: ✅ Production, ✅ Preview, ✅ Development

### Optional (3 variables)

**5. UPLOAD_DIR**
- Key: `UPLOAD_DIR`
- Value: `./uploads`
- Environments: ✅ Production, ✅ Preview, ✅ Development

**6. MAX_FILE_SIZE**
- Key: `MAX_FILE_SIZE`
- Value: `5242880`
- Environments: ✅ Production, ✅ Preview, ✅ Development

**7. CRON_SECRET**
- Key: `CRON_SECRET`
- Value: `your-random-secret-key-123`
- Environments: ✅ Production, ✅ Preview, ✅ Development

---

## 🚀 Deploy

After configuring settings:

1. Go to "Deployments" tab
2. Click "..." on latest deployment
3. Click "Redeploy"
4. Wait 3-5 minutes
5. Done! ✅

---

## ✅ Verify Settings

### Check Build Settings

1. Settings → General
2. Build & Development Settings
3. Should show:
   - Build Command: `cd frontend && npm install && npm run build`
   - Output Directory: `frontend/dist`
   - Install Command: `cd backend && npm install`

### Check Environment Variables

1. Settings → Environment Variables
2. Should show at least 4 required variables
3. Each should have checkmarks for Production, Preview, Development

---

## 🐛 If Build Still Fails

### Clear Vercel Cache

1. Go to Deployments
2. Click "..." on latest deployment
3. Click "Redeploy"
4. Check "Clear cache and retry"
5. Click "Redeploy"

### Check Node.js Version

1. Settings → General
2. Node.js Version should be: `18.x` or `20.x`
3. If different, change it and redeploy

### Check Build Logs

1. Go to Deployments
2. Click on the failed deployment
3. Read the build logs
4. Look for specific error messages

---

## 📊 What This Configuration Does

### Frontend
- Installs dependencies in `frontend/`
- Builds React app with Vite
- Outputs to `frontend/dist/`
- Served as static files

### Backend
- Installs dependencies in `backend/`
- Runs as serverless functions
- API available at `/api/v1/*`
- Uses `/api/index.js` as entry point

### Routing
- `/` → Frontend (React app)
- `/api/v1/*` → Backend (Node.js API)
- All other routes → Frontend (for React Router)

---

## ✅ Success Indicators

After deployment:

- ✅ Build completes without errors
- ✅ Homepage loads at `https://your-app.vercel.app`
- ✅ API works at `https://your-app.vercel.app/api/v1/health`
- ✅ Can navigate all pages
- ✅ Can create shops, deliveries, reminders

---

## 📞 Still Having Issues?

### Common Problems:

**Problem: "Function Runtimes must have a valid version"**
- Solution: This is fixed! The new vercel.json doesn't have builds/functions
- Action: Redeploy with cache cleared

**Problem: Build fails with npm errors**
- Solution: Check that package.json exists in both frontend/ and backend/
- Action: Verify build command is correct

**Problem: API returns 404**
- Solution: Check that /api/index.js exists
- Action: Verify rewrites in vercel.json

**Problem: Frontend shows blank page**
- Solution: Check Output Directory is `frontend/dist`
- Action: Verify build completed successfully

---

**Status:** ✅ Configuration Ready  
**Method:** Vercel Dashboard Settings  
**No More:** Function runtime errors  
**Ready:** Deploy now!
