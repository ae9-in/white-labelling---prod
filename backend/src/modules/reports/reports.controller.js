import * as reportsService from './reports.service.js';

export const getCustomersReport = async (req, res, next) => {
  try {
    const report = await reportsService.getCustomersReport(req.query);
    res.json({
      success: true,
      data: report
    });
  } catch (error) {
    next(error);
  }
};

export const getDeliveriesReport = async (req, res, next) => {
  try {
    const report = await reportsService.getDeliveriesReport(req.query);
    res.json({
      success: true,
      data: report
    });
  } catch (error) {
    next(error);
  }
};

export const getRemindersReport = async (req, res, next) => {
  try {
    const report = await reportsService.getRemindersReport(req.query);
    res.json({
      success: true,
      data: report
    });
  } catch (error) {
    next(error);
  }
};

export const getProductSummary = async (req, res, next) => {
  try {
    const summary = await reportsService.getProductSummary(req.query);
    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    next(error);
  }
};
