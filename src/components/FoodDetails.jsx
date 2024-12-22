import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import useAuth from './../hooks/useAuth';
import toast from 'react-hot-toast';
import Spinner from './Spinner';

const FoodDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [food, setFood] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5001/foods/${id}`);
        if (res.data?.success) {
          setFood(res.data.data);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFoodDetails();
  }, [id]);

  const handleRequest = async () => {
    // try {
    //   const requestData = {
    //     foodId: food._id,
    //     foodName: food.foodName,
    //     foodImage: food.foodImage,
    //     donatorEmail: food.donator.email,
    //     donatorName: food.donator.name,
    //     userEmail: user.email,
    //     requestDate: new Date().toISOString(),
    //     pickupLocation: food.pickupLocation,
    //     expiryDate: food.expiryDate,
    //     additionalNotes,
    //   };
    //   const res = await axios.post(
    //     'http://localhost:5001/food-requests',
    //     requestData
    //   );
    //   if (res.data.success) {
    //     toast.success('Food requested successfully');
    //     setModalOpen(false);
    //     setAdditionalNotes('');
    //   }
    // } catch (error) {
    //   toast.error(error.response.data.message);
    // }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-3xl font-bold text-center mb-6'>{food.foodName}</h2>
      <div className='flex flex-col items-center'>
        <img
          src={food.foodImage}
          alt={food.foodName}
          className='w-96 rounded mb-4'
        />
        <p>
          <strong>Quantity:</strong> {food.foodQuantity}
        </p>
        <p>
          <strong>Pickup Location:</strong> {food.pickupLocation}
        </p>
        <p>
          <strong>Donar Name:</strong> {food.donator.name}
        </p>
        <p>
          <strong>Expiry Date:</strong>{' '}
          {new Date(food.expiryDate).toLocaleString()}
        </p>
        <p>
          <strong>Additional Notes:</strong> {food.additionalNotes}
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className='mt-4 bg-green-500 text-white py-2 px-4 rounded'
        >
          Request Food
        </button>
      </div>

      {/* Request Modal */}
      {modalOpen && (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-6 rounded shadow-lg max-w-md w-full'>
            <h3 className='text-xl font-bold mb-4'>Request Food</h3>
            <div className='space-y-2'>
              <p>
                <strong>Food Name:</strong> {food.foodName}
              </p>
              <p>
                <strong>Food Image:</strong>
              </p>
              <img
                src={food.foodImage}
                alt={food.foodName}
                className='w-32 rounded mb-2'
              />
              <p>
                <strong>Food ID:</strong> {food._id}
              </p>
              <p>
                <strong>Donator Email:</strong> {food.donator.email}
              </p>
              <p>
                <strong>Donator Name:</strong> {food.donator.name}
              </p>
              <p>
                <strong>User Email:</strong> {user.email}
              </p>
              <p>
                <strong>Request Date:</strong> {new Date().toLocaleString()}
              </p>
              <p>
                <strong>Pickup Location:</strong> {food.pickupLocation}
              </p>
              <p>
                <strong>Expiry Date:</strong>{' '}
                {new Date(food.expiryDate).toLocaleString()}
              </p>
              <div>
                <label
                  htmlFor='additionalNotes'
                  className='block text-sm font-medium'
                >
                  Additional Notes
                </label>
                <textarea
                  id='additionalNotes'
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  className='w-full border px-2 py-1'
                ></textarea>
              </div>
            </div>
            <div className='mt-4 flex justify-end'>
              <button
                onClick={() => setModalOpen(false)}
                className='px-4 py-2 bg-gray-300 rounded mr-2'
              >
                Cancel
              </button>
              <button
                onClick={handleRequest}
                className='px-4 py-2 bg-green-500 text-white rounded'
              >
                Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
