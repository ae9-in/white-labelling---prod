import mongoose from 'mongoose';
import { ACTIVITY_ACTION } from '../config/constants.js';

const activityLogSchema = new mongoose.Schema({
  entityType: {
    type: String,
    required: true,
    enum: ['Shop', 'Delivery', 'Reminder', 'Note']
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  action: {
    type: String,
    enum: Object.values(ACTIVITY_ACTION),
    required: true
  },
  message: {
    type: String,
    required: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

activityLogSchema.index({ entityType: 1, entityId: 1, createdAt: -1 });
activityLogSchema.index({ createdAt: -1 });

export default mongoose.model('ActivityLog', activityLogSchema);
