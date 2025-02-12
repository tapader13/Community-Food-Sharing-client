import { useRef } from 'react';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
const Newsletter = () => {
  const Ref = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Ref.current) {
      console.log(Ref.current.from_name);
      emailjs
        .sendForm(
          'service_qhettkc',
          'template_h5sside',
          Ref.current,
          'fynohaGtTgGTgJvdF'
        )
        .then(
          (result) => {
            console.log('Email sent:', result.text);
            toast.success('Subscription successful');
          },
          (error) => {
            console.log('Email send error:', error);
            toast.error('Subscription failed');
          }
        );
    }
  };

  return (
    <section className='bg-green-600 mb-16 py-12 w-11/12 mx-auto'>
      <div className='max-w-4xl mx-auto text-center'>
        <h2 className='text-3xl font-extrabold text-white sm:text-4xl'>
          Join Our Food Sharing Community
        </h2>
        <p className='mt-4 text-lg leading-6 text-white'>
          Sign up for our newsletter to receive updates on new food offerings,
          tips on reducing food waste, and information about local sharing
          events.
        </p>
        <form
          ref={Ref}
          onSubmit={handleSubmit}
          className='mt-8 sm:flex px-10 sm:px-0 justify-center'
        >
          <label htmlFor='email-address' className='sr-only'>
            Email address
          </label>
          <input
            id='email-address'
            name='email'
            type='email'
            autoComplete='email'
            required
            className='w-full px-5 py-3 placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white focus:border-white sm:max-w-xs rounded-md'
            placeholder='Enter your email'
          />
          <div className='mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0'>
            <button
              type='submit'
              className='w-full bg-white border border-transparent rounded-md py-3 px-5 font-medium text-green-600 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white sm:w-auto'
            >
              Subscribe
            </button>
          </div>
        </form>
        <p className='mt-3 text-sm text-white'>We care about your data.</p>
      </div>
    </section>
  );
};

export default Newsletter;
