import mongoose from 'mongoose';
import { DELIVERY_STATUS } from '../config/constants.js';

const deliveryItemSchema = new mongoose.Schema({
  product: {
    type: String,
    required: [true, 'Product is required']
  },
  type: {
    type: String,
    trim: true
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0.01, 'Quantity must be positive']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be non-negative']
  },
  subtotal: {
    type: Number,
    required: true
  }
}, { _id: true });

const deliverySchema = new mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: [true, 'Shop is required']
  },
  deliveryDate: {
    type: Date,
    required: [true, 'Delivery date is required']
  },
  deliveryStatus: {
    type: String,
    enum: Object.values(DELIVERY_STATUS),
    default: DELIVERY_STATUS.CREATED
  },
  notes: {
    type: String,
    trim: true
  },
  billFileUrl: {
    type: String
  },
  billFileName: {
    type: String
  },
  billMimeType: {
    type: String
  },
  items: [deliveryItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

deliverySchema.index({ shopId: 1, deliveryDate: -1 });
deliverySchema.index({ deliveryStatus: 1 });
deliverySchema.index({ deliveryDate: -1 });

export default mongoose.model('Delivery', deliverySchema);
