import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

const Register = () => {
  const { signUpUser, loading, setUser, updateProfileUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { name, email, photoURL, password } = data;
    // console.log(data);
    signUpUser(email, password)
      .then((user) => {
        if (user && !user.displayName) {
          updateProfileUser({
            displayName: name,
            photoURL: photoURL,
          })
            .then(() => {
              fetch('https://backendas11.vercel.app/users', {
                method: 'POST',
                headers: {
                  'content-type': 'application/json',
                },
                body: JSON.stringify({ name, email, photoURL }),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data?.data?.insertedId) {
                    setUser((prev) => ({
                      ...prev,
                      displayName: name,
                      photoURL: photoURL,
                    }));
                    toast.success('Registration successful.');
                    navigate('/');
                  }
                });
            })
            .catch((err) => {
              toast.error('Failed to update profile. Please try again.');
            });
        }
      })
      .catch((err) => {
        toast.error('Failed to register. Please try again.');
      });
  };

  return (
    <div className='min-h-screen  flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-950 dark:text-gray-200'>
          Create your account
        </h2>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium dark:text-gray-200 text-gray-700'
              >
                Name
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  name='name'
                  type='text'
                  //   autoComplete='name'
                  //   required
                  className='appearance-none text-gray-950 dark:text-white bg-white dark:bg-gray-800 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && (
                  <p className='mt-2 text-sm text-red-600'>
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

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
                  //   autoComplete='email'
                  //   required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 text-gray-950 dark:text-white bg-white dark:bg-gray-800 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
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
                htmlFor='photoURL'
                className='block text-sm font-medium dark:text-gray-200 text-gray-700'
              >
                Photo URL
              </label>
              <div className='mt-1'>
                <input
                  id='photoURL'
                  name='photoURL'
                  type='url'
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 text-gray-950 dark:text-white bg-white dark:bg-gray-800 focus:border-green-500 sm:text-sm'
                  {...register('photoURL', {
                    required: 'Photo URL is required',
                    pattern: {
                      value:
                        /^(https?:\/\/)?(www\.)?([a-zA-Z0-9.-]+)\.([a-z]{2,6})(\/[^\s]*)?$/,
                      message: 'Invalid URL',
                    },
                  })}
                />
                {errors.photoURL && (
                  <p className='mt-2 text-sm text-red-600'>
                    {errors.photoURL.message}
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
                  //   autoComplete='new-password'
                  // required
                  className='appearance-none text-gray-950 dark:text-white bg-white dark:bg-gray-800 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters long',
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                      message:
                        'Password must contain at least one uppercase and one lowercase letter',
                    },
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
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>

          <div className='mt-6'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-300' />
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-white dark:bg-gray-800 text-gray-500'>
                  Already have an account?
                </span>
              </div>
            </div>

            <div className='mt-6'>
              <Link
                to='/login'
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium dark:bg-gray-700 text-green-600 bg-white hover:bg-gray-200'
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
