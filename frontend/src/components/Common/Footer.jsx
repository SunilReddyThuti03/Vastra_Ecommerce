import React from 'react'
import { Link } from 'react-router';
import { TbBrandMeta} from 'react-icons/tb';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';
import { FiPhoneCall} from 'react-icons/fi';
import { useRef } from 'react';

const Footer = () => {

    const inputref = useRef(null);
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(inputref.current.value);
    }
    return (
        <footer className='border-t pt-12 m-5'>
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 lg:px-0'>
                <div>
                    <h3 className=' text-gray-800 font-semibold mb-4'>Newsletter</h3>
                    <p className=' text-sm text-gray-500  mb-4'>
                        Be the first to hear about new updates.
                    </p>
                    <p className='mb-3 text-sm '>Sign up and get 10% off on your first order.</p>

                    <form className='mt-1 flex' onSubmit={ handleSubmit}>
                        <input type="email" placeholder='Enter your email'
                            className='p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md
                                focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all ' 
                                ref ={inputref} required/>
                        <button type='submit' className='bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all'>
                            Subscribe
                        </button>
                    </form>
                </div>
                {/* shops link */}
                <div>
                    <h3 className='text-lg text-gray-800 font-semibold mb-4'>Shop</h3>
                    <ul className='space-y-2 text-sm text-gray-500'>
                        <li>
                            <Link 
                                to="/collections/all?category=Top+Wear&gender=Men"
                                className='hover:text-gray-900 transition-colors'>
                                    Men's Top Wear
                                </Link>
                        </li>
                        <li>
                                <Link 
                                to="/collections/all?category=Top+Wear&gender=Women"
                                className='hover:text-gray-900 transition-colors'>
                                    Women's Top Wear
                                </Link>
                                </li>
                                <li>
                                <Link 
                                to="/collections/all?category=Bottom+Wear&gender=Men"
                                className='hover:text-gray-900 transition-colors'>
                                    Men's Bottom Wear
                                </Link>
                                </li>
                            <li> 
                                 <Link 
                                to="/collections/all?category=Bottom+Wear&gender=Women"
                                className='hover:text-gray-900 transition-colors'>
                                    Women's Bottom Wear
                                </Link>
                        </li>
                    </ul>
                </div>
                {/* dupport links */}
                <div>
                    <h3 className='text-lg text-gray-800 mb-4 font-semibold'>Support</h3>
                    <ul className='space-y-2 text-sm text-gray-500'>
                        <li>
                            <Link to="#" className='hover:text-gray-900 transition-colors'>Contact Us</Link>
                        </li>
                        <li>
                            <Link to="#" className='hover:text-gray-900 transition-colors'>About Us</Link>
                        </li>
                        <li>
                            <Link to="#" className='hover:text-gray-900 transition-colors'>FAQ's</Link>
                        </li>
                        <li>
                            <Link to="#" className='hover:text-gray-900 transition-colors'>Features</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className='text-lg text-gray-800 mb-4 font-semibold'>Follow us</h3>
                    <div className='flex items-center space-x-4 mb-6'>
                        <a href="https://facebook.com" target='_blank' rel="noopener noreferer" 
                            className='hover:text-gray-300'>
                                <IoLogoInstagram className='h-4 w-4' />
                            </a>
                        <a href="https://facebook.com" target='_blank' rel="noopener noreferer" 
                            className='hover:text-gray-300'>
                                <TbBrandMeta className='h-4 w-4' />
                            </a>
                        <a href="https://facebook.com" target='_blank' rel="noopener noreferer" 
                            className='hover:text-gray-300'>
                                <RiTwitterXLine className='h-4 w-4' />
                            </a>
                    </div>
                    <p>
                        <FiPhoneCall className='inline-block mr-2 '/> +91 12345 67890
                    </p>
                </div>
            </div>

            <div className='container mx-auto mt-6 lg:px-0 border-t border-gray-200 pt-6'>
                <p className='text-gray-500 text-sm tracking-tighter text-center'>
                    @2025 Vastra Store. All Rights Reserved. 
                </p>
            </div>
        </footer>
        )
}

export default Footer;