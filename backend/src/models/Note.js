import mongoose from 'mongoose';
import { NOTE_TYPE } from '../config/constants.js';

const noteSchema = new mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: [true, 'Shop is required']
  },
  deliveryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Delivery'
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  noteType: {
    type: String,
    enum: Object.values(NOTE_TYPE),
    default: NOTE_TYPE.GENERAL
  }
}, {
  timestamps: true
});

noteSchema.index({ shopId: 1, createdAt: -1 });
noteSchema.index({ deliveryId: 1 });

export default mongoose.model('Note', noteSchema);
