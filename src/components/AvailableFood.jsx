import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import Spinner from './Spinner';

const AvailableFood = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();

  const fetchFoods = async (sortOption) => {
    try {
      setLoading(true);

      const params = {
        status: 'available',
      };

      if (sortOption) {
        const [field, order] = sortOption.split('-');
        params.sortField = field;
        params.sortOrder = order;
      }

      const res = await axios.get('http://localhost:5001/foods/all', {
        params,
      });

      if (res.data.success) {
        setFoods(res.data.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods(sortOption);
  }, [sortOption]);

  return (
    <div className='w-11/12 mx-auto p-4'>
      <h2 className='text-2xl font-bold text-center mb-6'>Available Foods</h2>

      {/* Sort Section */}
      <div className='flex justify-between items-center mb-4'>
        <label htmlFor='sort' className='text-gray-700 font-bold'>
          Sort By:
        </label>
        <select
          id='sort'
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className='px-4 py-2 border border-gray-300 rounded'
        >
          <option value=''>Default (No Sorting)</option>
          <option value='expiryDate-asc'>Expiry Date (Ascending)</option>
          <option value='expiryDate-desc'>Expiry Date (Descending)</option>
          <option value='foodQuantity-desc'>Quantity (Highest First)</option>
          <option value='foodQuantity-asc'>Quantity (Lowest First)</option>
        </select>
      </div>

      {/* Loading Indicator */}
      {loading && <Spinner />}

      {/* Foods Section */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {foods.map((food) => (
          <div
            key={food._id}
            className='border border-gray-300 rounded-lg shadow-md p-4'
          >
            <img
              src={food.foodImage}
              alt={food.foodName}
              className='w-full h-40 object-cover rounded-md mb-4'
            />
            <h3 className='text-lg font-bold'>{food.foodName}</h3>
            <p className='text-gray-700'>Quantity: {food.foodQuantity}</p>
            <p className='text-gray-700'>
              Expiry Date: {new Date(food.expiryDate).toLocaleDateString()}
            </p>
            <button
              onClick={() => navigate(`/food/${food._id}`)}
              className='mt-4 bg-green-500 text-white px-4 py-2 rounded'
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableFood;
