# Project Structure

Complete directory structure and file organization for the White Label Admin Dashboard.

## Root Structure

```
white-label-admin/
├── backend/                    # Node.js + Express backend
├── frontend/                   # React + Vite frontend
├── README.md                   # Main documentation
├── QUICKSTART.md              # Quick start guide
├── PROJECT_STRUCTURE.md       # This file
└── White-Label-API.postman_collection.json
```

## Backend Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── constants.js       # Application constants
│   │   └── database.js        # MongoDB connection
│   │
│   ├── models/
│   │   ├── Customer.js        # Customer schema
│   │   ├── Delivery.js        # Delivery schema with items
│   │   ├── Reminder.js        # Reminder schema
│   │   ├── Note.js           # Note schema
│   │   └── ActivityLog.js    # Activity log schema
│   │
│   ├── modules/
│   │   ├── customers/
│   │   │   ├── customer.routes.js
│   │   │   ├── customer.controller.js
│   │   │   ├── customer.service.js
│   │   │   └── customer.validation.js
│   │   │
│   │   ├── deliveries/
│   │   │   ├── delivery.routes.js
│   │   │   ├── delivery.controller.js
│   │   │   ├── delivery.service.js    # 30-day reminder logic
│   │   │   └── delivery.validation.js
│   │   │
│   │   ├── reminders/
│   │   │   ├── reminder.routes.js
│   │   │   ├── reminder.controller.js
│   │   │   ├── reminder.service.js
│   │   │   └── reminder.validation.js
│   │   │
│   │   ├── dashboard/
│   │   │   ├── dashboard.routes.js
│   │   │   ├── dashboard.controller.js
│   │   │   └── dashboard.service.js
│   │   │
│   │   ├── reports/
│   │   │   ├── reports.routes.js
│   │   │   ├── reports.controller.js
│   │   │   └── reports.service.js
│   │   │
│   │   └── uploads/
│   │       └── upload.middleware.js   # Multer configuration
│   │
│   ├── middleware/
│   │   ├── errorHandler.js    # Global error handler
│   │   └── validation.js      # Validation middleware
│   │
│   ├── jobs/
│   │   └── reminderJobs.js    # Cron jobs for reminders
│   │
│   ├── utils/
│   │   ├── activityLogger.js  # Activity logging utility
│   │   ├── dateHelper.js      # Date manipulation
│   │   └── seed.js           # Database seeding
│   │
│   ├── app.js                 # Express app configuration
│   └── server.js              # Server entry point
│
├── uploads/                   # File upload directory
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Frontend Structure

```
frontend/
├── public/
│   └── vite.svg
│
├── src/
│   ├── components/
│   │   ├── layouts/
│   │   │   ├── MainLayout.jsx     # Main app layout
│   │   │   ├── Sidebar.jsx        # Navigation sidebar
│   │   │   └── Navbar.jsx         # Top navbar
│   │   │
│   │   ├── common/
│   │   │   ├── StatCard.jsx       # Dashboard stat cards
│   │   │   ├── StatusBadge.jsx    # Status badges
│   │   │   ├── LoadingSpinner.jsx # Loading indicator
│   │   │   ├── EmptyState.jsx     # Empty state component
│   │   │   └── Pagination.jsx     # Pagination component
│   │   │
│   │   └── forms/
│   │       └── (form components)
│   │
│   ├── pages/
│   │   ├── dashboard/
│   │   │   └── Dashboard.jsx      # Main dashboard
│   │   │
│   │   ├── customers/
│   │   │   ├── CustomerList.jsx   # Customer listing
│   │   │   └── CustomerForm.jsx   # Add/Edit customer
│   │   │
│   │   ├── deliveries/
│   │   │   ├── DeliveryList.jsx   # Delivery listing
│   │   │   └── DeliveryForm.jsx   # Add/Edit delivery
│   │   │
│   │   ├── reminders/
│   │   │   └── ReminderList.jsx   # Reminder listing
│   │   │
│   │   └── reports/
│   │       └── (report pages)
│   │
│   ├── services/
│   │   └── api.js                 # API service layer
│   │
│   ├── hooks/
│   │   └── (custom hooks)
│   │
│   ├── utils/
│   │   └── formatters.js          # Formatting utilities
│   │
│   ├── constants/
│   │   └── index.js               # Frontend constants
│   │
│   ├── styles/
│   │   └── index.css              # Global styles + Tailwind
│   │
│   ├── App.jsx                    # Main app component
│   └── main.jsx                   # React entry point
│
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
└── README.md
```

## Key Files Explained

### Backend

#### `src/server.js`
- Entry point
- Connects to MongoDB
- Starts cron jobs
- Starts Express server

#### `src/app.js`
- Express app configuration
- Middleware setup (CORS, Helmet, rate limiting)
- Route mounting
- Error handling

#### `src/models/Delivery.js`
- Delivery schema with embedded items
- Product validation
- Total amount calculation

#### `src/modules/deliveries/delivery.service.js`
- **CRITICAL**: Contains 30-day reminder logic
- `createOrUpdate30DayReminder()` function
- Prevents duplicate reminders
- Updates reminder on delivery date change

#### `src/jobs/reminderJobs.js`
- Cron job for reminder status updates
- Cron job for missing reminder checks
- Runs daily at midnight and 1 AM

#### `src/utils/seed.js`
- Creates sample data
- Demonstrates 30-day reminder creation
- Useful for testing

### Frontend

#### `src/App.jsx`
- React Router configuration
- Route definitions
- Layout structure

#### `src/services/api.js`
- Axios configuration
- API endpoint definitions
- Error handling

#### `src/pages/deliveries/DeliveryForm.jsx`
- **CRITICAL**: Dynamic product form
- Conditional Agarbatti type selector
- Real-time subtotal calculation
- React Hook Form integration

#### `src/components/layouts/MainLayout.jsx`
- Main layout wrapper
- Sidebar + Navbar + Content area
- Responsive design

#### `src/constants/index.js`
- Product definitions
- Status enums
- Color mappings

## Data Flow

### Creating a Delivery with 30-Day Reminder

```
User Action (Frontend)
    ↓
DeliveryForm.jsx
    ↓
deliveryAPI.create()
    ↓
POST /api/v1/deliveries
    ↓
delivery.controller.js
    ↓
delivery.service.js
    ├─→ Create Delivery
    ├─→ Calculate Total
    └─→ createOrUpdate30DayReminder()
        ├─→ Check for existing reminder
        ├─→ Calculate reminderDate (deliveryDate + 30)
        └─→ Create/Update Reminder
            ↓
        Log Activity
            ↓
        Return Success
```

### Reminder Status Update (Automated)

```
Cron Job (Daily at Midnight)
    ↓
reminderJobs.js → updateReminderStatuses()
    ↓
Query Reminders
    ├─→ PENDING + date < now → OVERDUE
    ├─→ PENDING + date within 7 days → UPCOMING
    └─→ SNOOZED + snoozedUntil < now → PENDING
```

## Module Responsibilities

### Customers Module
- CRUD operations
- Status management
- Related data (deliveries, reminders, notes)

### Deliveries Module
- CRUD operations
- Product item management
- Bill upload
- **30-day reminder automation**

### Reminders Module
- List and filter
- Complete with notes
- Snooze functionality
- Reschedule

### Dashboard Module
- Summary statistics
- Recent data
- Status breakdowns

### Reports Module
- Customer reports
- Delivery reports
- Product summaries

## Database Collections

### customers
```javascript
{
  _id: ObjectId,
  businessName: String,
  contactPersonName: String,
  phoneNumber1: String,
  phoneNumber2: String,
  email: String,
  address: {...},
  status: String,
  isArchived: Boolean,
  timestamps
}
```

### deliveries
```javascript
{
  _id: ObjectId,
  customerId: ObjectId,
  deliveryDate: Date,
  deliveryStatus: String,
  items: [{
    product: String,
    type: String,
    quantity: Number,
    price: Number,
    subtotal: Number
  }],
  totalAmount: Number,
  billFileUrl: String,
  timestamps
}
```

### reminders
```javascript
{
  _id: ObjectId,
  customerId: ObjectId,
  deliveryId: ObjectId,
  reminderType: String,
  reminderDate: Date,
  status: String,
  title: String,
  description: String,
  completedAt: Date,
  snoozedUntil: Date,
  completionNote: String,
  createdBySystem: Boolean,
  timestamps
}
```

## API Endpoints Summary

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /api/v1/customers | List customers |
| POST | /api/v1/customers | Create customer |
| GET | /api/v1/deliveries | List deliveries |
| POST | /api/v1/deliveries | Create delivery + auto-reminder |
| PATCH | /api/v1/deliveries/:id | Update delivery + update reminder |
| GET | /api/v1/reminders | List reminders |
| PATCH | /api/v1/reminders/:id/complete | Complete reminder |
| GET | /api/v1/dashboard/summary | Dashboard stats |

## Environment Configuration

### Development
- Backend: http://localhost:5000
- Frontend: http://localhost:5173
- MongoDB: mongodb://localhost:27017

### Production
- Set NODE_ENV=production
- Use production MongoDB URI
- Configure CORS for production domain
- Set up SSL/TLS
- Use cloud storage for uploads

## Build Commands

### Backend
```bash
npm start          # Production
npm run dev        # Development with nodemon
npm run seed       # Seed database
```

### Frontend
```bash
npm run dev        # Development server
npm run build      # Production build
npm run preview    # Preview production build
```

## Testing Strategy

1. **Unit Tests**: Service layer functions
2. **Integration Tests**: API endpoints
3. **E2E Tests**: Critical user flows
4. **Manual Tests**: 30-day reminder logic

## Deployment Architecture

```
[Frontend - Static Files]
        ↓
[CDN / Static Hosting]
        ↓
[Backend - Node.js]
        ↓
[MongoDB Database]
        ↓
[File Storage - Local/Cloud]
```

---

This structure ensures:
- ✅ Modular and maintainable code
- ✅ Clear separation of concerns
- ✅ Scalable architecture
- ✅ Easy to test and debug
- ✅ Production-ready organization
