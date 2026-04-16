import Reminder from '../../models/Reminder.js';
import { logActivity } from '../../utils/activityLogger.js';
import { ACTIVITY_ACTION, REMINDER_STATUS } from '../../config/constants.js';

export const getReminders = async (filters = {}) => {
  const {
    page = 1,
    limit = 10,
    status,
    reminderType,
    dateFrom,
    dateTo,
    upcomingOnly,
    overdueOnly,
    doneOnly,
    sortBy = 'reminderDate',
    sortOrder = 'asc'
  } = filters;

  const query = {};

  if (status) query.status = status;
  if (reminderType) query.reminderType = reminderType;
  
  if (dateFrom || dateTo) {
    query.reminderDate = {};
    if (dateFrom) query.reminderDate.$gte = new Date(dateFrom);
    if (dateTo) query.reminderDate.$lte = new Date(dateTo);
  }

  if (upcomingOnly) {
    query.status = { $in: [REMINDER_STATUS.PENDING, REMINDER_STATUS.UPCOMING] };
    query.reminderDate = { $gte: new Date() };
  }

  if (overdueOnly) {
    query.status = REMINDER_STATUS.OVERDUE;
  }

  if (doneOnly) {
    query.status = REMINDER_STATUS.DONE;
  }

  const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
  const skip = (page - 1) * limit;

  const [reminders, total] = await Promise.all([
    Reminder.find(query)
      .populate('shopId', 'shopName ownerName phoneNumber1')
      .populate('deliveryId', 'deliveryDate totalAmount deliveryStatus')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit)),
    Reminder.countDocuments(query)
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

export const getReminderById = async (id) => {
  const reminder = await Reminder.findById(id)
    .populate('shopId', 'shopName ownerName phoneNumber1 email place zone')
    .populate('deliveryId', 'deliveryDate totalAmount deliveryStatus items');
  
  if (!reminder) {
    throw new Error('Reminder not found');
  }
  
  return reminder;
};

export const updateReminder = async (id, updateData) => {
  const reminder = await Reminder.findByIdAndUpdate(
    id,
    updateData,
    { new: true, runValidators: true }
  );

  if (!reminder) {
    throw new Error('Reminder not found');
  }

  return reminder;
};

export const completeReminder = async (id, completionNote) => {
  const reminder = await Reminder.findByIdAndUpdate(
    id,
    {
      status: REMINDER_STATUS.DONE,
      completedAt: new Date(),
      completionNote
    },
    { new: true }
  );

  if (!reminder) {
    throw new Error('Reminder not found');
  }

  await logActivity(
    'Reminder',
    reminder._id,
    ACTIVITY_ACTION.REMINDER_COMPLETED,
    `Reminder completed`
  );

  return reminder;
};

export const snoozeReminder = async (id, snoozedUntil) => {
  const reminder = await Reminder.findByIdAndUpdate(
    id,
    {
      status: REMINDER_STATUS.SNOOZED,
      snoozedUntil: new Date(snoozedUntil)
    },
    { new: true }
  );

  if (!reminder) {
    throw new Error('Reminder not found');
  }

  await logActivity(
    'Reminder',
    reminder._id,
    ACTIVITY_ACTION.REMINDER_SNOOZED,
    `Reminder snoozed until ${snoozedUntil}`
  );

  return reminder;
};

export const rescheduleReminder = async (id, reminderDate) => {
  const reminder = await Reminder.findByIdAndUpdate(
    id,
    {
      reminderDate: new Date(reminderDate),
      status: REMINDER_STATUS.PENDING
    },
    { new: true }
  );

  if (!reminder) {
    throw new Error('Reminder not found');
  }

  await logActivity(
    'Reminder',
    reminder._id,
    ACTIVITY_ACTION.REMINDER_RESCHEDULED,
    `Reminder rescheduled to ${reminderDate}`
  );

  return reminder;
};

export const cancelReminder = async (id) => {
  const reminder = await Reminder.findByIdAndUpdate(
    id,
    { status: REMINDER_STATUS.CANCELLED },
    { new: true }
  );

  if (!reminder) {
    throw new Error('Reminder not found');
  }

  return reminder;
};
