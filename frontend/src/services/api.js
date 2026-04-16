import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

export const shopAPI = {
  getAll: (params) => api.get('/shops', { params }),
  getById: (id) => api.get(`/shops/${id}`),
  create: (data) => api.post('/shops', data),
  update: (id, data) => api.patch(`/shops/${id}`, data),
  delete: (id) => api.delete(`/shops/${id}`),
  updateStatus: (id, status) => api.patch(`/shops/${id}/status`, { status }),
  getDeliveries: (id, params) => api.get(`/shops/${id}/deliveries`, { params }),
  getReminders: (id, params) => api.get(`/shops/${id}/reminders`, { params }),
  getNotes: (id, params) => api.get(`/shops/${id}/notes`, { params }),
  addNote: (id, data) => api.post(`/shops/${id}/notes`, data)
};

export const deliveryAPI = {
  getAll: (params) => api.get('/deliveries', { params }),
  getById: (id) => api.get(`/deliveries/${id}`),
  create: (data) => api.post('/deliveries', data),
  update: (id, data) => api.patch(`/deliveries/${id}`, data),
  delete: (id) => api.delete(`/deliveries/${id}`),
  uploadBill: (id, formData) => api.post(`/deliveries/${id}/upload-bill`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteBill: (id) => api.delete(`/deliveries/${id}/bill`)
};

export const reminderAPI = {
  getAll: (params) => api.get('/reminders', { params }),
  getById: (id) => api.get(`/reminders/${id}`),
  update: (id, data) => api.patch(`/reminders/${id}`, data),
  complete: (id, completionNote) => api.patch(`/reminders/${id}/complete`, { completionNote }),
  snooze: (id, snoozedUntil) => api.patch(`/reminders/${id}/snooze`, { snoozedUntil }),
  reschedule: (id, reminderDate) => api.patch(`/reminders/${id}/reschedule`, { reminderDate }),
  cancel: (id) => api.patch(`/reminders/${id}/cancel`)
};

export const dashboardAPI = {
  getSummary: () => api.get('/dashboard/summary'),
  getUpcomingReminders: (limit) => api.get('/dashboard/upcoming-reminders', { params: { limit } }),
  getOverdueReminders: (limit) => api.get('/dashboard/overdue-reminders', { params: { limit } }),
  getRecentShops: (limit) => api.get('/dashboard/recent-shops', { params: { limit } }),
  getRecentDeliveries: (limit) => api.get('/dashboard/recent-deliveries', { params: { limit } }),
  getStatusBreakdown: () => api.get('/dashboard/status-breakdown')
};

export const reportsAPI = {
  getCustomers: (params) => api.get('/reports/customers', { params }),
  getDeliveries: (params) => api.get('/reports/deliveries', { params }),
  getReminders: (params) => api.get('/reports/reminders', { params }),
  getProductSummary: (params) => api.get('/reports/product-summary', { params })
};

export default api;
