# 🔧 Fix 404 Error on Vercel

## The Problem
Getting `404: NOT_FOUND` error when accessing your Vercel deployment.

## ✅ Solution

The issue is with the Vercel configuration. I've updated `vercel.json` with the correct routing.

### Updated Build Commands

Use these in Vercel Dashboard:

**Build Command:**
```
cd frontend && npm install && npm run build && cd ../backend && npm install
```

**Output Directory:**
```
frontend/dist
```

**Install Command:**
```
(leave empty or use: npm install)
```

---

## 🔄 How to Fix Your Deployment

### Method 1: Redeploy with Latest Code

1. The fix is already committed to GitHub
2. Go to Vercel Dashboard → Your Project
3. Go to "Deployments" tab
4. Click "..." on latest deployment
5. Click "Redeploy"
6. Wait 3-5 minutes
7. Test your app

### Method 2: Update Build Settings Manually

1. Go to Vercel Dashboard → Your Project
2. Click "Settings" tab
3. Click "General" in left sidebar
4. Scroll to "Build & Development Settings"
5. Click "Edit" or "Override"
6. Update:
   - **Build Command**: `cd frontend && npm install && npm run build && cd ../backend && npm install`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: (leave empty)
7. Click "Save"
8. Go to "Deployments" → Redeploy

---

## ✅ Verify It Works

After redeploying:

### 1. Check Homepage
```
https://your-app.vercel.app
```
Should load the dashboard (not 404)

### 2. Check API
```
https://your-app.vercel.app/api/v1/health
```
Should return:
```json
{
  "success": true,
  "message": "Server is running"
}
```

### 3. Navigate Pages
- Click "Shops" - should work
- Click "Deliveries" - should work
- Click "Reminders" - should work
- Refresh any page - should still work (not 404)

---

## 🐛 Still Getting 404?

### Check Build Logs

1. Go to Vercel Dashboard → Deployments
2. Click on latest deployment
3. Check "Building" logs
4. Look for errors

### Common Issues:

**Issue: Build fails**
- Solution: Check that `frontend/package.json` exists
- Solution: Verify Node.js version is 18.x

**Issue: API works but frontend shows 404**
- Solution: Check Output Directory is `frontend/dist`
- Solution: Verify build completed successfully

**Issue: Frontend works but API returns 404**
- Solution: Check `backend/api/index.js` exists
- Solution: Verify environment variables are set

---

## 📋 Complete Checklist

- [ ] Latest code pulled from GitHub (with vercel.json fix)
- [ ] Build command updated in Vercel
- [ ] Output directory set to `frontend/dist`
- [ ] Environment variables added:
  - [ ] NODE_ENV=production
  - [ ] MONGODB_URI=(your connection string)
  - [ ] PORT=5000
  - [ ] CORS_ORIGIN=*
- [ ] Redeployed
- [ ] Homepage loads (no 404)
- [ ] API endpoint works
- [ ] Can navigate between pages

---

## 🎯 What Changed

### Before (404 Error):
```json
{
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/frontend/dist/$1"
    }
  ]
}
```
❌ Didn't handle SPA routing properly

### After (Fixed):
```json
{
  "rewrites": [
    {
      "source": "/api/v1/(.*)",
      "destination": "/backend/api/index.js"
    }
  ]
}
```
✅ Uses rewrites for proper SPA routing
✅ All routes serve index.html
✅ React Router handles client-side routing

---

## 📞 Need More Help?

### Check These:

1. **Build Logs**: Vercel Dashboard → Deployments → Click deployment → View logs
2. **Function Logs**: Vercel Dashboard → Your Project → Functions → View logs
3. **Environment Variables**: Settings → Environment Variables

### Test Locally:

```bash
# Test frontend build
cd frontend
npm install
npm run build
npm run preview

# Test backend
cd backend
npm install
npm start
```

---

## ✅ Success Indicators

After fix, you should see:

- ✅ Homepage loads without 404
- ✅ Can navigate to all pages
- ✅ Refresh works on any page
- ✅ API endpoints respond
- ✅ Can create shops, deliveries, reminders

---

**Status**: ✅ Fixed  
**Issue**: 404 routing error  
**Solution**: Updated vercel.json configuration  
**Action**: Redeploy to apply fix
