import Shop from '../../models/Shop.js';
import Delivery from '../../models/Delivery.js';
import Reminder from '../../models/Reminder.js';
import { SHOP_STATUS, REMINDER_STATUS } from '../../config/constants.js';

export const getSummary = async () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    totalShops,
    activeShops,
    totalDeliveries,
    deliveriesThisMonth,
    pendingReminders,
    upcomingReminders,
    overdueReminders,
    completedRemindersThisMonth
  ] = await Promise.all([
    Shop.countDocuments({ isArchived: false }),
    Shop.countDocuments({ status: SHOP_STATUS.ACTIVE, isArchived: false }),
    Delivery.countDocuments(),
    Delivery.countDocuments({ deliveryDate: { $gte: startOfMonth } }),
    Reminder.countDocuments({ status: REMINDER_STATUS.PENDING }),
    Reminder.countDocuments({ status: REMINDER_STATUS.UPCOMING }),
    Reminder.countDocuments({ status: REMINDER_STATUS.OVERDUE }),
    Reminder.countDocuments({
      status: REMINDER_STATUS.DONE,
      completedAt: { $gte: startOfMonth }
    })
  ]);

  return {
    totalShops,
    activeShops,
    totalDeliveries,
    deliveriesThisMonth,
    pendingReminders,
    upcomingReminders,
    overdueReminders,
    completedRemindersThisMonth
  };
};

export const getUpcomingReminders = async (limit = 5) => {
  return await Reminder.find({
    status: { $in: [REMINDER_STATUS.PENDING, REMINDER_STATUS.UPCOMING] },
    reminderDate: { $gte: new Date() }
  })
    .populate('shopId', 'shopName ownerName')
    .populate('deliveryId', 'deliveryDate totalAmount')
    .sort({ reminderDate: 1 })
    .limit(limit);
};

export const getOverdueReminders = async (limit = 5) => {
  return await Reminder.find({ status: REMINDER_STATUS.OVERDUE })
    .populate('shopId', 'shopName ownerName')
    .populate('deliveryId', 'deliveryDate totalAmount')
    .sort({ reminderDate: 1 })
    .limit(limit);
};

export const getRecentShops = async (limit = 5) => {
  return await Shop.find({ isArchived: false })
    .sort({ createdAt: -1 })
    .limit(limit);
};

export const getRecentDeliveries = async (limit = 5) => {
  return await Delivery.find()
    .populate('shopId', 'shopName ownerName')
    .sort({ deliveryDate: -1 })
    .limit(limit);
};

export const getStatusBreakdown = async () => {
  const shopsByStatus = await Shop.aggregate([
    { $match: { isArchived: false } },
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);

  const deliveriesByStatus = await Delivery.aggregate([
    { $group: { _id: '$deliveryStatus', count: { $sum: 1 } } }
  ]);

  const remindersByStatus = await Reminder.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);

  return {
    shopsByStatus,
    deliveriesByStatus,
    remindersByStatus
  };
};
