import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const { loginUser, googleLogin, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loc = useLocation();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    const { email, password } = data;
    const frm = loc?.state?.from?.pathname || '/';
    loginUser(email, password)
      .then((user) => {
        toast.success('Login successful');
        setTimeout(() => {
          navigate(frm, { replace: true });
        }, 1000);
        // navigate(frm, { replace: true });
      })
      .catch((err) => {
        toast.error(
          'Failed to log in. Please check your credentials and try again.'
        );
      });
  };

  const handleGoogleLogin = async () => {
    try {
      const frm = loc?.state?.from?.pathname || '/';
      const user = await googleLogin();
      if (user) {
        toast.success('Logged in with Google');
        setTimeout(() => {
          navigate(frm, { replace: true });
        }, 1000);
        // navigate(frm, { replace: true });
      }
    } catch (error) {
      toast.error('Google login failed. Please try again.');
    }
  };

  return (
    <div className='min-h-screen  flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-950 dark:text-gray-200'>
          Log in to your account
        </h2>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium dark:text-gray-200 text-gray-700'
              >
                Email address
              </label>
              <div className='mt-1'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-950 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
                {errors.email && (
                  <p className='mt-2 text-sm text-red-600'>
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium dark:text-gray-200 text-gray-700'
              >
                Password
              </label>
              <div className='mt-1'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 text-gray-950 dark:text-white bg-white dark:bg-gray-800 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
                  {...register('password', {
                    required: 'Password is required',
                  })}
                />
                {errors.password && (
                  <p className='mt-2 text-sm text-red-600'>
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type='submit'
                disabled={loading}
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              >
                {loading ? 'Logging in...' : 'Log in'}
              </button>
            </div>
          </form>

          <div className='mt-6'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-300' />
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-white dark:bg-gray-800  text-gray-500'>
                  Or continue with
                </span>
              </div>
            </div>

            <div className='mt-6'>
              <button
                onClick={handleGoogleLogin}
                className='w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
              >
                <FaGoogle className='mr-2' /> Log in with Google
              </button>
            </div>
          </div>

          <div className='mt-6'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-300' />
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-white dark:bg-gray-800 text-gray-500'>
                  Don&apos;t have an account?
                </span>
              </div>
            </div>

            <div className='mt-6'>
              <Link
                to='/register'
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium dark:bg-gray-700 text-green-600 bg-white hover:bg-gray-50'
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
