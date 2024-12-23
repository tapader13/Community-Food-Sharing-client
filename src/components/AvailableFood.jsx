import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Spinner from './Spinner';
import { useQuery } from '@tanstack/react-query';

const AvailableFood = () => {
  // const [foods, setFoods] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();
  const [isThreeColumn, setIsThreeColumn] = useState(true);
  const [search, setSearch] = useState('');

  const fetchFoods = async (sortOption) => {
    // try {
    // setLoading(true);

    const params = {
      status: 'available',
    };

    if (sortOption) {
      const [field, order] = sortOption.split('-');
      params.sortField = field;
      params.sortOrder = order;
    }
    if (search) {
      params.search = search;
    }
    const res = await axios.get('https://backendas11.vercel.app/foods/all', {
      params,
    });

    if (res.data.success) {
      // console.log(res.data.data);
      return res.data.data;
      // setFoods(res.data.data);
    } else {
      throw new Error(res.data.message || 'Failed to fetch foods');
    }
    // } catch (error) {
    // toast.error(error.response.data.message);
    // } finally {
    // setLoading(false);
    // }
  };

  const toggleLayout = () => {
    setIsThreeColumn(!isThreeColumn);
  };
  // useEffect(() => {
  //   fetchFoods(sortOption);
  // }, [sortOption]);
  const {
    data: foods = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['availableFoods', sortOption, search],
    queryFn: () => fetchFoods(sortOption),
  });
  return (
    <div className='w-11/12 mx-auto p-4'>
      <h2 className='text-2xl font-bold text-center mb-3'>
        {' '}
        <span className='text-green-600'>Available</span> Foods
      </h2>
      <div className='flex justify-center gap-10 items-center mb-4'>
        <div>
          <input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search by food name'
            className='px-4 py-2 border focus:ring-2  focus:outline-none focus:ring-green-600 border-gray-300 rounded'
          />
        </div>
        <div className=''>
          <button
            className='text-xl hidden sm:block text-white w-fit px-4 py-2 cursor-pointer bg-green-600  border border-gray-300 rounded font-bold text-center'
            onClick={toggleLayout}
          >
            Change Layout
          </button>
        </div>
      </div>

      {/* Sort Section */}
      <div className='flex justify-between items-center mb-4'>
        <label htmlFor='sort' className='text-gray-700 font-bold'>
          Sort By:
        </label>
        <select
          id='sort'
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className='px-4 py-2 cursor-pointer border border-gray-300 rounded'
        >
          <option value=''>Default (No Sorting)</option>
          <option value='expiryDate-asc'>Expiry Date (Ascending)</option>
          <option value='expiryDate-desc'>Expiry Date (Descending)</option>
          <option value='foodQuantity-desc'>Quantity (Highest First)</option>
          <option value='foodQuantity-asc'>Quantity (Lowest First)</option>
        </select>
      </div>

      {/* Loading Indicator */}
      {isLoading && <Spinner />}
      {isError && <p className='text-red-500'>{error.message}</p>}

      {/* Foods Section */}
      <div
        className={`food-grid ${
          isThreeColumn ? 'three-columns' : 'two-columns'
        }`}
        // className={`grid grid-cols-1  md:grid-cols-${
        //   isThreeColumn ? 3 : 2
        // } gap-4`}
      >
        {foods.length > 0 ? (
          foods.map((food) => (
            <div
              key={food._id}
              className='border border-gray-300 rounded-lg shadow-md p-4'
            >
              <img
                src={food.foodImage}
                alt={food.foodName}
                className={`w-full h-48 object-cover rounded-md mb-4`}
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
          ))
        ) : (
          <p className='text-red-500'>No foods available</p>
        )}
      </div>
    </div>
  );
};

export default AvailableFood;
