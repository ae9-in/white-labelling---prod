export const SHOP_STATUS = {
  NEW: 'NEW',
  ACTIVE: 'ACTIVE',
  DELIVERY_ACTIVE: 'DELIVERY_ACTIVE',
  FOLLOW_UP_REQUIRED: 'FOLLOW_UP_REQUIRED',
  INACTIVE: 'INACTIVE'
};

export const DELIVERY_STATUS = {
  CREATED: 'CREATED',
  CONFIRMED: 'CONFIRMED',
  DISPATCHED: 'DISPATCHED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  FOLLOW_UP_PENDING: 'FOLLOW_UP_PENDING'
};

export const REMINDER_STATUS = {
  PENDING: 'PENDING',
  UPCOMING: 'UPCOMING',
  DONE: 'DONE',
  OVERDUE: 'OVERDUE',
  SNOOZED: 'SNOOZED',
  CANCELLED: 'CANCELLED'
};

export const PRODUCTS = [
  { value: 'Dhoop - 100g', label: 'Dhoop - 100g', hasType: false },
  { value: 'Camphor - 100g', label: 'Camphor - 100g', hasType: false },
  { value: 'Cotton Wicks - 1 packet', label: 'Cotton Wicks - 1 packet', hasType: false },
  { value: 'Agarbatti', label: 'Agarbatti', hasType: true },
  { value: 'Oil - 1L', label: 'Oil - 1L', hasType: false },
  { value: 'Packaging Cover', label: 'Packaging Cover', hasType: false }
];

export const AGARBATTI_TYPES = [
  { value: 'Rose', label: 'Rose' },
  { value: 'Sandalwood', label: 'Sandalwood' },
  { value: 'Lavender', label: 'Lavender' },
  { value: 'All in 1', label: 'All in 1' }
];

export const STATUS_COLORS = {
  NEW: 'bg-blue-100 text-blue-800',
  ACTIVE: 'bg-green-100 text-green-800',
  DELIVERY_ACTIVE: 'bg-purple-100 text-purple-800',
  FOLLOW_UP_REQUIRED: 'bg-yellow-100 text-yellow-800',
  INACTIVE: 'bg-gray-100 text-gray-800',
  CREATED: 'bg-blue-100 text-blue-800',
  CONFIRMED: 'bg-indigo-100 text-indigo-800',
  DISPATCHED: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
  FOLLOW_UP_PENDING: 'bg-orange-100 text-orange-800',
  PENDING: 'bg-gray-100 text-gray-800',
  UPCOMING: 'bg-blue-100 text-blue-800',
  DONE: 'bg-green-100 text-green-800',
  OVERDUE: 'bg-red-100 text-red-800',
  SNOOZED: 'bg-yellow-100 text-yellow-800'
};
