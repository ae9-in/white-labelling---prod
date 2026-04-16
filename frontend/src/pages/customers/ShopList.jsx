import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { shopAPI } from '../../services/api';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Pagination from '../../components/common/Pagination';
import { SHOP_STATUS } from '../../constants';
import { ZONES, PLACES_BY_ZONE } from '../../constants/places';

const ShopList = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    zone: '',
    place: ''
  });
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    fetchShops();
  }, [pagination.page, filters]);

  useEffect(() => {
    if (filters.zone) {
      setAvailablePlaces(PLACES_BY_ZONE[filters.zone] || []);
    } else {
      setAvailablePlaces([]);
    }
  }, [filters.zone]);

  const fetchShops = async () => {
    try {
      setLoading(true);
      const response = await shopAPI.getAll({
        page: pagination.page,
        limit: 10,
        ...filters
      });
      setShops(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Failed to fetch shops:', error);
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
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Main Tracking View</p>
          <h1 className="text-3xl font-bold text-gray-900">Shops and Relationship Pipeline</h1>
          <p className="text-gray-600 mt-2">Search, filter, sort, and take quick actions on business and shop accounts from one command center.</p>
        </div>
        <Link to="/customers/new" className="px-6 py-3 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors font-medium shadow-md">
          Add new shop
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search shops, phones, areas, products..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
          </div>
          <div>
            <select
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="">All statuses</option>
              {Object.values(SHOP_STATUS).map(status => (
                <option key={status} value={status}>{status.replace(/_/g, ' ')}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
              value={filters.zone}
              onChange={(e) => {
                handleFilterChange('zone', e.target.value);
                handleFilterChange('place', '');
              }}
            >
              <option value="">All zones</option>
              {ZONES.map(zone => (
                <option key={zone.value} value={zone.value}>{zone.label}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
              value={filters.place}
              onChange={(e) => handleFilterChange('place', e.target.value)}
              disabled={!filters.zone}
            >
              <option value="">— Pick zone first —</option>
              {availablePlaces.map(place => (
                <option key={place} value={place}>{place}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : shops.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
          <div className="text-center">
            <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No shops match these filters</h3>
            <p className="text-gray-600 mb-6">Try widening the search or reset one of the filter controls to bring shops back into view.</p>
            <Link to="/customers/new" className="inline-block px-6 py-3 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors font-medium">
              Add Your First Shop
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-sm font-semibold text-gray-700">Full shop register</h3>
              </div>
              <p className="text-xs text-gray-500 mt-1">Detailed list view with direct access to every business and shop record.</p>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business / Shop</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Place</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Staff</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Open</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {shops.map((shop) => (
                  <tr key={shop._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{shop.shopName}</div>
                      <div className="text-xs text-gray-500">{shop.businessType}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{shop.ownerName}</div>
                      <div className="text-xs text-gray-500">{shop.phoneNumber1}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{shop.place || '-'}</div>
                      <div className="text-xs text-gray-500">{shop.zone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={shop.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{shop.assignedStaff || 'Unassigned'}</td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        to={`/customers/${shop._id}`} 
                        className="text-teal-600 hover:text-teal-900 font-medium text-sm"
                      >
                        View →
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

export default ShopList;
