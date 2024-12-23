import { Home } from 'lucide-react';
import { Link } from 'react-router';

export default function Error() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center text-center px-4'>
      <div>
        <h1 className='text-6xl md:text-8xl font-bold text-green-600 mb-4'>
          404
        </h1>
        <h2 className='text-3xl md:text-4xl font-semibold text-gray-800 mb-6'>
          Oops! Page Not Found
        </h2>
      </div>

      <p className='text-xl text-gray-600 mb-8 max-w-md'>
        Looks like this page is as empty as an empty plate. Let&apos;s find you
        something delicious!
      </p>

      <div className='flex flex-col sm:flex-row gap-4'>
        <button>
          <Link to='/'>
            <Home className='mr-2 h-4 w-4' /> Go Home
          </Link>
        </button>
      </div>
    </div>
  );
}
