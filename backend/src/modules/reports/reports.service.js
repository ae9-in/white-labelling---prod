import Shop from '../../models/Shop.js';
import Delivery from '../../models/Delivery.js';
import Reminder from '../../models/Reminder.js';

export const getCustomersReport = async (filters = {}) => {
  const { status, place, zone, dateFrom, dateTo } = filters;
  
  const query = { isArchived: false };
  if (status) query.status = status;
  if (place) query.place = { $regex: place, $options: 'i' };
  if (zone) query.zone = zone;
  
  if (dateFrom || dateTo) {
    query.createdAt = {};
    if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
    if (dateTo) query.createdAt.$lte = new Date(dateTo);
  }

  const shops = await Shop.find(query).sort({ createdAt: -1 });
  
  const summary = await Shop.aggregate([
    { $match: query },
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);

  return { shops, summary };
};

export const getDeliveriesReport = async (filters = {}) => {
  const { deliveryStatus, dateFrom, dateTo, shopId } = filters;
  
  const query = {};
  if (deliveryStatus) query.deliveryStatus = deliveryStatus;
  if (shopId) query.shopId = shopId;
  
  if (dateFrom || dateTo) {
    query.deliveryDate = {};
    if (dateFrom) query.deliveryDate.$gte = new Date(dateFrom);
    if (dateTo) query.deliveryDate.$lte = new Date(dateTo);
  }

  const deliveries = await Delivery.find(query)
    .populate('shopId', 'shopName ownerName')
    .sort({ deliveryDate: -1 });
  
  const totalAmount = await Delivery.aggregate([
    { $match: query },
    { $group: { _id: null, total: { $sum: '$totalAmount' } } }
  ]);

  return {
    deliveries,
    totalAmount: totalAmount[0]?.total || 0,
    count: deliveries.length
  };
};

export const getRemindersReport = async (filters = {}) => {
  const { status, dateFrom, dateTo } = filters;
  
  const query = {};
  if (status) query.status = status;
  
  if (dateFrom || dateTo) {
    query.reminderDate = {};
    if (dateFrom) query.reminderDate.$gte = new Date(dateFrom);
    if (dateTo) query.reminderDate.$lte = new Date(dateTo);
  }

  const reminders = await Reminder.find(query)
    .populate('shopId', 'shopName ownerName')
    .populate('deliveryId', 'deliveryDate totalAmount')
    .sort({ reminderDate: -1 });
  
  const summary = await Reminder.aggregate([
    { $match: query },
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);

  return { reminders, summary };
};

export const getProductSummary = async (filters = {}) => {
  const { dateFrom, dateTo } = filters;
  
  const matchQuery = {};
  if (dateFrom || dateTo) {
    matchQuery.deliveryDate = {};
    if (dateFrom) matchQuery.deliveryDate.$gte = new Date(dateFrom);
    if (dateTo) matchQuery.deliveryDate.$lte = new Date(dateTo);
  }

  const productSummary = await Delivery.aggregate([
    { $match: matchQuery },
    { $unwind: '$items' },
    {
      $group: {
        _id: {
          product: '$items.product',
          type: '$items.type'
        },
        totalQuantity: { $sum: '$items.quantity' },
        totalAmount: { $sum: '$items.subtotal' },
        count: { $sum: 1 }
      }
    },
    { $sort: { totalAmount: -1 } }
  ]);

  return productSummary;
};
