import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import Spinner from './Spinner';
import useAxiosSecure from '../hooks/useAxiosSecure';

const MyFoodRequest = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const fetchFoodRequests = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get('/my-food-request', {
        params: { email: user?.email },
      });
      if (res.data.success) {
        setRequests(res.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchFoodRequests();
    }
  }, [user?.email]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='w-11/12 mx-auto p-4'>
      <h2 className='text-2xl font-bold text-center mb-6'>
        <span className='text-green-600'>My</span> Food Requests
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {requests.length > 0 ? (
          requests.map((request) => (
            <div
              key={request._id}
              className='border border-gray-200 rounded-lg p-4 shadow-md bg-white'
            >
              <img
                src={request.foodImage}
                alt={request.foodName}
                className='w-full h-48 object-cover mb-4'
              />
              <h3 className='text-lg font-bold mb-2'>{request.foodName}</h3>
              <p className='mb-1'>
                <strong>Donor Name:</strong> {request.donatorName}
              </p>
              <p className='mb-1'>
                <strong>Donor Email:</strong> {request.donatorEmail}
              </p>
              <p className='mb-1'>
                <strong>Pickup Location:</strong> {request.pickupLocation}
              </p>
              <p className='mb-1'>
                <strong>Expire Date:</strong>{' '}
                {new Date(request.expiryDate).toLocaleDateString()}
              </p>
              <p className='mb-1'>
                <strong>Request Date:</strong>{' '}
                {new Date(request.requestDate).toLocaleDateString()}
              </p>
              <p className='mb-1'>
                <strong>Additional Notes:</strong> {request.additionalNotes}
              </p>
            </div>
          ))
        ) : (
          <p className='text-center col-span-full'>No food requests found.</p>
        )}
      </div>
    </div>
  );
};

export default MyFoodRequest;
