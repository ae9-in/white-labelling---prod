import express from 'express';
import * as shopController from './shop.controller.js';
import * as shopValidation from './shop.validation.js';
import { validate } from '../../middleware/validation.js';

const router = express.Router();

router.get('/', shopController.getShops);
router.post('/', shopValidation.createShopValidation, validate, shopController.createShop);
router.get('/:id', shopController.getShopById);
router.patch('/:id', shopValidation.updateShopValidation, validate, shopController.updateShop);
router.delete('/:id', shopController.deleteShop);
router.patch('/:id/status', shopValidation.updateStatusValidation, validate, shopController.updateShopStatus);
router.get('/:id/deliveries', shopController.getShopDeliveries);
router.get('/:id/reminders', shopController.getShopReminders);
router.get('/:id/notes', shopController.getShopNotes);
router.post('/:id/notes', shopValidation.addNoteValidation, validate, shopController.addShopNote);

export default router;
