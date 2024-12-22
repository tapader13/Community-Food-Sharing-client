import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
// import { useNavigate } from 'react-router';
import useAuth from './../hooks/useAuth';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const AddFood = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [expiryDate, setExpiryDate] = useState(new Date());
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5001/foods', {
        ...data,
        foodStatus: 'available',
        foodQuantity: parseInt(data.foodQuantity),
        donator: {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        },
        expiryDate: expiryDate.toISOString(),
      });
      if (res?.data?.success) {
        toast.success(res.data.message);
      }
      //   navigate('/available-foods');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-11/12 mx-auto p-4'>
      <h2 className='text-2xl font-bold text-center mb-6'>
        <span className='text-green-600'>Add</span>{' '}
        <span className='text-gray-800'>Food</span>
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='max-w-lg mx-auto space-y-4'
      >
        {/* Food Name */}
        <div>
          <label
            htmlFor='foodName'
            className='block text-sm font-medium text-gray-700'
          >
            Food Name
          </label>
          <input
            type='text'
            id='foodName'
            {...register('foodName', { required: 'Food name is required' })}
            className='w-full px-4 py-2 border border-gray-300 rounded'
          />
          {errors.foodName && (
            <p className='text-red-500 text-xs mt-1'>
              {errors.foodName.message}
            </p>
          )}
        </div>

        {/* Food Image URL */}
        <div>
          <label
            htmlFor='foodImage'
            className='block text-sm font-medium text-gray-700'
          >
            Food Image URL
          </label>
          <input
            type='text'
            id='foodImage'
            {...register('foodImage', {
              required: 'Food image URL is required',
              pattern: {
                value:
                  /^(https?:\/\/)?(www\.)?([a-zA-Z0-9.-]+)\.([a-z]{2,6})(\/[^\s]*)?$/,
                message: 'Invalid URL',
              },
            })}
            className='w-full px-4 py-2 border border-gray-300 rounded'
          />
          {errors.foodImage && (
            <p className='text-red-500 text-xs mt-1'>
              {errors.foodImage.message}
            </p>
          )}
        </div>

        {/* Food Quantity */}
        <div>
          <label
            htmlFor='foodQuantity'
            className='block text-sm font-medium text-gray-700'
          >
            Food Quantity
          </label>
          <input
            type='number'
            id='foodQuantity'
            {...register('foodQuantity', {
              required: 'Food quantity is required',
              min: 1,
            })}
            className='w-full px-4 py-2 border border-gray-300 rounded'
          />
          {errors.foodQuantity && (
            <p className='text-red-500 text-xs mt-1'>
              {errors.foodQuantity.message}
            </p>
          )}
        </div>

        {/* Pickup Location */}
        <div>
          <label
            htmlFor='pickupLocation'
            className='block text-sm font-medium text-gray-700'
          >
            Pickup Location
          </label>
          <input
            type='text'
            id='pickupLocation'
            {...register('pickupLocation', {
              required: 'Pickup location is required',
            })}
            className='w-full px-4 py-2 border border-gray-300 rounded'
          />
          {errors.pickupLocation && (
            <p className='text-red-500 text-xs mt-1'>
              {errors.pickupLocation.message}
            </p>
          )}
        </div>

        {/* Expired Date */}
        <div>
          <label
            htmlFor='expiryDate'
            className='block text-sm font-medium text-gray-700'
          >
            Expired Date
          </label>
          <DatePicker
            selected={expiryDate}
            onChange={(date) => setExpiryDate(date)}
            minDate={new Date()}
            // showTimeSelect
            dateFormat='yyyy/MM/dd'
            className='w-full px-4 py-2 border border-gray-300 rounded'
          />
          {errors.expiryDate && (
            <p className='text-red-500 text-xs mt-1'>
              {errors.expiryDate.message}
            </p>
          )}
        </div>

        {/* Additional Notes */}
        <div>
          <label
            htmlFor='additionalNotes'
            className='block text-sm font-medium text-gray-700'
          >
            Additional Notes
          </label>
          <textarea
            id='additionalNotes'
            {...register('additionalNotes', {
              required: 'Additional notes is required',
            })}
            className='w-full px-4 py-2 border border-gray-300 rounded'
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button
            disabled={loading}
            type='submit'
            className='w-full bg-green-600 text-white py-2 rounded'
          >
            Add Food
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFood;
