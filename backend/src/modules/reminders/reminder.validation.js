import { body } from 'express-validator';
import { REMINDER_STATUS } from '../../config/constants.js';

export const updateReminderValidation = [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().trim(),
  body('status').optional().isIn(Object.values(REMINDER_STATUS)).withMessage('Invalid status')
];

export const completeReminderValidation = [
  body('completionNote').optional().trim()
];

export const snoozeReminderValidation = [
  body('snoozedUntil').notEmpty().withMessage('Snooze date is required').isISO8601().withMessage('Invalid date format')
];

export const rescheduleReminderValidation = [
  body('reminderDate').notEmpty().withMessage('Reminder date is required').isISO8601().withMessage('Invalid date format')
];
