import * as shopService from './shop.service.js';

export const createShop = async (req, res, next) => {
  try {
    const shop = await shopService.createShop(req.body);
    res.status(201).json({
      success: true,
      data: shop
    });
  } catch (error) {
    next(error);
  }
};

export const getShops = async (req, res, next) => {
  try {
    const result = await shopService.getShops(req.query);
    res.json({
      success: true,
      data: result.shops,
      pagination: result.pagination
    });
  } catch (error) {
    next(error);
  }
};

export const getShopById = async (req, res, next) => {
  try {
    const shop = await shopService.getShopById(req.params.id);
    res.json({
      success: true,
      data: shop
    });
  } catch (error) {
    next(error);
  }
};

export const updateShop = async (req, res, next) => {
  try {
    const shop = await shopService.updateShop(req.params.id, req.body);
    res.json({
      success: true,
      data: shop
    });
  } catch (error) {
    next(error);
  }
};

export const deleteShop = async (req, res, next) => {
  try {
    await shopService.deleteShop(req.params.id);
    res.json({
      success: true,
      message: 'Shop archived successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const updateShopStatus = async (req, res, next) => {
  try {
    const shop = await shopService.updateShop(req.params.id, {
      status: req.body.status
    });
    res.json({
      success: true,
      data: shop
    });
  } catch (error) {
    next(error);
  }
};

export const getShopDeliveries = async (req, res, next) => {
  try {
    const result = await shopService.getShopDeliveries(
      req.params.id,
      req.query.page,
      req.query.limit
    );
    res.json({
      success: true,
      data: result.deliveries,
      pagination: result.pagination
    });
  } catch (error) {
    next(error);
  }
};

export const getShopReminders = async (req, res, next) => {
  try {
    const result = await shopService.getShopReminders(
      req.params.id,
      req.query.page,
      req.query.limit
    );
    res.json({
      success: true,
      data: result.reminders,
      pagination: result.pagination
    });
  } catch (error) {
    next(error);
  }
};

export const getShopNotes = async (req, res, next) => {
  try {
    const result = await shopService.getShopNotes(
      req.params.id,
      req.query.page,
      req.query.limit
    );
    res.json({
      success: true,
      data: result.notes,
      pagination: result.pagination
    });
  } catch (error) {
    next(error);
  }
};

export const addShopNote = async (req, res, next) => {
  try {
    const note = await shopService.addShopNote(req.params.id, req.body);
    res.status(201).json({
      success: true,
      data: note
    });
  } catch (error) {
    next(error);
  }
};
