import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dashboardAPI } from '../../services/api';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { formatDate, formatCurrency } from '../../utils/formatters';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [upcomingReminders, setUpcomingReminders] = useState([]);
  const [overdueReminders, setOverdueReminders] = useState([]);
  const [recentShops, setRecentShops] = useState([]);
  const [recentDeliveries, setRecentDeliveries] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [summaryRes, upcomingRes, overdueRes, shopsRes, deliveriesRes] = await Promise.all([
        dashboardAPI.getSummary(),
        dashboardAPI.getUpcomingReminders(5),
        dashboardAPI.getOverdueReminders(5),
        dashboardAPI.getRecentShops(5),
        dashboardAPI.getRecentDeliveries(5)
      ]);

      setSummary(summaryRes.data.data);
      setUpcomingReminders(upcomingRes.data.data);
      setOverdueReminders(overdueRes.data.data);
      setRecentShops(shopsRes.data.data);
      setRecentDeliveries(deliveriesRes.data.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your white-label operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Shops"
          value={summary?.totalShops || 0}
          icon={<span className="text-2xl">👥</span>}
          color="primary"
        />
        <StatCard
          title="Active Shops"
          value={summary?.activeShops || 0}
          icon={<span className="text-2xl">✅</span>}
          color="green"
        />
        <StatCard
          title="Total Deliveries"
          value={summary?.totalDeliveries || 0}
          icon={<span className="text-2xl">📦</span>}
          color="purple"
        />
        <StatCard
          title="Deliveries This Month"
          value={summary?.deliveriesThisMonth || 0}
          icon={<span className="text-2xl">📈</span>}
          color="primary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Pending Reminders"
          value={summary?.pendingReminders || 0}
          color="yellow"
        />
        <StatCard
          title="Upcoming Reminders"
          value={summary?.upcomingReminders || 0}
          color="primary"
        />
        <StatCard
          title="Overdue Reminders"
          value={summary?.overdueReminders || 0}
          color="red"
        />
        <StatCard
          title="Completed This Month"
          value={summary?.completedRemindersThisMonth || 0}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Reminders</h2>
            <Link to="/reminders" className="text-sm text-primary-600 hover:text-primary-700">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingReminders.length === 0 ? (
              <p className="text-sm text-gray-500">No upcoming reminders</p>
            ) : (
              upcomingReminders.map((reminder) => (
                <div key={reminder._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{reminder.shopId?.shopName}</p>
                    <p className="text-xs text-gray-600">{reminder.title}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-xs text-gray-600">{formatDate(reminder.reminderDate)}</p>
                    <StatusBadge status={reminder.status} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Overdue Reminders</h2>
            <Link to="/reminders?status=OVERDUE" className="text-sm text-red-600 hover:text-red-700">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {overdueReminders.length === 0 ? (
              <p className="text-sm text-gray-500">No overdue reminders</p>
            ) : (
              overdueReminders.map((reminder) => (
                <div key={reminder._id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{reminder.shopId?.shopName}</p>
                    <p className="text-xs text-gray-600">{reminder.title}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-xs text-gray-600">{formatDate(reminder.reminderDate)}</p>
                    <StatusBadge status={reminder.status} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Shops</h2>
            <Link to="/shops" className="text-sm text-primary-600 hover:text-primary-700">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentShops.map((shop) => (
              <Link
                key={shop._id}
                to={`/shops/${shop._id}`}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{shop.shopName}</p>
                  <p className="text-xs text-gray-600">{shop.ownerName}</p>
                </div>
                <StatusBadge status={shop.status} />
              </Link>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Deliveries</h2>
            <Link to="/deliveries" className="text-sm text-primary-600 hover:text-primary-700">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentDeliveries.map((delivery) => (
              <Link
                key={delivery._id}
                to={`/deliveries/${delivery._id}`}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{delivery.shopId?.shopName}</p>
                  <p className="text-xs text-gray-600">{formatDate(delivery.deliveryDate)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{formatCurrency(delivery.totalAmount)}</p>
                  <StatusBadge status={delivery.deliveryStatus} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
