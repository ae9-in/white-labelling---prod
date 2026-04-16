import Shop from '../../models/Shop.js';
import Delivery from '../../models/Delivery.js';
import Reminder from '../../models/Reminder.js';
import Note from '../../models/Note.js';
import { logActivity } from '../../utils/activityLogger.js';
import { ACTIVITY_ACTION } from '../../config/constants.js';

export const createShop = async (shopData) => {
  const shop = await Shop.create(shopData);
  
  await logActivity(
    'Shop',
    shop._id,
    ACTIVITY_ACTION.CUSTOMER_CREATED,
    `Shop "${shop.shopName}" created`
  );
  
  return shop;
};

export const getShops = async (filters = {}) => {
  const {
    page = 1,
    limit = 10,
    search,
    status,
    place,
    zone,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = filters;

  const query = { isArchived: false };

  if (search) {
    query.$or = [
      { shopName: { $regex: search, $options: 'i' } },
      { ownerName: { $regex: search, $options: 'i' } },
      { phoneNumber1: { $regex: search, $options: 'i' } },
      { place: { $regex: search, $options: 'i' } },
      { zone: { $regex: search, $options: 'i' } }
    ];
  }

  if (status) query.status = status;
  if (place) query.place = { $regex: place, $options: 'i' };
  if (zone) query.zone = zone;

  const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

  const skip = (page - 1) * limit;

  const [shops, total] = await Promise.all([
    Shop.find(query).sort(sort).skip(skip).limit(parseInt(limit)),
    Shop.countDocuments(query)
  ]);

  return {
    shops,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit)
    }
  };
};

export const getShopById = async (id) => {
  const shop = await Shop.findById(id);
  if (!shop) {
    throw new Error('Shop not found');
  }
  return shop;
};

export const updateShop = async (id, updateData) => {
  const shop = await Shop.findByIdAndUpdate(
    id,
    updateData,
    { new: true, runValidators: true }
  );

  if (!shop) {
    throw new Error('Shop not found');
  }

  await logActivity(
    'Shop',
    shop._id,
    ACTIVITY_ACTION.CUSTOMER_UPDATED,
    `Shop "${shop.shopName}" updated`
  );

  return shop;
};

export const deleteShop = async (id) => {
  const shop = await Shop.findByIdAndUpdate(
    id,
    { isArchived: true },
    { new: true }
  );

  if (!shop) {
    throw new Error('Shop not found');
  }

  return shop;
};

export const getShopDeliveries = async (shopId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  
  const [deliveries, total] = await Promise.all([
    Delivery.find({ shopId })
      .sort({ deliveryDate: -1 })
      .skip(skip)
      .limit(parseInt(limit)),
    Delivery.countDocuments({ shopId })
  ]);

  return {
    deliveries,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit)
    }
  };
};

export const getShopReminders = async (shopId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  
  const [reminders, total] = await Promise.all([
    Reminder.find({ shopId })
      .populate('deliveryId', 'deliveryDate totalAmount')
      .sort({ reminderDate: -1 })
      .skip(skip)
      .limit(parseInt(limit)),
    Reminder.countDocuments({ shopId })
  ]);

  return {
    reminders,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit)
    }
  };
};

export const getShopNotes = async (shopId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  
  const [notes, total] = await Promise.all([
    Note.find({ shopId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit)),
    Note.countDocuments({ shopId })
  ]);

  return {
    notes,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit)
    }
  };
};

export const addShopNote = async (shopId, noteData) => {
  const note = await Note.create({
    shopId,
    ...noteData
  });

  await logActivity(
    'Note',
    note._id,
    ACTIVITY_ACTION.NOTE_ADDED,
    `Note added to shop`
  );

  return note;
};
