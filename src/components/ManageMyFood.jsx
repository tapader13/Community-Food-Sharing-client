import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import Spinner from './Spinner';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';

const ManageMyFood = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [food, setFood] = useState({});
  const axiosSecure = useAxiosSecure();
  const fetchFoods = async () => {
    try {
      // console.log('fetching foods', user?.email);
      setLoading(true);
      const res = await axiosSecure.get('/my-foods', {
        params: { email: user?.email },
      });
      if (res.data.success) {
        setFoods(res.data.data);
        setExpiryDate(new Date(res.data?.data[0]?.expiryDate));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteFood = async (foodId) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosSecure.delete(`/foods/${foodId}`);
          if (res.data.success) {
            fetchFoods();
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          }
        }
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axiosSecure.patch(`/foods/${food._id}`, {
        foodName: data.foodName,
        foodImage: data.foodImage,
        pickupLocation: data.pickupLocation,
        additionalNotes: data.additionalNotes,
        foodStatus: food.foodStatus,
        foodQuantity: parseInt(data.foodQuantity),
        donator: {
          name: food.donator.name,
          email: food.donator.email,
          image: food.donator.image,
        },
        expiryDate: expiryDate.toISOString(),
      });
      if (res?.data?.success) {
        const updateUi = foods.find((f) => f._id === food._id);
        if (updateUi) {
          updateUi.foodName = data.foodName;
          updateUi.foodQuantity = parseInt(data.foodQuantity);
          updateUi.expiryDate = new Date(expiryDate).toLocaleDateString();
        }
        toast.success(res.data.message);
        setModalOpen(false);
      }
      //   navigate('/available-foods');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFoods();
  }, []);
  useEffect(() => {
    if (food?.expiryDate) {
      setExpiryDate(new Date(food.expiryDate));
    }
  }, [food]);
  return (
    <div className='w-11/12 mx-auto sm:p-4'>
      <h2 className='text-2xl font-bold text-gray-950 dark:text-white text-center mb-6'>
        <span className='text-green-600'>Manage</span> My Foods
      </h2>
      {loading ? (
        <Spinner />
      ) : (
        foods.length > 0 && (
          <div className='overflow-x-auto'>
            <table className='table-auto text-gray-950 dark:text-white  w-full border-collapse border border-gray-200'>
              <thead>
                <tr>
                  <th className='border border-gray-300 px-4 py-2'>Name</th>
                  <th className='border border-gray-300 px-4 py-2'>Quantity</th>
                  <th className='border border-gray-300 px-4 py-2'>
                    ExpiryDate
                  </th>
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
                        onClick={() => {
                          setModalOpen(true);
                          setFood(food);
                        }}
                        className='bg-green-600 mb-2 sm:mb-0 text-white px-4 py-2 rounded mr-2'
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
          </div>
        )
      )}
      {/* modal */}
      {modalOpen && (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white  dark:bg-gray-700 p-6 h-96 md:h-[460px] lg:h-[510px] xl:h-auto rounded shadow-lg max-w-[400px] sm:max-w-md w-full overflow-y-auto'>
            <h3 className='text-xl font-bold mb-4'>Update Food Info</h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='max-w-lg mx-auto space-y-4'
            >
              {/* Food Name */}
              <div>
                <label
                  htmlFor='foodName'
                  className='block text-sm font-medium dark:text-gray-300 text-gray-700'
                >
                  Food Name
                </label>
                <input
                  type='text'
                  id='foodName'
                  defaultValue={food?.foodName}
                  {...register('foodName', {
                    required: 'Food name is required',
                  })}
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
                  className='block text-sm font-medium dark:text-gray-300 text-gray-700'
                >
                  Food Image URL
                </label>
                <input
                  type='text'
                  id='foodImage'
                  defaultValue={food?.foodImage}
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
                  className='block text-sm font-medium dark:text-gray-300 text-gray-700'
                >
                  Food Quantity
                </label>
                <input
                  type='number'
                  id='foodQuantity'
                  defaultValue={food?.foodQuantity}
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
                  className='block text-sm font-medium dark:text-gray-300 text-gray-700'
                >
                  Pickup Location
                </label>
                <input
                  type='text'
                  defaultValue={food?.pickupLocation}
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
                  className='block text-sm font-medium dark:text-gray-300 text-gray-700'
                >
                  Expired Date
                </label>
                <DatePicker
                  selected={expiryDate}
                  onChange={(date) => setExpiryDate(date)}
                  minDate={new Date()}
                  //   value={new Date(food?.expiryDate).toLocaleDateString()}
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
                  className='block text-sm font-medium dark:text-gray-300 text-gray-700'
                >
                  Additional Notes
                </label>
                <textarea
                  id='additionalNotes'
                  defaultValue={food?.additionalNotes}
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
                  Update Food
                </button>
              </div>
            </form>
            <div className='mt-4 flex justify-end'>
              <button
                onClick={() => setModalOpen(false)}
                className='px-4 py-2 bg-gray-300 rounded mr-2'
              >
                Cancel
              </button>
              {/* <button
                onClick={handleRequest}
                className='px-4 py-2 bg-green-500 text-white rounded'
              >
                Request
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMyFood;
