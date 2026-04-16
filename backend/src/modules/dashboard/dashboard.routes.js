import express from 'express';
import * as dashboardController from './dashboard.controller.js';

const router = express.Router();

router.get('/summary', dashboardController.getSummary);
router.get('/upcoming-reminders', dashboardController.getUpcomingReminders);
router.get('/overdue-reminders', dashboardController.getOverdueReminders);
router.get('/recent-shops', dashboardController.getRecentShops);
router.get('/recent-deliveries', dashboardController.getRecentDeliveries);
router.get('/status-breakdown', dashboardController.getStatusBreakdown);

export default router;
