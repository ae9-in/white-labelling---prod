import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { deliveryAPI, shopAPI } from '../../services/api';
import { DELIVERY_STATUS, PRODUCTS, AGARBATTI_TYPES } from '../../constants';

const DeliveryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [shops, setShops] = useState([]);
  
  const { register, handleSubmit, control, watch, formState: { errors }, reset, setValue } = useForm({
    defaultValues: {
      items: [{ product: '', type: '', quantity: 1, price: 0 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  });

  const watchItems = watch('items');
  const isEdit = Boolean(id);

  useEffect(() => {
    fetchShops();
    if (isEdit) {
      fetchDelivery();
    }
  }, [id]);

  const fetchShops = async () => {
    try {
      const response = await shopAPI.getAll({ limit: 1000 });
      setShops(response.data.data);
    } catch (error) {
      console.error('Failed to fetch shops:', error);
    }
  };

  const fetchDelivery = async () => {
    try {
      setLoading(true);
      const response = await deliveryAPI.getById(id);
      const delivery = response.data.data;
      reset({
        shopId: delivery.shopId._id,
        deliveryDate: delivery.deliveryDate.split('T')[0],
        deliveryStatus: delivery.deliveryStatus,
        notes: delivery.notes,
        items: delivery.items
      });
    } catch (error) {
      console.error('Failed to fetch delivery:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateSubtotal = (index) => {
    const item = watchItems[index];
    if (item && item.quantity && item.price) {
      return item.quantity * item.price;
    }
    return 0;
  };

  const calculateTotal = () => {
    return watchItems.reduce((total, item) => {
      if (item.quantity && item.price) {
        return total + (item.quantity * item.price);
      }
      return total;
    }, 0);
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      
      const formattedData = {
        ...data,
        items: data.items.map(item => ({
          product: item.product,
          type: item.type || undefined,
          quantity: parseFloat(item.quantity),
          price: parseFloat(item.price),
          subtotal: parseFloat(item.quantity) * parseFloat(item.price)
        }))
      };

      if (isEdit) {
        await deliveryAPI.update(id, formattedData);
      } else {
        await deliveryAPI.create(formattedData);
      }
      navigate('/deliveries');
    } catch (error) {
      console.error('Failed to save delivery:', error);
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const isAgarbatti = (product) => product === 'Agarbatti';

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? 'Edit Delivery' : 'Create New Delivery'}
        </h1>
        <p className="text-gray-600">Fill in the delivery details</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="card p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Delivery Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shop *
              </label>
              <select
                className="input"
                {...register('shopId', { required: 'Shop is required' })}
              >
                <option value="">Select Shop</option>
                {shops.map(shop => (
                  <option key={shop._id} value={shop._id}>
                    {shop.shopName} - {shop.ownerName}
                  </option>
                ))}
              </select>
              {errors.shopId && (
                <p className="text-red-600 text-sm mt-1">{errors.shopId.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Date *
              </label>
              <input
                type="date"
                className="input"
                {...register('deliveryDate', { required: 'Delivery date is required' })}
              />
              {errors.deliveryDate && (
                <p className="text-red-600 text-sm mt-1">{errors.deliveryDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Status
              </label>
              <select className="input" {...register('deliveryStatus')}>
                {Object.values(DELIVERY_STATUS).map(status => (
                  <option key={status} value={status}>{status.replace(/_/g, ' ')}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              rows="3"
              className="input"
              {...register('notes')}
            />
          </div>
        </div>

        <div className="card p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Product Items</h2>
            <button
              type="button"
              onClick={() => append({ product: '', type: '', quantity: 1, price: 0 })}
              className="btn btn-secondary text-sm"
            >
              + Add Item
            </button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 bg-gray-50 rounded-lg space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Item {index + 1}</span>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product *
                    </label>
                    <select
                      className="input"
                      {...register(`items.${index}.product`, { required: 'Product is required' })}
                    >
                      <option value="">Select Product</option>
                      {PRODUCTS.map(product => (
                        <option key={product.value} value={product.value}>
                          {product.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {isAgarbatti(watchItems[index]?.product) && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type *
                      </label>
                      <select
                        className="input"
                        {...register(`items.${index}.type`, { 
                          required: isAgarbatti(watchItems[index]?.product) ? 'Type is required for Agarbatti' : false 
                        })}
                      >
                        <option value="">Select Type</option>
                        {AGARBATTI_TYPES.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="input"
                      {...register(`items.${index}.quantity`, { 
                        required: 'Quantity is required',
                        min: { value: 0.01, message: 'Quantity must be positive' }
                      })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="input"
                      {...register(`items.${index}.price`, { 
                        required: 'Price is required',
                        min: { value: 0, message: 'Price must be non-negative' }
                      })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subtotal
                    </label>
                    <input
                      type="text"
                      className="input bg-gray-100"
                      value={`₹${calculateSubtotal(index).toFixed(2)}`}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-200">
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">₹{calculateTotal().toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/deliveries')}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary disabled:opacity-50"
          >
            {submitting ? 'Saving...' : isEdit ? 'Update Delivery' : 'Create Delivery'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeliveryForm;
