export const SHOP_STATUS = {
  NEW: 'NEW',
  ACTIVE: 'ACTIVE',
  DELIVERY_ACTIVE: 'DELIVERY_ACTIVE',
  FOLLOW_UP_REQUIRED: 'FOLLOW_UP_REQUIRED',
  INACTIVE: 'INACTIVE'
};

export const ZONES = {
  BANGALORE_SOUTH: 'Bangalore South',
  BANGALORE_NORTH: 'Bangalore North',
  BANGALORE_CENTRAL: 'Bangalore Central',
  BANGALORE_EAST: 'Bangalore East',
  BANGALORE_WEST: 'Bangalore West',
  BANGALORE_RURAL: 'Bangalore Rural',
  MYSORE_ROAD: 'Mysore Road',
  HOSUR: 'Hosur',
  MYSORE: 'Mysore'
};

export const PLACES = {
  // Bangalore South
  'Banashankari': 'Bangalore South',
  'Jayanagar': 'Bangalore South',
  'Jp nagar': 'Bangalore South',
  'BTM layout': 'Bangalore South',
  'Uttarahalli,Padmanabanagar': 'Bangalore South',
  'Bommanahalli': 'Bangalore South',
  'Koramangala': 'Bangalore South',
  'RR nagar': 'Bangalore South',
  'Basavanagudi': 'Bangalore South',
  
  // Bangalore North
  'Yelahanka': 'Bangalore North',
  'Vidyaranyapura': 'Bangalore North',
  'Sahakarnagar': 'Bangalore North',
  'Hebbal': 'Bangalore North',
  'RT Nagar': 'Bangalore North',
  'Thanisandra': 'Bangalore North',
  'Kodigehalli ,Jakkur': 'Bangalore North',
  'Sanjaynagar &RMV extenstion': 'Bangalore North',
  'Mathikere': 'Bangalore North',
  
  // Bangalore Central
  'Ashoknagar': 'Bangalore Central',
  'Malleshwaram': 'Bangalore Central',
  'Church street, Mg road , Brigade road': 'Bangalore Central',
  'Sadashivnagar': 'Bangalore Central',
  'Ulsoor': 'Bangalore Central',
  'Bel Circle': 'Bangalore Central',
  'Shivajinagar, Commercial street': 'Bangalore Central',
  'Vasanth nagar & Guttahalli': 'Bangalore Central',
  'Rajajinagar+Sheshadripuram': 'Bangalore Central',
  
  // Bangalore East
  'Whitefield': 'Bangalore East',
  'Marathahalli': 'Bangalore East',
  'Indiranagar': 'Bangalore East',
  'HSR layout': 'Bangalore East',
  'KR Puram': 'Bangalore East',
  'Cv Raman Nagar': 'Bangalore East',
  'Mahadevpura': 'Bangalore East',
  'Bellandur': 'Bangalore East',
  'Sarjapur': 'Bangalore East',
  
  // Bangalore West
  'Jalahalli': 'Bangalore West',
  'Yashwanthpur': 'Bangalore West',
  'Vijayanagar': 'Bangalore West',
  'Kengeri': 'Bangalore West',
  'Nagarbhavi': 'Bangalore West',
  'Peenya': 'Bangalore West',
  'Vijayanagar': 'Bangalore West',
  'Basaveshwaranagar': 'Bangalore West',
  'Nayandahalli,Hanumanthnagar': 'Bangalore West',
  
  // Bangalore Rural
  'Devanahalli': 'Bangalore Rural',
  'Dodaballapura': 'Bangalore Rural',
  'Hoskote': 'Bangalore Rural',
  'Airport Road Bangalore': 'Bangalore Rural',
  'Tumkur Road': 'Bangalore Rural',
  'Vijayapura': 'Bangalore Rural',
  'Nelamangala': 'Bangalore Rural',
  'Magadi': 'Bangalore Rural',
  'Hesarghatta': 'Bangalore Rural',
  
  // Mysore Road
  'Bidadi': 'Mysore Road',
  'Ramnagar': 'Mysore Road',
  'Kanakpura': 'Mysore Road',
  'Channapatna': 'Mysore Road',
  'Maddur': 'Mysore Road',
  'Mandya': 'Mysore Road',
  'Srirangapatna': 'Mysore Road',
  'Other side of Mysore': 'Mysore Road',
  
  // Hosur
  'Bagalur Road': 'Hosur',
  'Mathigiri': 'Hosur',
  'Dankanikottai Road': 'Hosur',
  'Anthivadi Hosur': 'Hosur',
  
  // Mysore
  'Vijayanagar': 'Mysore',
  'Gokulam': 'Mysore',
  'Kuvempunagar': 'Mysore',
  'Jayanagar': 'Mysore',
  'Bannimantap,Palace road': 'Mysore',
  'Yadavgiri': 'Mysore',
  'Brindavan Extension': 'Mysore',
  'Siddhartha Nagar': 'Mysore',
  'Chamundipuram': 'Mysore'
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

export const REMINDER_TYPE = {
  WHITE_LABEL_30_DAY_FOLLOWUP: 'WHITE_LABEL_30_DAY_FOLLOWUP',
  MANUAL: 'MANUAL'
};

export const PRODUCTS = {
  DHOOP: 'Dhoop - 100g',
  CAMPHOR: 'Camphor - 100g',
  COTTON_WICKS: 'Cotton Wicks - 1 packet',
  AGARBATTI: 'Agarbatti',
  OIL: 'Oil - 1L',
  PACKAGING_COVER: 'Packaging Cover'
};

export const AGARBATTI_TYPES = {
  ROSE: 'Rose',
  SANDALWOOD: 'Sandalwood',
  LAVENDER: 'Lavender',
  ALL_IN_1: 'All in 1'
};

export const NOTE_TYPE = {
  GENERAL: 'GENERAL',
  DELIVERY: 'DELIVERY',
  FOLLOW_UP: 'FOLLOW_UP',
  REMINDER_COMPLETION: 'REMINDER_COMPLETION'
};

export const ACTIVITY_ACTION = {
  CUSTOMER_CREATED: 'CUSTOMER_CREATED',
  CUSTOMER_UPDATED: 'CUSTOMER_UPDATED',
  DELIVERY_CREATED: 'DELIVERY_CREATED',
  DELIVERY_UPDATED: 'DELIVERY_UPDATED',
  BILL_UPLOADED: 'BILL_UPLOADED',
  REMINDER_AUTO_CREATED: 'REMINDER_AUTO_CREATED',
  REMINDER_COMPLETED: 'REMINDER_COMPLETED',
  REMINDER_SNOOZED: 'REMINDER_SNOOZED',
  REMINDER_RESCHEDULED: 'REMINDER_RESCHEDULED',
  NOTE_ADDED: 'NOTE_ADDED'
};

export const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
