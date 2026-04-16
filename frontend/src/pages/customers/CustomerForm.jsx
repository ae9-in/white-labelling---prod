import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { customerAPI } from '../../services/api';
import { CUSTOMER_STATUS } from '../../constants';

const CustomerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      fetchCustomer();
    }
  }, [id]);

  const fetchCustomer = async () => {
    try {
      setLoading(true);
      const response = await customerAPI.getById(id);
      reset(response.data.data);
    } catch (error) {
      console.error('Failed to fetch customer:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      if (isEdit) {
        await customerAPI.update(id, data);
      } else {
        await customerAPI.create(data);
      }
      navigate('/customers');
    } catch (error) {
      console.error('Failed to save customer:', error);
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEdit ? 'Edit Business / Shop' : 'Add Business / Shop'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business / shop name
            </label>
            <input
              type="text"
              placeholder="Business / shop name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              {...register('businessName', { required: 'Business name is required' })}
            />
            {errors.businessName && (
              <p className="text-red-600 text-sm mt-1">{errors.businessName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Owner name
            </label>
            <input
              type="text"
              placeholder="Owner name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              {...register('contactPersonName', { required: 'Owner name is required' })}
            />
            {errors.contactPersonName && (
              <p className="text-red-600 text-sm mt-1">{errors.contactPersonName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone number 1
            </label>
            <input
              type="tel"
              placeholder="Phone number 1"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              {...register('phoneNumber1', { required: 'Phone number is required' })}
            />
            {errors.phoneNumber1 && (
              <p className="text-red-600 text-sm mt-1">{errors.phoneNumber1.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone number 2
            </label>
            <input 
              type="tel" 
              placeholder="Phone number 2"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
              {...register('phoneNumber2')} 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input 
              type="email" 
              placeholder="Email"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
              {...register('email')} 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business type
            </label>
            <input 
              type="text" 
              placeholder="Business type"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
              {...register('businessCategory')} 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address line 1
            </label>
            <input 
              type="text" 
              placeholder="Address line 1"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
              {...register('addressLine1')} 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address line 2
            </label>
            <input 
              type="text" 
              placeholder="Address line 2"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
              {...register('addressLine2')} 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State
            </label>
            <input 
              type="text" 
              placeholder="State"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
              {...register('state')} 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pincode
            </label>
            <input 
              type="text" 
              placeholder="Pincode"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
              {...register('pincode')} 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white" 
              {...register('status')}
            >
              {Object.values(CUSTOMER_STATUS).map(status => (
                <option key={status} value={status}>{status.replace(/_/g, ' ')}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City / Area
            </label>
            <input 
              type="text" 
              placeholder="City"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
              {...register('city')} 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description or notes
          </label>
          <textarea
            rows="4"
            placeholder="Description or notes"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            {...register('description')}
          />
        </div>

        <div className="flex justify-start space-x-4 pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors font-medium shadow-md disabled:opacity-50"
          >
            {submitting ? 'Saving...' : isEdit ? 'Update Business / Shop' : 'Create Business / Shop'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/customers')}
            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
