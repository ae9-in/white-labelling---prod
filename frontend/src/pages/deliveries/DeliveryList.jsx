import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deliveryAPI } from '../../services/api';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Pagination from '../../components/common/Pagination';
import EmptyState from '../../components/common/EmptyState';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { DELIVERY_STATUS } from '../../constants';

const DeliveryList = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [filters, setFilters] = useState({
    deliveryStatus: '',
    deliveryDateFrom: '',
    deliveryDateTo: ''
  });

  useEffect(() => {
    fetchDeliveries();
  }, [pagination.page, filters]);

  const fetchDeliveries = async () => {
    try {
      setLoading(true);
      const response = await deliveryAPI.getAll({
        page: pagination.page,
        limit: 10,
        ...filters
      });
      setDeliveries(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Failed to fetch deliveries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deliveries</h1>
          <p className="text-gray-600">Manage white-label deliveries</p>
        </div>
        <Link to="/deliveries/new" className="btn btn-primary">
          + Create Delivery
        </Link>
      </div>

      <div className="card p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            className="input"
            value={filters.deliveryStatus}
            onChange={(e) => handleFilterChange('deliveryStatus', e.target.value)}
          >
            <option value="">All Status</option>
            {Object.values(DELIVERY_STATUS).map(status => (
              <option key={status} value={status}>{status.replace(/_/g, ' ')}</option>
            ))}
          </select>
          <input
            type="date"
            className="input"
            placeholder="From Date"
            value={filters.deliveryDateFrom}
            onChange={(e) => handleFilterChange('deliveryDateFrom', e.target.value)}
          />
          <input
            type="date"
            className="input"
            placeholder="To Date"
            value={filters.deliveryDateTo}
            onChange={(e) => handleFilterChange('deliveryDateTo', e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : deliveries.length === 0 ? (
        <div className="card">
          <EmptyState
            message="No deliveries found"
            action={
              <Link to="/deliveries/new" className="btn btn-primary">
                Create Your First Delivery
              </Link>
            }
          />
        </div>
      ) : (
        <>
          <div className="card overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shop</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivery Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {deliveries.map((delivery) => (
                  <tr key={delivery._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {delivery.shopId?.shopName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {delivery.shopId?.ownerName}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {formatDate(delivery.deliveryDate)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {delivery.items?.length || 0} items
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {formatCurrency(delivery.totalAmount)}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={delivery.deliveryStatus} />
                    </td>
                    <td className="px-6 py-4 text-right text-sm space-x-2">
                      <Link to={`/deliveries/${delivery._id}`} className="text-primary-600 hover:text-primary-900">
                        View
                      </Link>
                      <Link to={`/deliveries/${delivery._id}/edit`} className="text-gray-600 hover:text-gray-900">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={(page) => setPagination(prev => ({ ...prev, page }))}
          />
        </>
      )}
    </div>
  );
};

export default DeliveryList;
