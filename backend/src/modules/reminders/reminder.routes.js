import express from 'express';
import * as reminderController from './reminder.controller.js';
import * as reminderValidation from './reminder.validation.js';
import { validate } from '../../middleware/validation.js';

const router = express.Router();

router.get('/', reminderController.getReminders);
router.get('/:id', reminderController.getReminderById);
router.patch('/:id', reminderValidation.updateReminderValidation, validate, reminderController.updateReminder);
router.patch('/:id/complete', reminderValidation.completeReminderValidation, validate, reminderController.completeReminder);
router.patch('/:id/snooze', reminderValidation.snoozeReminderValidation, validate, reminderController.snoozeReminder);
router.patch('/:id/reschedule', reminderValidation.rescheduleReminderValidation, validate, reminderController.rescheduleReminder);
router.patch('/:id/cancel', reminderController.cancelReminder);

export default router;
