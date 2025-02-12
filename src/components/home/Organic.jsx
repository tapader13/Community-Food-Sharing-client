const Organic = () => {
  const features = [
    {
      title: 'Join the Food Sharing Movement',
      description:
        'Help reduce food waste and share surplus food with those in need. Together, we can create a sustainable and compassionate community.',
      color: 'A6CEF9',
    },
    {
      title: 'Support Your Community',
      description:
        'By donating food, you’re directly supporting local families and individuals. Every contribution helps fight hunger and promotes goodwill.',
      color: 'FFA27E',
    },
    {
      title: 'Make a Positive Impact',
      description:
        'Your food donations can reduce waste and help provide nutritious meals to those who need them most. Be part of a solution for a better tomorrow.',
      color: 'FEEF75',
    },
  ];

  return (
    <section className='pb-10 pt-12 '>
      <div className='w-11/12 mx-auto'>
        <div className='grid grid-cols-1 justify-between md:grid-cols-2'>
          <div className='flex  flex-col justify-center items-center'>
            {features.map((feature, index) => (
              <div
                key={index}
                className='group flex items-start rounded-lg overflow-hidden'
              >
                <div
                  style={{ backgroundColor: `#${feature.color}` }}
                  className={`w-3 mt-8 h-3 rounded-[50%] flex items-center justify-center `}
                ></div>
                <div className='p-6'>
                  <h3 className='text-2xl font-bold text-[#244262] dark:text-gray-200 group-hover:text-green-600 transition-colors duration-300 mb-4'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400'>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-end'>
            <img
              className='block dark:hidden'
              src='/asset 27.jpeg'
              alt='Light Mode'
            />
            <img
              className='hidden dark:block'
              src='/asset 27-removebg-preview (1).jpg'
              alt='Dark Mode'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Organic;
