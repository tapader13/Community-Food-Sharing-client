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
    <div className='w-11/12 mx-auto p-4'>
      <h2 className='text-3xl mt-6 font-bold text-left mb-6'>
        <span className='text-green-600'>Featured</span>{' '}
        <span className='text-gray-800'>Foods</span>
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {featuredFoods.map((food, index) => (
          <div
            key={index}
            className='border rounded-lg shadow-md overflow-hidden bg-white relative'
          >
            <img
              src={food.foodImage}
              alt={food.foodName}
              className='w-full h-80 object-cover'
            />
            <div className='bg-gray-800 opacity-50 absolute top-0 left-0 w-full h-full'></div>
            <div className='p-4 absolute bottom-0 left-0 w-full'>
              <h3 className='text-xl font-bold text-white'>{food.foodName}</h3>
              <p className='text-zinc-200'>Quantity: {food.foodQuantity} kg</p>
              <p className='text-zinc-200'>Location: {food.pickupLocation}</p>
              <p className='text-zinc-200 text-sm'>
                Expiry: {new Date(food.expiryDate).toLocaleDateString()}
              </p>
              <p className='text-zinc-200 text-sm'>{food.additionalNotes}</p>
              <p className='text-zinc-200 text-sm mt-2'>
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
          className='bg-green-600 font-medium text-white py-2 px-6 rounded hover:bg-blue-600'
        >
          Show All
        </button>
      </div>
    </div>
  );
};

export default Featured;
