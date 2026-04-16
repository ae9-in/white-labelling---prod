import mongoose from 'mongoose';
import { SHOP_STATUS } from '../config/constants.js';

const shopSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: [true, 'Shop name is required'],
    trim: true
  },
  ownerName: {
    type: String,
    required: [true, 'Owner name is required'],
    trim: true
  },
  phoneNumber1: {
    type: String,
    required: [true, 'Primary phone number is required'],
    trim: true
  },
  phoneNumber2: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  addressLine1: {
    type: String,
    trim: true
  },
  addressLine2: {
    type: String,
    trim: true
  },
  place: {
    type: String,
    trim: true,
    required: [true, 'Place is required']
  },
  zone: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true,
    default: 'Karnataka'
  },
  pincode: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  businessType: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: Object.values(SHOP_STATUS),
    default: SHOP_STATUS.NEW
  },
  assignedStaff: {
    type: String,
    trim: true,
    default: 'Unassigned'
  },
  isArchived: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

shopSchema.index({ shopName: 'text', ownerName: 'text', place: 'text', zone: 'text' });
shopSchema.index({ status: 1 });
shopSchema.index({ place: 1 });
shopSchema.index({ zone: 1 });
shopSchema.index({ createdAt: -1 });

export default mongoose.model('Shop', shopSchema);
