const Organic = () => {
  const features = [
    {
      title: 'Start with Our Company First',
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptat accusantium doloremque laudantium. Sed ut perspiciatis.',
      color: 'A6CEF9',
    },
    {
      title: 'Learn How to Grow Yourself',
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptat accusantium doloremque laudantium. Sed ut perspiciatis.',
      color: 'FFA27E',
    },
    {
      title: 'Farming Strategies of Today',
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptat accusantium doloremque laudantium. Sed ut perspiciatis.',
      color: 'FEEF75',
    },
  ];

  return (
    <section className='py-16 bg-white'>
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
                  <h3 className='text-2xl font-bold text-[#244262] group-hover:text-green-600 transition-colors duration-300 mb-4'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-600'>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-end'>
            <img className='' src='/asset 27.jpeg' alt='' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Organic;
