import * as dashboardService from './dashboard.service.js';

export const getSummary = async (req, res, next) => {
  try {
    const summary = await dashboardService.getSummary();
    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    next(error);
  }
};

export const getUpcomingReminders = async (req, res, next) => {
  try {
    const reminders = await dashboardService.getUpcomingReminders(req.query.limit);
    res.json({
      success: true,
      data: reminders
    });
  } catch (error) {
    next(error);
  }
};

export const getOverdueReminders = async (req, res, next) => {
  try {
    const reminders = await dashboardService.getOverdueReminders(req.query.limit);
    res.json({
      success: true,
      data: reminders
    });
  } catch (error) {
    next(error);
  }
};

export const getRecentShops = async (req, res, next) => {
  try {
    const shops = await dashboardService.getRecentShops(req.query.limit);
    res.json({
      success: true,
      data: shops
    });
  } catch (error) {
    next(error);
  }
};

export const getRecentDeliveries = async (req, res, next) => {
  try {
    const deliveries = await dashboardService.getRecentDeliveries(req.query.limit);
    res.json({
      success: true,
      data: deliveries
    });
  } catch (error) {
    next(error);
  }
};

export const getStatusBreakdown = async (req, res, next) => {
  try {
    const breakdown = await dashboardService.getStatusBreakdown();
    res.json({
      success: true,
      data: breakdown
    });
  } catch (error) {
    next(error);
  }
};
