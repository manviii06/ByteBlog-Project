import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-400 px-6 max-w-7xl mx-auto">
        {/* Logo + Description */}
        <div className="md:w-1/3 ">
          <div className='flex items-center gap-4 mt-0'>
          <img
            alt="logo"
            className=" w-32 sm:w-44 mb-4 "
            src={assets.logo} // Make sure logo file is in your public folder or use import
          />
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500">ByteBlog</h1>
            </div>
          <p className="max-w-md text-sm leading-relaxed mr-10 ">
            ByteBlog empowers creators to share their voice, grow an audience, and monetize content with ease. Start your journey today.
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-between w-full md:w-[60%] gap-8 ">
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-base text-white mb-4">Quick Links</h3>
            <ul className="text-sm space-y-2 ">
              <li><a href="#" className="hover:underline hover:text-purple-600 transition-colors duration-300">Home</a></li>
              <li><a href="#" className="hover:underline hover:text-purple-600 transition-colors duration-300">Best Sellers</a></li>
              <li><a href="#" className="hover:underline hover:text-purple-600 transition-colors duration-300">Offers & Deals</a></li>
              <li><a href="#" className="hover:underline hover:text-purple-600 transition-colors duration-300">Contact Us</a></li>
              <li><a href="#" className="hover:underline hover:text-purple-600 transition-colors duration-300">FAQs</a></li>
              </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-semibold text-base text-white mb-4">Need Help?</h3>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:underline hover:text-purple-600 transition-colors duration-300">Delivery Information</a></li>
              <li><a href="#" className="hover:underline hover:text-purple-600 transition-colors duration-300">Return & Refund Policy</a></li>
              <li><a href="#" className="hover:underline hover:text-purple-600 transition-colors duration-300">Payment Methods</a></li>
              <li><a href="#" className="hover:underline hover:text-purple-600 transition-colors duration-300">Track your Order</a></li>
              <li><a href="#" className="hover:underline hover:text-purple-600 transition-colors duration-300">Contact Us</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-base text-white mb-4">Follow Us</h3>
            <ul className="text-m space-y-2">
              <li><a href="#" className="hover:underline hover:text-purple-600 transition-colors duration-300">Instagram</a></li>
              <li><a href="#" className="hover:underline hover:text-purple-600 transition-colors duration-300">Twitter</a></li>
              <li><a href="#" className="hover:underline hover:text-purple-600 transition-colors duration-300">Facebook</a></li>
              <li><a href="#" className="hover:underline hover:text-purple-600 transition-colors duration-300">YouTube</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-6">
        &copy; {new Date().getFullYear()} Blogging Platform. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
