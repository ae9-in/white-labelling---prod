import cron from 'node-cron';
import Reminder from '../models/Reminder.js';
import Delivery from '../models/Delivery.js';
import { REMINDER_STATUS, REMINDER_TYPE } from '../config/constants.js';
import { addDays } from '../utils/dateHelper.js';

export const updateReminderStatuses = async () => {
  try {
    const now = new Date();
    const upcomingThreshold = addDays(now, 7);

    await Reminder.updateMany(
      {
        status: REMINDER_STATUS.PENDING,
        reminderDate: { $lt: now }
      },
      { status: REMINDER_STATUS.OVERDUE }
    );

    await Reminder.updateMany(
      {
        status: REMINDER_STATUS.PENDING,
        reminderDate: { $gte: now, $lte: upcomingThreshold }
      },
      { status: REMINDER_STATUS.UPCOMING }
    );

    await Reminder.updateMany(
      {
        status: REMINDER_STATUS.SNOOZED,
        snoozedUntil: { $lt: now }
      },
      { status: REMINDER_STATUS.PENDING }
    );

    console.log('Reminder statuses updated successfully');
  } catch (error) {
    console.error('Error updating reminder statuses:', error);
  }
};

export const checkMissingReminders = async () => {
  try {
    const deliveries = await Delivery.find();
    
    for (const delivery of deliveries) {
      const existingReminder = await Reminder.findOne({
        deliveryId: delivery._id,
        reminderType: REMINDER_TYPE.WHITE_LABEL_30_DAY_FOLLOWUP
      });

      if (!existingReminder) {
        const reminderDate = addDays(delivery.deliveryDate, 30);
        
        await Reminder.create({
          customerId: delivery.customerId,
          deliveryId: delivery._id,
          reminderType: REMINDER_TYPE.WHITE_LABEL_30_DAY_FOLLOWUP,
          reminderDate,
          status: reminderDate < new Date() ? REMINDER_STATUS.OVERDUE : REMINDER_STATUS.PENDING,
          title: `30-Day Follow-up for Delivery #${delivery._id.toString().slice(-6)}`,
          description: `Follow-up reminder for delivery dated ${delivery.deliveryDate.toISOString().split('T')[0]}`,
          createdBySystem: true
        });

        console.log(`Created missing reminder for delivery ${delivery._id}`);
      }
    }

    console.log('Missing reminders check completed');
  } catch (error) {
    console.error('Error checking missing reminders:', error);
  }
};

export const startReminderJobs = () => {
  cron.schedule('0 0 * * *', updateReminderStatuses);
  
  cron.schedule('0 1 * * *', checkMissingReminders);

  console.log('Reminder cron jobs started');
};
