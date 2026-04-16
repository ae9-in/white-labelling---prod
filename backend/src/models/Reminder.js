import mongoose from 'mongoose';
import { REMINDER_STATUS, REMINDER_TYPE } from '../config/constants.js';

const reminderSchema = new mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: [true, 'Shop is required']
  },
  deliveryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Delivery'
  },
  reminderType: {
    type: String,
    enum: Object.values(REMINDER_TYPE),
    default: REMINDER_TYPE.MANUAL
  },
  reminderDate: {
    type: Date,
    required: [true, 'Reminder date is required']
  },
  status: {
    type: String,
    enum: Object.values(REMINDER_STATUS),
    default: REMINDER_STATUS.PENDING
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  completedAt: {
    type: Date
  },
  snoozedUntil: {
    type: Date
  },
  completionNote: {
    type: String,
    trim: true
  },
  createdBySystem: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

reminderSchema.index({ shopId: 1, reminderDate: 1 });
reminderSchema.index({ deliveryId: 1 });
reminderSchema.index({ status: 1 });
reminderSchema.index({ reminderDate: 1 });
reminderSchema.index({ reminderType: 1 });

export default mongoose.model('Reminder', reminderSchema);
