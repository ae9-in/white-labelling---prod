import { STATUS_COLORS } from '../../constants';

const StatusBadge = ({ status }) => {
  const colorClass = STATUS_COLORS[status] || 'bg-gray-100 text-gray-800';
  
  return (
    <span className={`badge ${colorClass}`}>
      {status?.replace(/_/g, ' ')}
    </span>
  );
};

export default StatusBadge;
