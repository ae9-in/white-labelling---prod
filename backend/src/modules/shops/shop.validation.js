import { body } from 'express-validator';
import { SHOP_STATUS } from '../../config/constants.js';

export const createShopValidation = [
  body('shopName').trim().notEmpty().withMessage('Shop name is required'),
  body('ownerName').trim().notEmpty().withMessage('Owner name is required'),
  body('phoneNumber1').trim().notEmpty().withMessage('Primary phone number is required'),
  body('place').trim().notEmpty().withMessage('Place is required'),
  body('email').optional().isEmail().withMessage('Invalid email format'),
  body('status').optional().isIn(Object.values(SHOP_STATUS)).withMessage('Invalid status')
];

export const updateShopValidation = [
  body('shopName').optional().trim().notEmpty().withMessage('Shop name cannot be empty'),
  body('ownerName').optional().trim().notEmpty().withMessage('Owner name cannot be empty'),
  body('email').optional().isEmail().withMessage('Invalid email format'),
  body('status').optional().isIn(Object.values(SHOP_STATUS)).withMessage('Invalid status')
];

export const updateStatusValidation = [
  body('status').isIn(Object.values(SHOP_STATUS)).withMessage('Invalid status')
];

export const addNoteValidation = [
  body('content').trim().notEmpty().withMessage('Note content is required'),
  body('noteType').optional().trim()
];
