import ActivityLog from '../models/ActivityLog.js';

export const logActivity = async (entityType, entityId, action, message, metadata = {}) => {
  try {
    await ActivityLog.create({
      entityType,
      entityId,
      action,
      message,
      metadata
    });
  } catch (error) {
    console.error('Activity logging failed:', error);
  }
};
