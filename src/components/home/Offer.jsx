const products = [
  {
    img: '/6788-amish-white-bread-DDMFS-4x3-6faa1e552bdb4f6eabdd7791e59b3c84.jpg',
    name: 'Bread',
    donor: 'John Doe',
    donorPhoto: '/asset 32.png',
    availability: 'Available',
    expiration: '2024-12-30',
    notes: 'Available until December 30th!',
    star: 4,
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
  },
];

const Offer = () => {
  return (
    <div className='w-11/12 mx-auto'>
      <h2 className='text-3xl font-bold  mb-8'>
        <span className='text-green-600'>Recent</span>{' '}
        <span className='text-gray-800 dark:text-gray-200'>Donations</span>
      </h2>
      <div className='grid grid-cols-1 gap-10 justify-between md:grid-cols-2 lg:grid-cols-3 '>
        {products.map((product, index) => (
          <div
            key={index}
            className='card relative h-[375px] p-5 border-gray-300 rounded-lg shadow-md bg-white dark:bg-gray-800 border '
          >
            <figure className='px-5 pt-5'>
              <img
                src={product.img || '/placeholder.svg'}
                alt={product.name}
                className='rounded-xl w-full h-48 object-cover'
              />
            </figure>
            <div className='absolute text-white text-xs top-2 right-2 bg-green-600 h-14 w-14 flex items-center justify-center rounded-full'>
              {product.availability}
            </div>
            <div className='flex flex-col items-center justify-center mt-4'>
              <div className='flex items-center gap-3'>
                <h2 className='text-gray-950 dark:text-white font-bold text-xl'>
                  {product.name}
                </h2>
              </div>
              <p className='text-sm text-gray-600 dark:text-gray-300 mt-2'>
                {product.notes}
              </p>

              <div className='flex items-center gap-3 mt-2'>
                <img
                  src={product.donorPhoto || '/placeholder.svg'}
                  alt={product.donor}
                  className='w-8 h-8 rounded-full'
                />
                <p className='text-sm text-gray-950 dark:text-white font-semibold'>
                  {product.donor}
                </p>
              </div>
              <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>
                Expires: {product.expiration}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offer;
