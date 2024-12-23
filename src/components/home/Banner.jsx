import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Banner = () => {
  const slides = [
    {
      image: '/Variety-fruits-vegetables.webp',
      title: 'Share & Reduce Waste',
      subtitle: 'Donate surplus food and help others in need.',
      discount: 'Only Today: 30% More Food for Every Donation!',
      cta: 'Start Donating Today',
    },
    {
      image: '/healthy-eating-ingredients-1296x728-header.jpg',
      title: 'Support Your Community',
      subtitle: 'Fresh food from your neighbors, for your neighbors.',
      discount: 'Only Today: 30% More Food for Every Request!',
      cta: 'Request Food Now',
    },
    {
      image: '/premium_photo-1670601440146-3b33dfcd7e17.avif',
      title: 'Eco-friendly Giving',
      subtitle: 'Reduce food waste and make a positive impact.',
      discount: 'Only Today: 30% More for Every Surplus Shared!',
      cta: 'Join the Movement',
    },
  ];

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className='mySwiper'
    >
      {' '}
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          {' '}
          <div className='relative h-[600px] sm:h-[90vh] w-full'>
            {' '}
            <img
              src={slide.image}
              alt={slide.title}
              className='absolute inset-0 w-full h-full object-cover'
            />{' '}
            <div className='absolute inset-0 bg-black bg-opacity-40'></div>{' '}
            <div className='absolute inset-0 p-2 flex flex-col sm:p-10 text-white text-center'>
              {' '}
              <div className='w-full flex justify-between items-start sm:px-10'>
                {' '}
                <p className='sm:text-2xl text-sm abril font-semibold'>
                  {slide.discount}
                </p>{' '}
                <p className='sm:text-2xl text-sm abril font-semibold'>
                  {slide.cta}
                </p>{' '}
              </div>{' '}
              <div className='transform relative top-1/2 -translate-y-1/2'>
                {' '}
                <h2 className='sm:text-[80px] text-[50px] abril font-bold mb-1'>
                  {' '}
                  {slide.title}{' '}
                </h2>{' '}
                <p className='text-xl mb-6'>{slide.subtitle}</p>{' '}
              </div>{' '}
            </div>{' '}
          </div>{' '}
        </SwiperSlide>
      ))}{' '}
    </Swiper>
  );
};

export default Banner;
