export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const isOverdue = (date) => {
  return new Date(date) < new Date();
};

export const isUpcoming = (date, daysAhead = 7) => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffTime = targetDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 && diffDays <= daysAhead;
};

export const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};
