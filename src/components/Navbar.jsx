import { useState } from 'react';
import { Link } from 'react-router';
import { Menu, X } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser } = useAuth();

  return (
    <nav className='bg-white shadow-sm'>
      <div className='w-11/12 mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          {/* Logo */}
          <div className='flex-shrink-0 flex items-center'>
            <Link to='/' className='text-2xl font-bold'>
              <span className='text-green-600'>Food</span>
              <span className='text-gray-800'>Share</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className='hidden md:flex md:items-center md:space-x-8'>
            <Link
              to='/'
              className='text-gray-700 hover:text-green-600 px-3 py-2'
            >
              Home
            </Link>
            <Link
              to='/available-foods'
              className='text-gray-700 hover:text-green-600 px-3 py-2'
            >
              Available Foods
            </Link>
            {user?.email && (
              <>
                <Link
                  to='/add-food'
                  className='text-gray-700 hover:text-green-600 px-3 py-2'
                >
                  Add Food
                </Link>
                <Link
                  to='/manage-my-foods'
                  className='text-gray-700 hover:text-green-600 px-3 py-2'
                >
                  Manage My Foods
                </Link>
                <Link
                  to='/my-food-request'
                  className='text-gray-700 hover:text-green-600 px-3 py-2'
                >
                  My Food Request
                </Link>
              </>
            )}
            {!user ? (
              <div className='flex items-center space-x-4'>
                <Link
                  to='/login'
                  className='text-gray-700 hover:text-green-600 px-3 py-2'
                >
                  Login
                </Link>
                <Link
                  to='/register'
                  className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700'
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className='flex items-center space-x-4'>
                <img
                  src={user.photoURL}
                  alt='Profile'
                  className='w-8 h-8 rounded-full'
                />
                <button
                  onClick={() => logoutUser()}
                  className='text-gray-700 bg-red-500 px-4 py-2 rounded-lg hover:text-green-600'
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden flex items-center'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='text-gray-700 hover:text-green-600'
            >
              {isOpen ? (
                <X className='block h-6 w-6' />
              ) : (
                <Menu className='block h-6 w-6' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className='md:hidden'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            <Link
              to='/'
              className='block text-gray-700 hover:text-green-600 px-3 py-2'
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to='/available-foods'
              className='block text-gray-700 hover:text-green-600 px-3 py-2'
              onClick={() => setIsOpen(false)}
            >
              Available Foods
            </Link>
            {user?.email && (
              <>
                <Link
                  to='/add-food'
                  className='block text-gray-700 hover:text-green-600 px-3 py-2'
                  onClick={() => setIsOpen(false)}
                >
                  Add Food
                </Link>
                <Link
                  to='/manage-my-foods'
                  className='block text-gray-700 hover:text-green-600 px-3 py-2'
                  onClick={() => setIsOpen(false)}
                >
                  Manage My Foods
                </Link>
                <Link
                  to='/my-food-request'
                  className='block text-gray-700 hover:text-green-600 px-3 py-2'
                  onClick={() => setIsOpen(false)}
                >
                  My Food Request
                </Link>
                <button
                  onClick={() => {
                    logoutUser();
                    setIsOpen(false);
                  }}
                  className='block w-full bg-red-500 px-4 py-2 text-left text-gray-700 hover:text-green-600 rounded-lg'
                >
                  Logout
                </button>
              </>
            )}
            {!user && (
              <>
                <Link
                  to='/login'
                  className='block text-gray-700 hover:text-green-600 px-3 py-2'
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to='/register'
                  className='block text-gray-700 hover:text-green-600 px-3 py-2'
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
