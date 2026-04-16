import * as deliveryService from './delivery.service.js';

export const createDelivery = async (req, res, next) => {
  try {
    const delivery = await deliveryService.createDelivery(req.body);
    res.status(201).json({
      success: true,
      data: delivery
    });
  } catch (error) {
    next(error);
  }
};

export const getDeliveries = async (req, res, next) => {
  try {
    const result = await deliveryService.getDeliveries(req.query);
    res.json({
      success: true,
      data: result.deliveries,
      pagination: result.pagination
    });
  } catch (error) {
    next(error);
  }
};

export const getDeliveryById = async (req, res, next) => {
  try {
    const delivery = await deliveryService.getDeliveryById(req.params.id);
    res.json({
      success: true,
      data: delivery
    });
  } catch (error) {
    next(error);
  }
};

export const updateDelivery = async (req, res, next) => {
  try {
    const delivery = await deliveryService.updateDelivery(req.params.id, req.body);
    res.json({
      success: true,
      data: delivery
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDelivery = async (req, res, next) => {
  try {
    await deliveryService.deleteDelivery(req.params.id);
    res.json({
      success: true,
      message: 'Delivery deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const uploadBill = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const delivery = await deliveryService.uploadBill(req.params.id, req.file);
    res.json({
      success: true,
      data: delivery
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBill = async (req, res, next) => {
  try {
    const delivery = await deliveryService.deleteBill(req.params.id);
    res.json({
      success: true,
      data: delivery
    });
  } catch (error) {
    next(error);
  }
};
