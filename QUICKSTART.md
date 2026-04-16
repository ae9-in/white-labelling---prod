# Quick Start Guide

Get the White Label Admin Dashboard running in 5 minutes!

## Prerequisites Check

```bash
node --version  # Should be v16+
npm --version   # Should be v8+
mongod --version  # Should be v5+
```

## Step 1: Install Dependencies

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## Step 2: Setup Environment

```bash
cd backend
cp .env.example .env
mkdir uploads
```

Edit `backend/.env` if needed (defaults work for local development)

## Step 3: Start MongoDB

```bash
# In a new terminal
mongod
```

Or if using MongoDB as a service:
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

## Step 4: Seed Sample Data

```bash
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

## Step 5: Start Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected: localhost
Reminder cron jobs started
```

## Step 6: Start Frontend

```bash
# In a new terminal
cd frontend
npm run dev
```

You should see:
```
VITE ready in XXX ms
➜  Local:   http://localhost:5173/
```

## Step 7: Open Application

Open your browser and go to:
```
http://localhost:5173
```

## What You'll See

### Dashboard
- 3 customers
- 3 deliveries
- 3 upcoming reminders (30-day follow-ups)
- Summary statistics

### Sample Data
**Customers:**
1. Divine Pooja Store (Delhi)
2. Spiritual Essence (Jaipur)
3. Sacred Supplies (Ahmedabad)

**Deliveries:**
- Various products including Dhoop, Agarbatti, Camphor, Oil
- Different Agarbatti types (Rose, Sandalwood, Lavender, All in 1)
- Automatic 30-day reminders created

## Test the 30-Day Reminder Feature

### Create a New Delivery
1. Go to Deliveries → Create Delivery
2. Select a customer
3. Set delivery date (e.g., today)
4. Add products:
   - Dhoop - 100g: Qty 10, Price ₹120
   - Agarbatti (Rose): Qty 20, Price ₹80
5. Click "Create Delivery"

### Verify Reminder Created
1. Go to Reminders page
2. You should see a new reminder with:
   - Title: "30-Day Follow-up for Delivery #XXXXXX"
   - Reminder Date: 30 days from delivery date
   - Status: PENDING or UPCOMING
   - Badge: "Auto-Generated"

### Test Reminder Update
1. Go back to Deliveries
2. Edit the delivery you just created
3. Change the delivery date
4. Save
5. Go to Reminders
6. The reminder date should be updated to new date + 30 days

## Common Issues

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
mongod
```

### Port Already in Use
```bash
# Backend (port 5000)
# Kill process using port 5000
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -ti:5000 | xargs kill

# Frontend (port 5173)
# Change port in frontend/vite.config.js
```

### Module Not Found
```bash
# Reinstall dependencies
cd backend && npm install
cd frontend && npm install
```

## API Testing

Import `White-Label-API.postman_collection.json` into Postman to test APIs directly.

### Quick API Test
```bash
# Test health endpoint
curl http://localhost:5000/api/v1/health

# Get customers
curl http://localhost:5000/api/v1/customers

# Get dashboard summary
curl http://localhost:5000/api/v1/dashboard/summary
```

## Next Steps

1. **Explore Features**
   - Create customers
   - Create deliveries with multiple products
   - Test Agarbatti type selection
   - Upload bills
   - Complete reminders
   - Snooze reminders

2. **Check Automation**
   - Cron jobs run daily at midnight
   - Reminder statuses update automatically
   - Missing reminders are created automatically

3. **Customize**
   - Modify product list in `backend/src/config/constants.js`
   - Adjust reminder days (currently 30) in delivery service
   - Customize UI colors in `frontend/tailwind.config.js`

## Development Tips

### Watch Logs
```bash
# Backend logs show:
# - API requests
# - Database operations
# - Cron job execution
# - Reminder creation

# Frontend shows:
# - Component renders
# - API calls
# - Errors
```

### Database Access
```bash
# Connect to MongoDB
mongosh

# Use database
use white-label-admin

# View collections
show collections

# Query data
db.customers.find()
db.deliveries.find()
db.reminders.find()
```

### Reset Data
```bash
# Drop database and reseed
mongosh white-label-admin --eval "db.dropDatabase()"
cd backend && npm run seed
```

## Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use production MongoDB URI
- [ ] Configure CORS for production domain
- [ ] Set up SSL/TLS
- [ ] Configure file upload to cloud storage
- [ ] Set up process manager (PM2)
- [ ] Configure reverse proxy (Nginx)
- [ ] Set up monitoring and logging
- [ ] Configure automated backups
- [ ] Test cron jobs in production

## Support

If you encounter issues:
1. Check MongoDB is running
2. Verify all dependencies installed
3. Check port availability
4. Review error logs
5. Ensure .env file is configured

---

🎉 You're all set! Start managing your white-label operations!
