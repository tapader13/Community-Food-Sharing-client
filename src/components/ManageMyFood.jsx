import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import Spinner from './Spinner';

const ManageMyFood = () => {
  const { user } = useAuth();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5001/my-foods', {
        params: { email: user?.email },
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

  const deleteFood = async (foodId) => {
    if (window.confirm('Are you sure you want to delete this food?')) {
      try {
        await axios.delete(`/foods/${foodId}`);
        toast.success('Food deleted successfully');
        fetchFoods(); // Refresh the list
      } catch (error) {
        toast.error('Failed to delete food');
      }
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);
  console.log(foods);
  return (
    <div className='w-11/12 mx-auto p-4'>
      <h2 className='text-2xl font-bold text-center mb-6'>
        <span className='text-green-600'>Manage</span> My Foods
      </h2>
      {loading ? (
        <Spinner />
      ) : (
        <table className='table-auto w-full border-collapse border border-gray-200'>
          <thead>
            <tr>
              <th className='border border-gray-300 px-4 py-2'>Name</th>
              <th className='border border-gray-300 px-4 py-2'>Quantity</th>
              <th className='border border-gray-300 px-4 py-2'>ExpiryDate</th>
              <th className='border border-gray-300 px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food._id}>
                <td className='border border-gray-300 px-4 py-2'>
                  {food?.foodName}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {food?.foodQuantity}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {new Date(food?.expiryDate).toLocaleDateString()}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  <button
                    onClick={() => console.log('Update', food)}
                    className='bg-green-600 text-white px-4 py-2 rounded mr-2'
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteFood(food._id)}
                    className='bg-red-500 text-white px-4 py-2 rounded'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageMyFood;
