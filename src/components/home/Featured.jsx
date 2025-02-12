import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
const Featured = () => {
  const navigate = useNavigate();

  const [featuredFoods, setFeaturedFoods] = useState([]);

  useEffect(() => {
    axios
      .get('https://backendas11.vercel.app/foods')
      .then((response) => {
        setFeaturedFoods(response.data?.data);
      })
      .catch((error) => {
        // console.error('Error fetching featured foods:', error);
      });
  }, []);

  return (
    <div className='w-11/12 mt-6 mx-auto py-4'>
      <h2 className='text-3xl mt-6 font-bold text-left mb-6'>
        <span className='text-green-600'>Featured</span>{' '}
        <span className='text-gray-800 dark:text-gray-200'>Foods</span>
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {featuredFoods.map((food, index) => (
          <div
            key={index}
            className='border rounded-lg shadow-md overflow-hidden bg-white relative group'
          >
            <img
              src={food.foodImage || '/placeholder.svg'}
              alt={food.foodName}
              className='w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70'></div>
            <div className='p-4 absolute bottom-0 left-0 w-full'>
              <h3 className='text-2xl font-bold text-white mb-2'>
                {food.foodName}
              </h3>
              <div className='flex justify-between items-center text-white mb-2'>
                <span className='bg-green-600 px-2 py-1 rounded-full text-sm'>
                  {food.foodQuantity} kg available
                </span>
                <span className='text-sm'>
                  Expires: {new Date(food.expiryDate).toLocaleDateString()}
                </span>
              </div>
              <p className='text-zinc-200 mb-2'>
                <span className='font-semibold'>Pickup:</span>{' '}
                {food.pickupLocation}
              </p>
              {food.additionalNotes && (
                <p className='text-zinc-200 text-sm mb-2 italic'>
                  &quot;{food.additionalNotes}&quot;
                </p>
              )}
              <p className='text-zinc-200 text-sm'>
                Donated by{' '}
                <span className='font-semibold'>{food.donator.name}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className='text-center mt-8'>
        <button
          onClick={() => navigate('/available-foods')}
          className='bg-green-600 font-medium text-white py-2 px-6 rounded-full hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105'
        >
          Show All Available Foods
        </button>
      </div>
    </div>
  );
};

export default Featured;
