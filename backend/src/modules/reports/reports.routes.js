import express from 'express';
import * as reportsController from './reports.controller.js';

const router = express.Router();

router.get('/customers', reportsController.getCustomersReport);
router.get('/deliveries', reportsController.getDeliveriesReport);
router.get('/reminders', reportsController.getRemindersReport);
router.get('/product-summary', reportsController.getProductSummary);

export default router;
