import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router';

const AddFood = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [user, setUser] = useState({
    name: 'John Doe', // Replace with actual user data from your authentication system
    email: 'johndoe@example.com', // Same here
    image: 'path_to_image', // User's image URL
  });
  const navigate = useNavigate();

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Send the form data to your Express API via Axios
      await axios.post('/api/foods', {
        ...data,
        donator: {
          name: user.name,
          email: user.email,
          image: user.image,
        },
      });

      // Redirect to Available Foods page after successful submission
      navigate('/available-foods');
    } catch (error) {
      console.error('Error adding food:', error);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold text-center mb-6'>Add Food</h2>
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
          <input
            type='datetime-local'
            id='expiryDate'
            {...register('expiryDate', { required: 'Expiry date is required' })}
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
            {...register('additionalNotes')}
            className='w-full px-4 py-2 border border-gray-300 rounded'
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded'
          >
            Add Food
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFood;
