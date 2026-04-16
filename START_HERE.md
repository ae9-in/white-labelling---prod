# 🚀 Start Your White Label Admin Dashboard

## ⚠️ MongoDB Required

MongoDB is not currently installed on your system. You need to install it first.

### Install MongoDB on Windows

**Option 1: MongoDB Community Server (Recommended)**
1. Download from: https://www.mongodb.com/try/download/community
2. Choose "Windows x64" version
3. Run the installer
4. Choose "Complete" installation
5. Install as a Windows Service (recommended)
6. Install MongoDB Compass (optional GUI tool)

**Option 2: Using Chocolatey**
```powershell
choco install mongodb
```

**Option 3: Using Docker**
```powershell
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Verify MongoDB Installation

After installation, verify it's running:
```powershell
mongod --version
```

Or check if the service is running:
```powershell
Get-Service MongoDB
```

---

## 🎯 Once MongoDB is Installed

### Step 1: Seed the Database
```powershell
cd backend
npm run seed
```

You should see:
```
✅ Seed data created successfully!

Summary:
- Customers: 3
- Deliveries: 3
- Reminders: 3 (auto-generated 30-day reminders)
- Notes: 3
```

### Step 2: Start Backend Server
```powershell
cd backend
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected: localhost
Reminder cron jobs started
```

### Step 3: Start Frontend (New Terminal)
```powershell
cd frontend
npm run dev
```

You should see:
```
VITE ready in XXX ms
➜  Local:   http://localhost:5173/
```

### Step 4: Open Application
Open your browser and go to:
```
http://localhost:5173
```

---

## 🎉 What You'll See

### Dashboard
- 3 sample customers
- 3 deliveries
- 3 upcoming reminders (30-day follow-ups)
- Summary statistics

### Sample Customers
1. **Divine Pooja Store** (Delhi)
2. **Spiritual Essence** (Jaipur)
3. **Sacred Supplies** (Ahmedabad)

### Test the 30-Day Reminder Feature
1. Go to **Deliveries** → **Create Delivery**
2. Select a customer
3. Set delivery date (e.g., today)
4. Add products (Dhoop, Agarbatti, etc.)
5. Click **Create Delivery**
6. Go to **Reminders** page
7. You'll see a new reminder dated 30 days from delivery date!

---

## 🔧 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB service is running
```powershell
# Start MongoDB service
net start MongoDB

# Or if using Docker
docker start mongodb
```

### Port Already in Use
**Backend (Port 5000)**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Frontend (Port 5173)**
- Change port in `frontend/vite.config.js`

### Module Not Found
```powershell
# Reinstall dependencies
cd backend
npm install

cd frontend
npm install
```

---

## 📱 Quick Commands Reference

### Backend
```powershell
cd backend
npm install          # Install dependencies
npm run seed         # Seed database
npm run dev          # Start development server
npm start            # Start production server
```

### Frontend
```powershell
cd frontend
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
```

---

## 🎯 Current Status

✅ Backend dependencies installed
✅ Frontend dependencies installed
⏳ MongoDB needs to be installed
⏳ Database needs to be seeded
⏳ Servers need to be started

---

## 🆘 Need Help?

1. Check MongoDB is installed: `mongod --version`
2. Check MongoDB is running: `Get-Service MongoDB`
3. Check backend logs for errors
4. Check frontend console for errors
5. Verify .env file exists in backend folder

---

## 🌐 Application URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api/v1
- **Health Check**: http://localhost:5000/api/v1/health

---

## 📚 Documentation

- **README.md** - Complete documentation
- **QUICKSTART.md** - Quick setup guide
- **PROJECT_STRUCTURE.md** - File structure
- **IMPLEMENTATION_SUMMARY.md** - Feature checklist

---

**Next Step**: Install MongoDB, then run the seed script!
