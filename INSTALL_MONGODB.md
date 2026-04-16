# 📦 Install MongoDB on Windows

## Quick Installation Guide

### Method 1: MongoDB Community Server (Recommended)

#### Step 1: Download MongoDB
1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - **Version**: 7.0.x (Current)
   - **Platform**: Windows
   - **Package**: MSI
3. Click **Download**

#### Step 2: Install MongoDB
1. Run the downloaded `.msi` file
2. Choose **Complete** setup type
3. **Important**: Check "Install MongoDB as a Service"
   - Service Name: MongoDB
   - Data Directory: C:\Program Files\MongoDB\Server\7.0\data\
   - Log Directory: C:\Program Files\MongoDB\Server\7.0\log\
4. **Optional**: Install MongoDB Compass (GUI tool)
5. Click **Install**

#### Step 3: Verify Installation
Open PowerShell and run:
```powershell
mongod --version
```

You should see something like:
```
db version v7.0.x
```

#### Step 4: Check Service is Running
```powershell
Get-Service MongoDB
```

Should show:
```
Status   Name               DisplayName
------   ----               -----------
Running  MongoDB            MongoDB
```

If not running, start it:
```powershell
net start MongoDB
```

---

### Method 2: Using Chocolatey (If you have Chocolatey installed)

```powershell
# Install Chocolatey first if you don't have it
# Run PowerShell as Administrator
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install MongoDB
choco install mongodb

# Start MongoDB service
net start MongoDB
```

---

### Method 3: Using Docker (If you have Docker Desktop)

```powershell
# Pull and run MongoDB container
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Verify it's running
docker ps

# To stop
docker stop mongodb

# To start again
docker start mongodb
```

---

## After MongoDB is Installed

### 1. Verify Connection
```powershell
# Connect to MongoDB shell
mongosh
```

You should see:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017/
Using MongoDB: 7.0.x
```

Type `exit` to quit.

### 2. Seed the Database
```powershell
cd backend
npm run seed
```

Expected output:
```
MongoDB Connected: localhost
Created 3 customers
Created 3 deliveries with auto-generated reminders
Created 3 notes

✅ Seed data created successfully!

Summary:
- Customers: 3
- Deliveries: 3
- Reminders: 3 (auto-generated 30-day reminders)
- Notes: 3
```

### 3. Start Backend Server
```powershell
cd backend
npm run dev
```

Expected output:
```
Server running on port 5000
Environment: development
MongoDB Connected: localhost
Reminder cron jobs started
```

### 4. Start Frontend Server (New Terminal)
```powershell
cd frontend
npm run dev
```

Expected output:
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

### 5. Open Application
Open your browser:
```
http://localhost:5173
```

---

## Troubleshooting

### MongoDB Service Won't Start

**Check if port 27017 is in use:**
```powershell
netstat -ano | findstr :27017
```

**If port is in use, kill the process:**
```powershell
# Find PID from above command, then:
taskkill /PID <PID> /F
```

**Try starting service again:**
```powershell
net start MongoDB
```

### MongoDB Not Found After Installation

**Add MongoDB to PATH:**
1. Open System Properties → Environment Variables
2. Edit PATH variable
3. Add: `C:\Program Files\MongoDB\Server\7.0\bin`
4. Restart PowerShell

### Connection Refused Error

**Error:**
```
MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
1. Check MongoDB service is running: `Get-Service MongoDB`
2. If stopped, start it: `net start MongoDB`
3. If using Docker: `docker start mongodb`

### Data Directory Error

**Error:**
```
Data directory not found
```

**Solution:**
Create data directory:
```powershell
mkdir C:\data\db
```

Then start MongoDB:
```powershell
mongod --dbpath C:\data\db
```

---

## Alternative: MongoDB Atlas (Cloud)

If you prefer not to install MongoDB locally, use MongoDB Atlas (free tier):

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create a free cluster
4. Get connection string
5. Update `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/white-label-admin
   ```

---

## Quick Test

After MongoDB is running, test the connection:

```powershell
# Test with mongosh
mongosh

# Or test with Node.js
node -e "const mongoose = require('mongoose'); mongoose.connect('mongodb://localhost:27017/test').then(() => console.log('✅ Connected!')).catch(err => console.log('❌ Error:', err.message))"
```

---

## Next Steps

Once MongoDB is installed and running:

1. ✅ Seed database: `npm run seed` (in backend folder)
2. ✅ Start backend: `npm run dev` (in backend folder)
3. ✅ Start frontend: `npm run dev` (in frontend folder)
4. ✅ Open: http://localhost:5173

---

## System Requirements

- **Windows**: 10 or later (64-bit)
- **RAM**: 4GB minimum
- **Disk Space**: 500MB for MongoDB
- **Ports**: 27017 (MongoDB), 5000 (Backend), 5173 (Frontend)

---

**Need help?** Check the official MongoDB documentation:
https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/
