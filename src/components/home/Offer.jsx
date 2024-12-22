const products = [
  {
    img: '/asset 28.jpeg',
    name: 'Bread',
    price: '$7',
    mainPrice: '$8',
    discount: '-12%',
    star: 4,
    color: '#FFEFD6',
  },
  {
    img: '/asset 29.jpeg',
    name: 'Honey',
    price: '$22',
    mainPrice: '$25',
    discount: '-12%',
    star: 5,
    color: '#EAF4FF',
  },
  {
    img: '/asset 30.jpeg',
    name: 'Penne',
    price: '$11',
    mainPrice: '$13',
    discount: '-15%',
    star: 4,
    color: '#FFEFD6',
  },
  {
    img: '/asset 31.jpeg',
    name: 'Chick-pea',
    price: '$11',
    mainPrice: '$14',
    discount: '-21%',
    star: 3,
    color: '#EAF4FF',
  },
];
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
const Offer = () => {
  return (
    <div className='w-11/12 mx-auto'>
      <div className='grid grid-cols-1 gap-5 justify-between md:grid-cols-4'>
        {products.map((product, index) => (
          <div
            key={index}
            style={{ backgroundColor: product.color }}
            className='card w-80 relative  '
          >
            <div className='absolute text-white text-3xl niconne top-0 right-0 bg-[#244263] h-20 w-20 flex items-center justify-center'>
              {product.discount}
            </div>
            <figure className='px-10 pt-10'>
              <img src={product.img} alt='Shoes' className='rounded-xl' />
            </figure>
            <div className='flex flex-col items-center justify-center'>
              <div className='flex items-center gap-3'>
                <h2 className='text-[#244263] font-bold text-xl'>
                  {product.name}
                </h2>

                <h2 className='line-through font-bold text-xl'>
                  {product.mainPrice}
                </h2>
                <h2 className='text-[#FFA27E] font-bold text-xl'>
                  {' '}
                  {product.price}
                </h2>
              </div>
              <p>{product.price} / kg</p>
              <div className='flex items-center mt-2  gap-2'>
                {[...Array(5)].map((_, index) =>
                  index < product.star ? (
                    <Star key={index} size={15} fill='#244263' />
                  ) : (
                    <Star key={index} size={15} color='#244263' />
                  )
                )}
              </div>
              <div className='flex items-center mb-5 gap-4'>
                <button className='btn mt-4 rounded-full p-2 bg-[#092E56]'>
                  <ShoppingCart size={20} color='#fff' />
                </button>
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
