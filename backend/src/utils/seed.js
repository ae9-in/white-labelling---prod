import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Customer from '../models/Customer.js';
import Delivery from '../models/Delivery.js';
import Reminder from '../models/Reminder.js';
import Note from '../models/Note.js';
import { CUSTOMER_STATUS, DELIVERY_STATUS, PRODUCTS, AGARBATTI_TYPES, REMINDER_TYPE, REMINDER_STATUS } from '../config/constants.js';
import { addDays } from '../utils/dateHelper.js';

const seedData = async () => {
  try {
    await connectDatabase();

    await Customer.deleteMany({});
    await Delivery.deleteMany({});
    await Reminder.deleteMany({});
    await Note.deleteMany({});

    console.log('Cleared existing data');

    const customers = await Customer.insertMany([
      {
        businessName: 'Divine Pooja Store',
        contactPersonName: 'Rajesh Kumar',
        phoneNumber1: '9876543210',
        phoneNumber2: '9876543211',
        email: 'rajesh@divinepooja.com',
        addressLine1: '123 Temple Street',
        addressLine2: 'Near Main Market',
        area: 'Karol Bagh',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110005',
        description: 'Leading pooja items retailer',
        businessCategory: 'Retail',
        status: CUSTOMER_STATUS.ACTIVE
      },
      {
        businessName: 'Spiritual Essence',
        contactPersonName: 'Priya Sharma',
        phoneNumber1: '9123456789',
        email: 'priya@spiritualessence.com',
        addressLine1: '456 Gandhi Road',
        area: 'Malviya Nagar',
        city: 'Jaipur',
        state: 'Rajasthan',
        pincode: '302017',
        description: 'Premium spiritual products',
        businessCategory: 'Wholesale',
        status: CUSTOMER_STATUS.DELIVERY_ACTIVE
      },
      {
        businessName: 'Sacred Supplies',
        contactPersonName: 'Amit Patel',
        phoneNumber1: '9988776655',
        phoneNumber2: '9988776656',
        email: 'amit@sacredsupplies.com',
        addressLine1: '789 Market Lane',
        area: 'Navrangpura',
        city: 'Ahmedabad',
        state: 'Gujarat',
        pincode: '380009',
        businessCategory: 'Retail',
        status: CUSTOMER_STATUS.NEW
      }
    ]);

    console.log(`Created ${customers.length} customers`);

    const deliveries = [];
    
    const delivery1 = await Delivery.create({
      customerId: customers[0]._id,
      deliveryDate: new Date('2026-03-15'),
      deliveryStatus: DELIVERY_STATUS.DELIVERED,
      notes: 'First delivery completed successfully',
      items: [
        {
          product: PRODUCTS.DHOOP,
          quantity: 50,
          price: 120,
          subtotal: 6000
        },
        {
          product: PRODUCTS.AGARBATTI,
          type: AGARBATTI_TYPES.ROSE,
          quantity: 100,
          price: 80,
          subtotal: 8000
        },
        {
          product: PRODUCTS.CAMPHOR,
          quantity: 30,
          price: 150,
          subtotal: 4500
        }
      ],
      totalAmount: 18500
    });
    deliveries.push(delivery1);

    await Reminder.create({
      customerId: customers[0]._id,
      deliveryId: delivery1._id,
      reminderType: REMINDER_TYPE.WHITE_LABEL_30_DAY_FOLLOWUP,
      reminderDate: addDays(delivery1.deliveryDate, 30),
      status: REMINDER_STATUS.UPCOMING,
      title: `30-Day Follow-up for Delivery #${delivery1._id.toString().slice(-6)}`,
      description: 'Follow-up reminder for delivery dated 2026-03-15',
      createdBySystem: true
    });

    const delivery2 = await Delivery.create({
      customerId: customers[1]._id,
      deliveryDate: new Date('2026-04-01'),
      deliveryStatus: DELIVERY_STATUS.DELIVERED,
      notes: 'Large order delivered',
      items: [
        {
          product: PRODUCTS.AGARBATTI,
          type: AGARBATTI_TYPES.SANDALWOOD,
          quantity: 200,
          price: 90,
          subtotal: 18000
        },
        {
          product: PRODUCTS.AGARBATTI,
          type: AGARBATTI_TYPES.LAVENDER,
          quantity: 150,
          price: 85,
          subtotal: 12750
        },
        {
          product: PRODUCTS.OIL,
          quantity: 20,
          price: 250,
          subtotal: 5000
        },
        {
          product: PRODUCTS.COTTON_WICKS,
          quantity: 100,
          price: 30,
          subtotal: 3000
        }
      ],
      totalAmount: 38750
    });
    deliveries.push(delivery2);

    await Reminder.create({
      customerId: customers[1]._id,
      deliveryId: delivery2._id,
      reminderType: REMINDER_TYPE.WHITE_LABEL_30_DAY_FOLLOWUP,
      reminderDate: addDays(delivery2.deliveryDate, 30),
      status: REMINDER_STATUS.UPCOMING,
      title: `30-Day Follow-up for Delivery #${delivery2._id.toString().slice(-6)}`,
      description: 'Follow-up reminder for delivery dated 2026-04-01',
      createdBySystem: true
    });

    const delivery3 = await Delivery.create({
      customerId: customers[0]._id,
      deliveryDate: new Date('2026-04-10'),
      deliveryStatus: DELIVERY_STATUS.DELIVERED,
      items: [
        {
          product: PRODUCTS.PACKAGING_COVER,
          quantity: 500,
          price: 5,
          subtotal: 2500
        },
        {
          product: PRODUCTS.AGARBATTI,
          type: AGARBATTI_TYPES.ALL_IN_1,
          quantity: 80,
          price: 95,
          subtotal: 7600
        }
      ],
      totalAmount: 10100
    });
    deliveries.push(delivery3);

    await Reminder.create({
      customerId: customers[0]._id,
      deliveryId: delivery3._id,
      reminderType: REMINDER_TYPE.WHITE_LABEL_30_DAY_FOLLOWUP,
      reminderDate: addDays(delivery3.deliveryDate, 30),
      status: REMINDER_STATUS.PENDING,
      title: `30-Day Follow-up for Delivery #${delivery3._id.toString().slice(-6)}`,
      description: 'Follow-up reminder for delivery dated 2026-04-10',
      createdBySystem: true
    });

    console.log(`Created ${deliveries.length} deliveries with auto-generated reminders`);

    const notes = await Note.insertMany([
      {
        customerId: customers[0]._id,
        content: 'Customer prefers morning deliveries',
        noteType: 'GENERAL'
      },
      {
        customerId: customers[1]._id,
        deliveryId: delivery2._id,
        content: 'Customer requested invoice copy',
        noteType: 'DELIVERY'
      },
      {
        customerId: customers[0]._id,
        content: 'Follow up for next order in May',
        noteType: 'FOLLOW_UP'
      }
    ]);

    console.log(`Created ${notes.length} notes`);

    console.log('\n✅ Seed data created successfully!');
    console.log(`\nSummary:`);
    console.log(`- Customers: ${customers.length}`);
    console.log(`- Deliveries: ${deliveries.length}`);
    console.log(`- Reminders: ${deliveries.length} (auto-generated 30-day reminders)`);
    console.log(`- Notes: ${notes.length}`);

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
