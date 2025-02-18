import { useRef, useState } from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { Link } from 'react-router';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

export function Footer() {
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
    <footer className='bg-gray-900 mt-16 text-white'>
      <div className='w-11/12 mx-auto  py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div>
            <h2 className='text-2xl font-bold mb-4'>Food Share</h2>
            <p className='text-gray-400'>
              Connecting communities through food sharing and reducing surplus
              waste.
            </p>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link to='/' className='hover:text-green-400 transition-colors'>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to='/available-foods'
                  className='hover:text-green-400 transition-colors'
                >
                  Available Foods
                </Link>
              </li>
              <li>
                <Link
                  to='/add-food'
                  className='hover:text-green-400 transition-colors'
                >
                  Add Food
                </Link>
              </li>
              <li>
                <Link
                  to='/manage-my-foods'
                  className='hover:text-green-400 transition-colors'
                >
                  Manage My Foods
                </Link>
              </li>
              <li>
                <Link
                  to='/my-food-request'
                  className='hover:text-green-400 transition-colors'
                >
                  My Food Request
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Contact Us</h3>
            <ul className='space-y-2'>
              <li className='flex items-center'>
                <Mail className='w-5 h-5 mr-2' />
                <span>minhajuddintapader@gmail.com</span>
              </li>
              <li className='flex items-center'>
                <Phone className='w-5 h-5 mr-2' />
                <span>+880 1786 224382</span>
              </li>
              <li className='flex items-center'>
                <MapPin className='w-5 h-5 mr-2' />
                <span>123 Food St, Sylhet, Bangladesh</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Newsletter</h3>
            <form ref={Ref} onSubmit={handleSubmit} className='space-y-2'>
              <input
                type='email'
                placeholder='Your email'
                name='email'
                required
                className='bg-gray-800 w-full mb-2 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 border-gray-700 text-white'
              />
              <button
                type='submit'
                className='w-full  px-5 py-2 bg-green-600 hover:bg-green-700'
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className='mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center'>
          <p className='text-gray-400'>
            &copy; {new Date().getFullYear()} Food Share. All rights reserved.
          </p>
          <div className='flex space-x-4 mt-4 sm:mt-0'>
            <a
              href='#'
              className='text-gray-400 hover:text-white transition-colors'
            >
              <a
                href='http://www.facebook.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Facebook className='w-6 h-6' />
              </a>
            </a>
            <a
              href='#'
              className='text-gray-400 hover:text-white transition-colors'
            >
              <a
                href='http://www.twitter.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Twitter className='w-6 h-6' />
              </a>
            </a>
            <a
              href='#'
              className='text-gray-400 hover:text-white transition-colors'
            >
              <a
                href='http://www.instagram.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Instagram className='w-6 h-6' />
              </a>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
