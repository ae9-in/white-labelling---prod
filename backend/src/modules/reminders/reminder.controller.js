import * as reminderService from './reminder.service.js';

export const getReminders = async (req, res, next) => {
  try {
    const result = await reminderService.getReminders(req.query);
    res.json({
      success: true,
      data: result.reminders,
      pagination: result.pagination
    });
  } catch (error) {
    next(error);
  }
};

export const getReminderById = async (req, res, next) => {
  try {
    const reminder = await reminderService.getReminderById(req.params.id);
    res.json({
      success: true,
      data: reminder
    });
  } catch (error) {
    next(error);
  }
};

export const updateReminder = async (req, res, next) => {
  try {
    const reminder = await reminderService.updateReminder(req.params.id, req.body);
    res.json({
      success: true,
      data: reminder
    });
  } catch (error) {
    next(error);
  }
};

export const completeReminder = async (req, res, next) => {
  try {
    const reminder = await reminderService.completeReminder(
      req.params.id,
      req.body.completionNote
    );
    res.json({
      success: true,
      data: reminder
    });
  } catch (error) {
    next(error);
  }
};

export const snoozeReminder = async (req, res, next) => {
  try {
    const reminder = await reminderService.snoozeReminder(
      req.params.id,
      req.body.snoozedUntil
    );
    res.json({
      success: true,
      data: reminder
    });
  } catch (error) {
    next(error);
  }
};

export const rescheduleReminder = async (req, res, next) => {
  try {
    const reminder = await reminderService.rescheduleReminder(
      req.params.id,
      req.body.reminderDate
    );
    res.json({
      success: true,
      data: reminder
    });
  } catch (error) {
    next(error);
  }
};

export const cancelReminder = async (req, res, next) => {
  try {
    const reminder = await reminderService.cancelReminder(req.params.id);
    res.json({
      success: true,
      data: reminder
    });
  } catch (error) {
    next(error);
  }
};
