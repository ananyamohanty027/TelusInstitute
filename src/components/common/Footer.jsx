/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaArrowRight } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GiOpenBook } from "react-icons/gi"; // Animated book icon

export const Footer = () => {
  return (
    <>
      <footer className='bg-gradient-to-r from-[#f9fafb] to-[#f3f4f6] py-8 pt-16 -mt-12 relative border-t-4 border-gray-300 hover:border-gray-400 transition-all duration-300'>
        {/* Main Footer Content */}
        <div className='containe mx-auto px-4 flex flex-wrap justify-between items-start gap-8'>
          {/* Animated Education Icon */}
          <div className='flex items-center justify-start flex-1 min-w-[150px]'>
            <GiOpenBook className='text-6xl text-gray-700 hover:text-gray-800 animate-bounce transition-all duration-300' /> {/* Animated book icon */}
          </div>

          {/* Company Section */}
          <div className='space-y-2 flex-1 min-w-[150px]'>
            <h4 className='text-gray-800 text-sm font-semibold mb-3 bg-gray-200 px-3 py-1 rounded-md inline-block hover:bg-gray-300 transition-all duration-300 flex items-center gap-2'>
              <FaArrowRight className='text-blue-600' /> {/* Blue arrow */}
              Company
            </h4>
            <NavLink to='#' className='text-[14px] block mb-1 text-gray-600 hover:text-gray-800 hover:underline transition-all duration-300'>
              Contact
            </NavLink>
            <NavLink to='#' className='text-[14px] block mb-1 text-gray-600 hover:text-gray-800 hover:underline transition-all duration-300'>
              Portfolio
            </NavLink>
            <NavLink to='#' className='text-[14px] block mb-1 text-gray-600 hover:text-gray-800 hover:underline transition-all duration-300'>
              Blog
            </NavLink>
            <NavLink to='#' className='text-[14px] block mb-1 text-gray-600 hover:text-gray-800 hover:underline transition-all duration-300'>
              Our team
            </NavLink>
            <NavLink to='#' className='text-[14px] block mb-1 text-gray-600 hover:text-gray-800 hover:underline transition-all duration-300'>
              Get in Touch
            </NavLink>
            <NavLink to='#' className='text-[14px] block mb-1 text-gray-600 hover:text-gray-800 hover:underline transition-all duration-300'>
              FAQ
            </NavLink>
            <NavLink to='#' className='text-[14px] block mb-1 text-gray-600 hover:text-gray-800 hover:underline transition-all duration-300'>
              Latest news
            </NavLink>
          </div>

          {/* Platform Section */}
          <div className='space-y-2 flex-1 min-w-[150px]'>
            <h4 className='text-gray-800 text-sm font-semibold mb-3 bg-gray-200 px-3 py-1 rounded-md inline-block hover:bg-gray-300 transition-all duration-300 flex items-center gap-2'>
              <FaArrowRight className='text-blue-600' /> {/* Blue arrow */}
              Platform
            </h4>
            <NavLink to='#' className='text-[14px] block mb-1 text-gray-600 hover:text-gray-800 hover:underline transition-all duration-300'>
              Shop
            </NavLink>
            <NavLink to='#' className='text-[14px] block mb-1 text-gray-600 hover:text-gray-800 hover:underline transition-all duration-300'>
              Pricing
            </NavLink>
            <NavLink to='#' className='text-[14px] block mb-1 text-gray-600 hover:text-gray-800 hover:underline transition-all duration-300'>
              Blog
            </NavLink>
            <NavLink to='#' className='text-[14px] block mb-1 text-gray-600 hover:text-gray-800 hover:underline transition-all duration-300'>
              Landing
            </NavLink>
          </div>

          {/* Subscribe Section */}
          <div className='space-y-2 flex-1 min-w-[150px]'>
            <h4 className='text-gray-800 text-sm font-semibold mb-3 bg-gray-200 px-3 py-1 rounded-md inline-block hover:bg-gray-300 transition-all duration-300 flex items-center gap-2'>
              <FaArrowRight className='text-blue-600' /> {/* Blue arrow */}
              Subscribe
            </h4>
            <NavLink to='#' className='text-[14px] block mb-1 text-gray-600 hover:text-gray-800 hover:underline transition-all duration-300'>
              About us
            </NavLink>
            <NavLink to='#' className='text-[14px] block mb-1 text-gray-600 hover:text-gray-800 hover:underline transition-all duration-300'>
              Contact
            </NavLink>
            <NavLink to='#' className='text-[14px] block mb-1 text-gray-600 hover:text-gray-800 hover:underline transition-all duration-300'>
              Reviews
            </NavLink>
            <NavLink to='#' className='text-[14px] block mb-1 text-gray-600 hover:text-gray-800 hover:underline transition-all duration-300'>
              Services
            </NavLink>
          </div>

          {/* Map Section */}
          <div className='flex-1 min-w-[250px]'>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.7663198358628!2d75.89119969603107!3d31.53057747871332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391afd668f24d407%3A0xfa9ba4877f17c3e2!2sTelus%20Institute!5e0!3m2!1sen!2sin!4v1727327979051!5m2!1sen!2sin"
              width="100%"
              height="200"
              style={{ border: '0', borderRadius: '10px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Social Icons */}
        <div className='containe mt-8 flex justify-center space-x-6'>
          <a href='https://facebook.com' className='text-blue-600 hover:text-blue-800 transition-all duration-300'>
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" className="text-black hover:text-gray-800 transition-all duration-300">
  <FaXTwitter size={24} />
</a>
          <a href='https://instagram.com' className='text-pink-600 hover:text-pink-800 transition-all duration-300'>
            <FaInstagram size={24} />
          </a>
          <a href='https://linkedin.com' className='text-blue-800 hover:text-blue-900 transition-all duration-300'>
            <FaLinkedin size={24} />
          </a>
        </div>
        <div className='text-center mt-8'>
          <h4 className='animated-text text-4xl font-bold'>
            <span className='bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent'>T</span>elus
            <span className='bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent'>I</span>nstitute
          </h4>
        </div>
      </footer>
    </>
  );
};