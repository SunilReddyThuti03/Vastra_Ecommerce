import React from 'react';
import {TbBrandMeta} from 'react-icons/tb';
import {RiTwitterXLine} from 'react-icons/ri';
import {IoLogoInstagram} from 'react-icons/io';

const Topbar = () => {
  return (
    <div className='bg-gray-800  text-white'>
        <div className='container mx-auto flex justify-between items-center px-10 py-2'>
            <div className='hidden md:flex items-center space-x-2'>
                <a href="#" className=' hover:text-gray-300'>
                    <TbBrandMeta className="h-5 w-5"/>
                </a>
                <a href="#" className='hover:text-gray-300'>
                    <IoLogoInstagram className="h-5 w-5"/>
                </a>
                <a href="#" className='hover:text-gray-300'>
                    <RiTwitterXLine className="h-5 w-5"/>
                </a>
            </div>
            <div className='text-sm text-center flex-grow'>
                <span>We Ship WorldWide - Fast and Reliable Shipping!!</span>
            </div>
            <div className='text-sm hidden md:block'>
                <a href="tel:+1234567890" className='md:hover:text-green-300'>+91 12345 67890</a>
            </div>
        </div>
    </div>
  )
}

export default Topbar;
