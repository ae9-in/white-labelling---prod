# White Label Admin - Operations Hub

A comprehensive full-stack white-label delivery tracking and management system with automatic 30-day reminder functionality.

## 🚀 Features

- **Shop Management**: Manage 75+ locations across 9 zones in Karnataka
- **Delivery Tracking**: Track deliveries with detailed product information
- **Automatic Reminders**: 30-day follow-up reminders created automatically
- **Dashboard**: Real-time statistics and insights
- **Reports**: Comprehensive reporting for shops, deliveries, and reminders
- **Activity Logging**: Track all system activities
- **Notes System**: Add notes to shops and deliveries

## 📋 Tech Stack

### Backend
- Node.js + Express.js
- MongoDB (Atlas)
- Mongoose ODM
- Node-cron for scheduled tasks
- Multer for file uploads

### Frontend
- React 18 + Vite
- React Router v6
- React Hook Form
- Tailwind CSS
- Axios

## 🗺️ Coverage Areas

### 9 Zones with 75 Places:
- **Bangalore South** (9 places)
- **Bangalore North** (9 places)
- **Bangalore Central** (9 places)
- **Bangalore East** (9 places)
- **Bangalore West** (9 places)
- **Bangalore Rural** (9 places)
- **Mysore Road** (8 places)
- **Hosur** (4 places)
- **Mysore** (9 places)

## 🛠️ Installation

### Prerequisites
- Node.js 16+ and npm
- MongoDB Atlas account (or local MongoDB)

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173
```

Start backend:
```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
```

Start frontend:
```bash
npm run dev
```

For production build:
```bash
npm run build
```

## 📦 Database Seeding

To seed the database with sample data:

```bash
cd backend
node src/utils/seed-shops.js
```

## 🔧 Configuration

### Backend Environment Variables
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)
- `MONGODB_URI`: MongoDB connection string
- `CORS_ORIGIN`: Frontend URL for CORS

### Frontend Configuration
Update API base URL in `frontend/src/services/api.js` if needed.

## 📱 API Endpoints

### Shops
- `GET /api/v1/shops` - Get all shops
- `POST /api/v1/shops` - Create shop
- `GET /api/v1/shops/:id` - Get shop by ID
- `PATCH /api/v1/shops/:id` - Update shop
- `DELETE /api/v1/shops/:id` - Delete shop

### Deliveries
- `GET /api/v1/deliveries` - Get all deliveries
- `POST /api/v1/deliveries` - Create delivery (auto-creates 30-day reminder)
- `GET /api/v1/deliveries/:id` - Get delivery by ID
- `PATCH /api/v1/deliveries/:id` - Update delivery
- `DELETE /api/v1/deliveries/:id` - Delete delivery

### Reminders
- `GET /api/v1/reminders` - Get all reminders
- `PATCH /api/v1/reminders/:id/complete` - Complete reminder
- `PATCH /api/v1/reminders/:id/snooze` - Snooze reminder
- `PATCH /api/v1/reminders/:id/reschedule` - Reschedule reminder

### Dashboard
- `GET /api/v1/dashboard/summary` - Get dashboard summary
- `GET /api/v1/dashboard/upcoming-reminders` - Get upcoming reminders
- `GET /api/v1/dashboard/overdue-reminders` - Get overdue reminders
- `GET /api/v1/dashboard/recent-shops` - Get recent shops
- `GET /api/v1/dashboard/recent-deliveries` - Get recent deliveries

### Reports
- `GET /api/v1/reports/customers` - Get shops report
- `GET /api/v1/reports/deliveries` - Get deliveries report
- `GET /api/v1/reports/reminders` - Get reminders report
- `GET /api/v1/reports/product-summary` - Get product summary

## 🎨 UI Design

- **Sidebar**: Dark teal/green gradient theme
- **Navbar**: Beige/cream theme with "Operations Hub" branding
- **Forms**: Clean, modern design with cascading dropdowns
- **Tables**: Responsive with filtering and pagination

## 🔄 Automatic Reminder System

When a delivery is created:
1. System automatically creates a reminder
2. Reminder date is set to 30 days after delivery date
3. Reminder includes delivery details and shop information
4. Cron job runs daily to update reminder statuses

## 📊 Database Models

- **Shop**: Business/shop information with zone and place
- **Delivery**: Delivery records with items and amounts
- **Reminder**: Follow-up reminders (auto-generated and manual)
- **Note**: Notes attached to shops or deliveries
- **ActivityLog**: System activity tracking

## 🚀 Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Ensure MongoDB Atlas is accessible
3. Run `npm start` or use PM2 for process management

### Frontend Deployment
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Update API base URL if needed

## 📝 License

Proprietary - All rights reserved

## 👥 Support

For support, contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: April 2026
