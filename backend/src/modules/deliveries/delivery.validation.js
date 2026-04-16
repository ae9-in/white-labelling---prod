import { body } from 'express-validator';
import { DELIVERY_STATUS, PRODUCTS, AGARBATTI_TYPES } from '../../config/constants.js';

export const createDeliveryValidation = [
  body('shopId').notEmpty().withMessage('Shop is required').isMongoId().withMessage('Invalid shop ID'),
  body('deliveryDate').notEmpty().withMessage('Delivery date is required').isISO8601().withMessage('Invalid date format'),
  body('deliveryStatus').optional().isIn(Object.values(DELIVERY_STATUS)).withMessage('Invalid delivery status'),
  body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
  body('items.*.product').notEmpty().withMessage('Product is required'),
  body('items.*.quantity').isFloat({ min: 0.01 }).withMessage('Quantity must be positive'),
  body('items.*.price').isFloat({ min: 0 }).withMessage('Price must be non-negative'),
  body('items.*.type').custom((value, { req, path }) => {
    const index = path.split('[')[1].split(']')[0];
    const product = req.body.items[index].product;
    
    if (product === PRODUCTS.AGARBATTI) {
      if (!value) {
        throw new Error('Type is required for Agarbatti');
      }
      if (!Object.values(AGARBATTI_TYPES).includes(value)) {
        throw new Error('Invalid Agarbatti type');
      }
    }
    return true;
  })
];

export const updateDeliveryValidation = [
  body('deliveryDate').optional().isISO8601().withMessage('Invalid date format'),
  body('deliveryStatus').optional().isIn(Object.values(DELIVERY_STATUS)).withMessage('Invalid delivery status'),
  body('items').optional().isArray({ min: 1 }).withMessage('At least one item is required'),
  body('items.*.product').optional().notEmpty().withMessage('Product is required'),
  body('items.*.quantity').optional().isFloat({ min: 0.01 }).withMessage('Quantity must be positive'),
  body('items.*.price').optional().isFloat({ min: 0 }).withMessage('Price must be non-negative')
];
