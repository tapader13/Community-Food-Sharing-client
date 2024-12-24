import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const axiosInstance = axios.create({
  baseURL: 'https://backendas11.vercel.app',
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logoutUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // console.log('api response error status', error.status);
        if (error.status === 401 || error.status === 403) {
          logoutUser()
            .then(() => {
              console.log('User logged out');
              navigate('/login');
            })
            .catch((err) => console.log(err));
        }
        return Promise.reject(error);
      }
    );
  }, [isAuthenticated]);

  return axiosInstance;
};

export default useAxiosSecure;
