import Delivery from '../../models/Delivery.js';
import Reminder from '../../models/Reminder.js';
import { logActivity } from '../../utils/activityLogger.js';
import { ACTIVITY_ACTION, REMINDER_TYPE, REMINDER_STATUS } from '../../config/constants.js';
import { addDays } from '../../utils/dateHelper.js';

const calculateTotalAmount = (items) => {
  return items.reduce((total, item) => {
    item.subtotal = item.quantity * item.price;
    return total + item.subtotal;
  }, 0);
};

const createOrUpdate30DayReminder = async (delivery) => {
  const reminderDate = addDays(delivery.deliveryDate, 30);
  
  const existingReminder = await Reminder.findOne({
    deliveryId: delivery._id,
    reminderType: REMINDER_TYPE.WHITE_LABEL_30_DAY_FOLLOWUP
  });

  if (existingReminder) {
    existingReminder.reminderDate = reminderDate;
    existingReminder.title = `30-Day Follow-up for Delivery #${delivery._id.toString().slice(-6)}`;
    existingReminder.description = `Follow-up reminder for delivery dated ${delivery.deliveryDate.toISOString().split('T')[0]}`;
    await existingReminder.save();
    
    await logActivity(
      'Reminder',
      existingReminder._id,
      ACTIVITY_ACTION.REMINDER_RESCHEDULED,
      `30-day reminder updated due to delivery date change`
    );
    
    return existingReminder;
  } else {
    const reminder = await Reminder.create({
      shopId: delivery.shopId,
      deliveryId: delivery._id,
      reminderType: REMINDER_TYPE.WHITE_LABEL_30_DAY_FOLLOWUP,
      reminderDate,
      status: REMINDER_STATUS.PENDING,
      title: `30-Day Follow-up for Delivery #${delivery._id.toString().slice(-6)}`,
      description: `Follow-up reminder for delivery dated ${delivery.deliveryDate.toISOString().split('T')[0]}`,
      createdBySystem: true
    });

    await logActivity(
      'Reminder',
      reminder._id,
      ACTIVITY_ACTION.REMINDER_AUTO_CREATED,
      `30-day reminder auto-created for delivery`
    );

    return reminder;
  }
};

export const createDelivery = async (deliveryData) => {
  deliveryData.totalAmount = calculateTotalAmount(deliveryData.items);
  
  const delivery = await Delivery.create(deliveryData);
  
  await createOrUpdate30DayReminder(delivery);
  
  await logActivity(
    'Delivery',
    delivery._id,
    ACTIVITY_ACTION.DELIVERY_CREATED,
    `Delivery created with ${delivery.items.length} items`
  );
  
  return delivery;
};

export const getDeliveries = async (filters = {}) => {
  const {
    page = 1,
    limit = 10,
    shopId,
    deliveryStatus,
    deliveryDateFrom,
    deliveryDateTo,
    product,
    sortBy = 'deliveryDate',
    sortOrder = 'desc'
  } = filters;

  const query = {};

  if (shopId) query.shopId = shopId;
  if (deliveryStatus) query.deliveryStatus = deliveryStatus;
  if (product) query['items.product'] = product;
  
  if (deliveryDateFrom || deliveryDateTo) {
    query.deliveryDate = {};
    if (deliveryDateFrom) query.deliveryDate.$gte = new Date(deliveryDateFrom);
    if (deliveryDateTo) query.deliveryDate.$lte = new Date(deliveryDateTo);
  }

  const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
  const skip = (page - 1) * limit;

  const [deliveries, total] = await Promise.all([
    Delivery.find(query)
      .populate('shopId', 'shopName ownerName phoneNumber1')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit)),
    Delivery.countDocuments(query)
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

export const getDeliveryById = async (id) => {
  const delivery = await Delivery.findById(id)
    .populate('shopId', 'shopName ownerName phoneNumber1 email place zone');
  
  if (!delivery) {
    throw new Error('Delivery not found');
  }
  
  return delivery;
};

export const updateDelivery = async (id, updateData) => {
  const oldDelivery = await Delivery.findById(id);
  if (!oldDelivery) {
    throw new Error('Delivery not found');
  }

  const oldDeliveryDate = oldDelivery.deliveryDate;

  if (updateData.items) {
    updateData.totalAmount = calculateTotalAmount(updateData.items);
  }

  const delivery = await Delivery.findByIdAndUpdate(
    id,
    updateData,
    { new: true, runValidators: true }
  );

  if (updateData.deliveryDate && oldDeliveryDate.getTime() !== new Date(updateData.deliveryDate).getTime()) {
    await createOrUpdate30DayReminder(delivery);
  }

  await logActivity(
    'Delivery',
    delivery._id,
    ACTIVITY_ACTION.DELIVERY_UPDATED,
    `Delivery updated`
  );

  return delivery;
};

export const deleteDelivery = async (id) => {
  const delivery = await Delivery.findByIdAndDelete(id);
  if (!delivery) {
    throw new Error('Delivery not found');
  }

  await Reminder.deleteMany({
    deliveryId: id,
    reminderType: REMINDER_TYPE.WHITE_LABEL_30_DAY_FOLLOWUP
  });

  return delivery;
};

export const uploadBill = async (id, fileData) => {
  const delivery = await Delivery.findByIdAndUpdate(
    id,
    {
      billFileUrl: fileData.path,
      billFileName: fileData.filename,
      billMimeType: fileData.mimetype
    },
    { new: true }
  );

  if (!delivery) {
    throw new Error('Delivery not found');
  }

  await logActivity(
    'Delivery',
    delivery._id,
    ACTIVITY_ACTION.BILL_UPLOADED,
    `Bill uploaded: ${fileData.filename}`
  );

  return delivery;
};

export const deleteBill = async (id) => {
  const delivery = await Delivery.findByIdAndUpdate(
    id,
    {
      $unset: { billFileUrl: '', billFileName: '', billMimeType: '' }
    },
    { new: true }
  );

  if (!delivery) {
    throw new Error('Delivery not found');
  }

  return delivery;
};
