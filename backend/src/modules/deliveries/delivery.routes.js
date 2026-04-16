import express from 'express';
import * as deliveryController from './delivery.controller.js';
import * as deliveryValidation from './delivery.validation.js';
import { validate } from '../../middleware/validation.js';
import { upload } from '../uploads/upload.middleware.js';

const router = express.Router();

router.get('/', deliveryController.getDeliveries);
router.post('/', deliveryValidation.createDeliveryValidation, validate, deliveryController.createDelivery);
router.get('/:id', deliveryController.getDeliveryById);
router.patch('/:id', deliveryValidation.updateDeliveryValidation, validate, deliveryController.updateDelivery);
router.delete('/:id', deliveryController.deleteDelivery);
router.post('/:id/upload-bill', upload.single('bill'), deliveryController.uploadBill);
router.delete('/:id/bill', deliveryController.deleteBill);

export default router;
