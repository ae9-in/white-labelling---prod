import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { reminderAPI } from '../../services/api';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Pagination from '../../components/common/Pagination';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { REMINDER_STATUS } from '../../constants';

const ReminderList = () => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [filters, setFilters] = useState({
    status: '',
    upcomingOnly: false,
    overdueOnly: false
  });
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [completionNote, setCompletionNote] = useState('');

  useEffect(() => {
    fetchReminders();
  }, [pagination.page, filters]);

  const fetchReminders = async () => {
    try {
      setLoading(true);
      const response = await reminderAPI.getAll({
        page: pagination.page,
        limit: 10,
        ...filters
      });
      setReminders(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Failed to fetch reminders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    try {
      await reminderAPI.complete(selectedReminder._id, completionNote);
      setShowCompleteModal(false);
      setCompletionNote('');
      fetchReminders();
    } catch (error) {
      console.error('Failed to complete reminder:', error);
      alert(error.message);
    }
  };

  const handleSnooze = async (id) => {
    const days = prompt('Snooze for how many days?', '7');
    if (days) {
      const snoozedUntil = new Date();
      snoozedUntil.setDate(snoozedUntil.getDate() + parseInt(days));
      try {
        await reminderAPI.snooze(id, snoozedUntil.toISOString());
        fetchReminders();
      } catch (error) {
        console.error('Failed to snooze reminder:', error);
        alert(error.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reminders</h1>
        <p className="text-gray-600">Manage follow-up reminders</p>
      </div>

      <div className="card p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            className="input"
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value, page: 1 }))}
          >
            <option value="">All Status</option>
            {Object.values(REMINDER_STATUS).map(status => (
              <option key={status} value={status}>{status.replace(/_/g, ' ')}</option>
            ))}
          </select>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.upcomingOnly}
              onChange={(e) => setFilters(prev => ({ ...prev, upcomingOnly: e.target.checked, overdueOnly: false }))}
            />
            <span className="text-sm">Upcoming Only</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.overdueOnly}
              onChange={(e) => setFilters(prev => ({ ...prev, overdueOnly: e.target.checked, upcomingOnly: false }))}
            />
            <span className="text-sm">Overdue Only</span>
          </label>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="space-y-4">
            {reminders.map((reminder) => (
              <div key={reminder._id} className="card p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{reminder.title}</h3>
                      <StatusBadge status={reminder.status} />
                      {reminder.createdBySystem && (
                        <span className="badge bg-blue-100 text-blue-800">Auto-Generated</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{reminder.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Shop:</span>
                        <p className="font-medium">{reminder.shopId?.shopName}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Reminder Date:</span>
                        <p className="font-medium">{formatDate(reminder.reminderDate)}</p>
                      </div>
                      {reminder.deliveryId && (
                        <>
                          <div>
                            <span className="text-gray-600">Delivery Date:</span>
                            <p className="font-medium">{formatDate(reminder.deliveryId.deliveryDate)}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Delivery Amount:</span>
                            <p className="font-medium">{formatCurrency(reminder.deliveryId.totalAmount)}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 ml-4">
                    {reminder.status !== REMINDER_STATUS.DONE && (
                      <>
                        <button
                          onClick={() => {
                            setSelectedReminder(reminder);
                            setShowCompleteModal(true);
                          }}
                          className="btn btn-primary text-sm"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => handleSnooze(reminder._id)}
                          className="btn btn-secondary text-sm"
                        >
                          Snooze
                        </button>
                      </>
                    )}
                    <Link
                      to={`/shops/${reminder.shopId?._id}`}
                      className="btn btn-secondary text-sm text-center"
                    >
                      View Shop
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={(page) => setPagination(prev => ({ ...prev, page }))}
          />
        </>
      )}

      {showCompleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Complete Reminder</h3>
            <textarea
              className="input mb-4"
              rows="4"
              placeholder="Add completion note (optional)"
              value={completionNote}
              onChange={(e) => setCompletionNote(e.target.value)}
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowCompleteModal(false);
                  setCompletionNote('');
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button onClick={handleComplete} className="btn btn-primary">
                Mark Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReminderList;
