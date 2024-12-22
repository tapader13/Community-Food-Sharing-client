import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
const Featured = () => {
  const navigate = useNavigate();

  const [featuredFoods, setFeaturedFoods] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5001/foods')
      .then((response) => {
        setFeaturedFoods(response.data?.data);
      })
      .catch((error) => {
        console.error('Error fetching featured foods:', error);
      });
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold text-center mb-6'>
        <span className='text-green-600'>Featured</span>{' '}
        <span className='text-gray-800'>Foods</span>
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6'>
        {featuredFoods.map((food, index) => (
          <div
            key={index}
            className='border rounded-lg shadow-md overflow-hidden bg-white'
          >
            <img
              src={food.foodImage}
              alt={food.foodName}
              className='w-full h-40 object-cover'
            />
            <div className='p-4'>
              <h3 className='text-lg font-semibold text-gray-800'>
                {food.foodName}
              </h3>
              <p className='text-gray-600'>Quantity: {food.foodQuantity} kg</p>
              <p className='text-gray-600'>Location: {food.pickupLocation}</p>
              <p className='text-gray-600 text-sm'>
                Expiry: {new Date(food.expiryDate).toLocaleDateString()}
              </p>
              <p className='text-gray-600 text-sm'>{food.additionalNotes}</p>
              <p className='text-gray-600 text-sm mt-2'>
                Donated by:{' '}
                <span className='font-semibold'>{food.donator.name}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className='text-center mt-6'>
        <button
          onClick={() => navigate('/available-foods')}
          className='bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600'
        >
          Show All
        </button>
      </div>
    </div>
  );
};

export default Featured;
