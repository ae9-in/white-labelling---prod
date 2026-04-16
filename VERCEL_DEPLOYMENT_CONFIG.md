# 🚀 Vercel Deployment Configuration

## Exact Build Commands for Vercel

### Framework Preset
```
Other
```

### Root Directory
```
./
```
(Leave as root, don't change)

### Build Command
```
npm run build
```

### Output Directory
```
frontend/dist
```

### Install Command
```
npm install && cd backend && npm install
```

### Development Command (Optional)
```
npm run dev:frontend
```

---

## 📋 Environment Variables for Vercel

Copy and paste these **EXACTLY** into Vercel Dashboard:

### Required Variables

| Key | Value | Notes |
|-----|-------|-------|
| `NODE_ENV` | `production` | Set environment to production |
| `MONGODB_URI` | `mongodb+srv://username:password@cluster.mongodb.net/white-label-admin?retryWrites=true&w=majority` | **Replace with your MongoDB connection string** |
| `PORT` | `5000` | Backend port |
| `CORS_ORIGIN` | `*` | Allow all origins (or set to your domain) |

### Optional Variables

| Key | Value | Notes |
|-----|-------|-------|
| `UPLOAD_DIR` | `./uploads` | File upload directory |
| `MAX_FILE_SIZE` | `5242880` | Max file size (5MB) |
| `CRON_SECRET` | `your-random-secret-key-123` | Optional: Secure cron endpoint |

---

## 🔐 MongoDB Connection String Format

Your `MONGODB_URI` should look like this:

```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE?retryWrites=true&w=majority
```

### Example:
```
mongodb+srv://whitelabel_admin:MyP@ssw0rd123@cluster0.abc123.mongodb.net/white-label-admin?retryWrites=true&w=majority
```

### How to Get It:

1. Go to https://cloud.mongodb.com
2. Click "Database" → "Connect"
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Add database name: `white-label-admin`

---

## 📝 Step-by-Step: Add Environment Variables in Vercel

### Method 1: During Initial Deployment

1. Import your project from GitHub
2. Before clicking "Deploy", scroll down to "Environment Variables"
3. Add each variable:
   - Click "Add" for each variable
   - Enter Key (e.g., `NODE_ENV`)
   - Enter Value (e.g., `production`)
   - Select "Production", "Preview", and "Development"
   - Click "Add"
4. Repeat for all variables
5. Click "Deploy"

### Method 2: After Deployment

1. Go to your project in Vercel Dashboard
2. Click "Settings" tab
3. Click "Environment Variables" in left sidebar
4. For each variable:
   - Click "Add New"
   - Enter Key and Value
   - Select all environments (Production, Preview, Development)
   - Click "Save"
5. After adding all variables, go to "Deployments" tab
6. Click "..." on latest deployment → "Redeploy"

---

## 🎯 Complete Environment Variables Template

Copy this template and fill in your values:

```env
# Required - Core Settings
NODE_ENV=production
PORT=5000

# Required - Database (REPLACE WITH YOUR MONGODB CONNECTION STRING)
MONGODB_URI=mongodb+srv://whitelabel_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/white-label-admin?retryWrites=true&w=majority

# Required - CORS
CORS_ORIGIN=*

# Optional - File Uploads
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880

# Optional - Cron Security
CRON_SECRET=your-random-secret-key-123
```

---

## 🔧 Vercel Dashboard Configuration

### Project Settings

**General:**
- Node.js Version: `18.x` (auto-detected)
- Framework: `Other`
- Root Directory: `./`

**Build & Development Settings:**
- Build Command: `npm run build`
- Output Directory: `frontend/dist`
- Install Command: `npm install && cd backend && npm install`
- Development Command: `npm run dev:frontend`

**Environment Variables:**
- Add all variables listed above
- Make sure to select all environments (Production, Preview, Development)

---

## 🚀 Deployment Steps

### 1. Push to GitHub (Already Done ✅)

Your code is at: https://github.com/ae9-in/white-labelling---prod

### 2. Setup MongoDB Atlas

1. Go to https://cloud.mongodb.com
2. Create free cluster (M0)
3. Create database user
4. Whitelist IP: `0.0.0.0/0`
5. Get connection string
6. Save it for Vercel environment variables

### 3. Deploy to Vercel

1. Go to https://vercel.com
2. Sign up/Login with GitHub
3. Click "Add New..." → "Project"
4. Import: `ae9-in/white-labelling---prod`
5. Configure:
   - Framework: `Other`
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `frontend/dist`
   - Install Command: `npm install && cd backend && npm install`
6. Add Environment Variables (see template above)
7. Click "Deploy"
8. Wait 3-5 minutes
9. Done! 🎉

---

## ✅ Verification Checklist

After deployment, verify:

### Backend API
```
https://your-app.vercel.app/api/v1/health
```
Expected response:
```json
{
  "success": true,
  "message": "Server is running"
}
```

### Frontend
```
https://your-app.vercel.app
```
- Should load the dashboard
- Navigate to "Shops" → "Add New Shop"
- Select Zone: "Bangalore South"
- Verify 9 places appear in dropdown

### Cron Endpoint (Optional)
```
https://your-app.vercel.app/api/v1/cron/update-reminders
```
Expected response:
```json
{
  "success": true,
  "message": "Reminder statuses updated successfully",
  "timestamp": "2026-04-16T..."
}
```

---

## 🐛 Troubleshooting

### Build Fails

**Error**: "Build failed"

**Solution**:
1. Check build logs in Vercel dashboard
2. Verify `package.json` exists in root
3. Ensure Node.js version is 18.x or higher
4. Check that frontend/package.json exists

### API Returns 500 Error

**Error**: "Internal Server Error"

**Solution**:
1. Check Function Logs in Vercel dashboard
2. Verify `MONGODB_URI` is correct
3. Check MongoDB Atlas network access (0.0.0.0/0)
4. Verify database user credentials

### Environment Variables Not Working

**Error**: Variables are undefined

**Solution**:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Verify all variables are added
3. Make sure "Production" is selected
4. Redeploy: Deployments → ... → Redeploy

### CORS Errors

**Error**: "CORS policy blocked"

**Solution**:
1. Set `CORS_ORIGIN=*` in Vercel environment variables
2. Or set to your specific domain
3. Redeploy after changing

---

## 📊 Build Output

After successful build, you should see:

```
✓ Building frontend...
✓ Installing dependencies...
✓ Running build command...
✓ Build completed
✓ Deploying...
✓ Deployment ready

Your deployment is now live at:
https://your-app.vercel.app
```

---

## 🔄 Updating After Deployment

### Automatic Updates
Every `git push` to `main` branch automatically deploys to Vercel.

### Manual Redeploy
1. Go to Vercel Dashboard
2. Click "Deployments" tab
3. Click "..." on any deployment
4. Click "Redeploy"

### Update Environment Variables
1. Go to Settings → Environment Variables
2. Edit or add variables
3. Go to Deployments → Redeploy

---

## 💰 Vercel Limits (Free Tier)

- ✅ 100 GB bandwidth/month
- ✅ 100 GB-hours serverless execution/month
- ✅ Unlimited deployments
- ✅ 10 second function timeout
- ✅ 4.5 MB request body limit

**Upgrade to Pro ($20/month) for:**
- 1 TB bandwidth
- 60 second timeout
- 50 MB request limit

---

## 🎉 Success!

Once deployed, your app will be live at:
```
https://your-app-name.vercel.app
```

**Features:**
- ✅ Frontend and Backend on same domain
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Auto-deploy on git push
- ✅ 75 places across 9 zones
- ✅ Automatic 30-day reminders
- ✅ Daily cron job for reminder updates

---

## 📞 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **MongoDB Docs**: https://docs.mongodb.com

---

**Status**: ✅ Ready to Deploy  
**Time**: 15 minutes  
**Cost**: $0/month (Free tier)
