const products = [
  {
    img: '/6788-amish-white-bread-DDMFS-4x3-6faa1e552bdb4f6eabdd7791e59b3c84.jpg',
    name: 'Bread',
    donor: 'John Doe',
    donorPhoto: '/asset 32.png',
    availability: 'Available',
    expiration: '2024-12-30',
    notes: 'Freshly baked, available until December 30th!',
    star: 4,
    color: '#FFEFD6',
  },
  {
    img: '/images.jpg',
    name: 'Honey',
    donor: 'Jane Smith',
    donorPhoto: '/asset 70.png',
    availability: 'Available',
    expiration: '2024-12-31',
    notes: 'Raw honey. Donate before it expires!',
    star: 5,
    color: '#EAF4FF',
  },
  {
    img: '/1371600807071.webp',
    name: 'Penne',
    donor: 'Mark Lee',
    donorPhoto: '/asset 71.png',
    availability: 'Available',
    expiration: '2024-12-25',
    notes: 'Pasta ready for donation. Expiring soon!',
    star: 4,
    color: '#FFEFD6',
  },
  {
    img: '/imagjes.jpg',
    name: 'Chick-pea',
    donor: 'Sarah Brown',
    donorPhoto: '/asset 72.png',
    availability: 'Requested',
    expiration: '2024-12-28',
    notes: 'Canned chick-peas available for donation.',
    star: 3,
    color: '#EAF4FF',
  },
];

import { Heart, Eye } from 'lucide-react';

const Offer = () => {
  return (
    <div className='w-11/12 mx-auto'>
      <div className='grid grid-cols-1 gap-10 justify-between md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {products.map((product, index) => (
          <div
            key={index}
            style={{ backgroundColor: product.color }}
            className='card relative p-5 rounded-lg shadow-lg'
          >
            <figure className='px-10 pt-10'>
              <img
                src={product.img}
                alt={product.name}
                className='rounded-xl w-full h-48 object-cover'
              />
            </figure>
            <div className='absolute text-white niconne text-xs top-2 right-2 bg-[#244263] h-14 w-14 flex items-center justify-center rounded-full'>
              {product.availability}
            </div>
            <div className='flex flex-col items-center justify-center mt-4'>
              <div className='flex items-center gap-3'>
                <h2 className='text-[#244263] font-bold text-xl'>
                  {product.name}
                </h2>
              </div>
              <p className='text-sm text-gray-600 mt-2'>{product.notes}</p>

              <div className='flex items-center gap-3 mt-2'>
                <img
                  src={product.donorPhoto}
                  alt={product.donor}
                  className='w-8 h-8 rounded-full'
                />
                <p className='text-sm text-[#244263] font-semibold'>
                  {product.donor}
                </p>
              </div>
              <p className='text-sm text-gray-600 mt-1'>
                Expires: {product.expiration}
              </p>
              <div className='flex items-center gap-4'>
                <button className='btn p-2 rounded-full bg-[#73B6FE] mt-4'>
                  <Eye size={20} color='#fff' />
                </button>
                <button className='btn p-2 bg-[#FF9167] rounded-full mt-4'>
                  <Heart size={20} color='#fff' />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offer;
