# 🗄️ Database Information

## ✅ Database Created Successfully!

### Database Details
- **Database Name**: `white-label-admin`
- **Host**: MongoDB Atlas (Cloud)
- **Connection**: mongodb+srv://jishnu:jishnu123@cluster088.fqd6r2u.mongodb.net/white-label-admin

---

## 📊 Collections Created

### 1. **customers** Collection
Stores customer/business information.

**Schema:**
```javascript
{
  _id: ObjectId,
  businessName: String,           // Business name
  contactPersonName: String,      // Contact person
  phoneNumber1: String,           // Primary phone
  phoneNumber2: String,           // Secondary phone (optional)
  email: String,                  // Email address
  addressLine1: String,           // Address line 1
  addressLine2: String,           // Address line 2
  area: String,                   // Area/locality
  city: String,                   // City
  state: String,                  // State
  pincode: String,                // Postal code
  description: String,            // Notes/description
  businessCategory: String,       // Business category
  status: String,                 // NEW, ACTIVE, DELIVERY_ACTIVE, FOLLOW_UP_REQUIRED, INACTIVE
  isArchived: Boolean,            // Soft delete flag
  createdAt: Date,
  updatedAt: Date
}
```

**Sample Data (3 customers):**
1. Divine Pooja Store (Delhi) - ACTIVE
2. Spiritual Essence (Jaipur) - DELIVERY_ACTIVE
3. Sacred Supplies (Ahmedabad) - NEW

**Indexes:**
- Text index on: businessName, contactPersonName, city, area
- Index on: status, city, createdAt

---

### 2. **deliveries** Collection
Stores delivery information with embedded product items.

**Schema:**
```javascript
{
  _id: ObjectId,
  customerId: ObjectId,           // Reference to customers
  deliveryDate: Date,             // Delivery date
  deliveryStatus: String,         // CREATED, CONFIRMED, DISPATCHED, DELIVERED, CANCELLED, FOLLOW_UP_PENDING
  notes: String,                  // Delivery notes
  billFileUrl: String,            // Uploaded bill file path
  billFileName: String,           // Original filename
  billMimeType: String,           // File MIME type
  items: [                        // Product items array
    {
      product: String,            // Product name
      type: String,               // Product type (for Agarbatti)
      quantity: Number,           // Quantity
      price: Number,              // Price per unit
      subtotal: Number            // quantity × price
    }
  ],
  totalAmount: Number,            // Sum of all subtotals
  createdAt: Date,
  updatedAt: Date
}
```

**Sample Data (3 deliveries):**
1. Delivery 1: Dhoop, Agarbatti (Rose), Camphor - ₹18,500
2. Delivery 2: Agarbatti (Sandalwood, Lavender), Oil, Cotton Wicks - ₹38,750
3. Delivery 3: Packaging Cover, Agarbatti (All in 1) - ₹10,100

**Indexes:**
- Index on: customerId + deliveryDate
- Index on: deliveryStatus
- Index on: deliveryDate

---

### 3. **reminders** Collection
Stores follow-up reminders (auto-generated and manual).

**Schema:**
```javascript
{
  _id: ObjectId,
  customerId: ObjectId,           // Reference to customers
  deliveryId: ObjectId,           // Reference to deliveries (optional)
  reminderType: String,           // WHITE_LABEL_30_DAY_FOLLOWUP, MANUAL
  reminderDate: Date,             // Reminder date
  status: String,                 // PENDING, UPCOMING, DONE, OVERDUE, SNOOZED, CANCELLED
  title: String,                  // Reminder title
  description: String,            // Reminder description
  completedAt: Date,              // Completion timestamp
  snoozedUntil: Date,             // Snooze until date
  completionNote: String,         // Note when completed
  createdBySystem: Boolean,       // Auto-generated flag
  createdAt: Date,
  updatedAt: Date
}
```

**Sample Data (3 reminders):**
- All 3 are auto-generated 30-day follow-up reminders
- Each linked to a delivery
- Reminder dates = delivery date + 30 days

**Indexes:**
- Index on: customerId + reminderDate
- Index on: deliveryId
- Index on: status
- Index on: reminderDate
- Index on: reminderType

---

### 4. **notes** Collection
Stores notes related to customers and deliveries.

**Schema:**
```javascript
{
  _id: ObjectId,
  customerId: ObjectId,           // Reference to customers
  deliveryId: ObjectId,           // Reference to deliveries (optional)
  content: String,                // Note content
  noteType: String,               // GENERAL, DELIVERY, FOLLOW_UP, REMINDER_COMPLETION
  createdAt: Date,
  updatedAt: Date
}
```

**Sample Data (3 notes):**
1. General note for customer 1
2. Delivery note for customer 2
3. Follow-up note for customer 1

**Indexes:**
- Index on: customerId + createdAt
- Index on: deliveryId

---

### 5. **activitylogs** Collection
Stores activity logs for audit trail.

**Schema:**
```javascript
{
  _id: ObjectId,
  entityType: String,             // Customer, Delivery, Reminder, Note
  entityId: ObjectId,             // Reference to entity
  action: String,                 // CUSTOMER_CREATED, DELIVERY_CREATED, REMINDER_AUTO_CREATED, etc.
  message: String,                // Activity message
  metadata: Mixed,                // Additional data
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- Index on: entityType + entityId + createdAt
- Index on: createdAt

---

## 🎯 Key Features

### Automatic 30-Day Reminder System
When a delivery is created:
1. System calculates: `reminderDate = deliveryDate + 30 days`
2. Creates reminder with:
   - `reminderType: WHITE_LABEL_30_DAY_FOLLOWUP`
   - `createdBySystem: true`
   - Linked to delivery via `deliveryId`
3. If delivery date changes, reminder date updates automatically
4. No duplicate reminders for same delivery

### Example:
```
Delivery Date: 2026-04-10
Reminder Date: 2026-05-10 (automatically calculated)
```

---

## 📦 Products Supported

1. **Dhoop - 100g** (no type required)
2. **Camphor - 100g** (no type required)
3. **Cotton Wicks - 1 packet** (no type required)
4. **Agarbatti** (requires type):
   - Rose
   - Sandalwood
   - Lavender
   - All in 1
5. **Oil - 1L** (no type required)
6. **Packaging Cover** (no type required)

---

## 🔄 Automated Jobs

### Reminder Status Updater (Daily at Midnight)
```javascript
// Updates reminder statuses
PENDING + date < now → OVERDUE
PENDING + date within 7 days → UPCOMING
SNOOZED + snoozedUntil < now → PENDING
```

### Missing Reminder Checker (Daily at 1 AM)
```javascript
// Finds deliveries without 30-day reminders
// Creates missing reminders
// Ensures data integrity
```

---

## 📊 Sample Data Summary

### Customers (3)
| Business Name | City | Status |
|---------------|------|--------|
| Divine Pooja Store | Delhi | ACTIVE |
| Spiritual Essence | Jaipur | DELIVERY_ACTIVE |
| Sacred Supplies | Ahmedabad | NEW |

### Deliveries (3)
| Customer | Date | Items | Amount |
|----------|------|-------|--------|
| Divine Pooja Store | 2026-03-15 | 3 items | ₹18,500 |
| Spiritual Essence | 2026-04-01 | 4 items | ₹38,750 |
| Divine Pooja Store | 2026-04-10 | 2 items | ₹10,100 |

### Reminders (3)
| Customer | Delivery Date | Reminder Date | Status |
|----------|---------------|---------------|--------|
| Divine Pooja Store | 2026-03-15 | 2026-04-14 | UPCOMING |
| Spiritual Essence | 2026-04-01 | 2026-05-01 | UPCOMING |
| Divine Pooja Store | 2026-04-10 | 2026-05-10 | PENDING |

---

## 🔍 View Your Data

### Using MongoDB Atlas Web Interface
1. Go to: https://cloud.mongodb.com
2. Login with your credentials
3. Click on "Browse Collections"
4. Select database: `white-label-admin`
5. View collections: customers, deliveries, reminders, notes, activitylogs

### Using MongoDB Compass (Desktop App)
1. Download: https://www.mongodb.com/try/download/compass
2. Connect using: `mongodb+srv://jishnu:jishnu123@cluster088.fqd6r2u.mongodb.net/white-label-admin`
3. Browse collections visually

### Using mongosh (Command Line)
```bash
mongosh "mongodb+srv://jishnu:jishnu123@cluster088.fqd6r2u.mongodb.net/white-label-admin"

# View collections
show collections

# Query customers
db.customers.find().pretty()

# Query deliveries
db.deliveries.find().pretty()

# Query reminders
db.reminders.find().pretty()

# Count documents
db.customers.countDocuments()
db.deliveries.countDocuments()
db.reminders.countDocuments()
```

---

## ✅ Database Status

| Component | Status | Count |
|-----------|--------|-------|
| Database | ✅ Created | white-label-admin |
| Collections | ✅ Created | 5 collections |
| Customers | ✅ Seeded | 3 documents |
| Deliveries | ✅ Seeded | 3 documents |
| Reminders | ✅ Seeded | 3 documents (auto-generated) |
| Notes | ✅ Seeded | 3 documents |
| Activity Logs | ✅ Created | Multiple entries |
| Indexes | ✅ Created | Optimized for queries |

---

## 🚀 Next Steps

Your database is ready! Now you can:

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend Server** (new terminal)
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open Application**
   ```
   http://localhost:5173
   ```

---

## 🔐 Security Notes

- ✅ Connection uses SSL/TLS (MongoDB Atlas)
- ✅ Credentials are in .env file (not committed to git)
- ✅ Database has proper indexes for performance
- ✅ Validation rules applied at application level
- ⚠️ For production, create a separate user with limited permissions

---

**Database is ready! Start the servers and begin using the application! 🎉**
