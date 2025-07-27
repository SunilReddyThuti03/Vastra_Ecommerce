import React from 'react';
import { Link } from 'react-router';
import featuredImage from '../../assets/featured.jpeg';

const FeaturedCollection = () => {

    return (
    <section className='px-8 py-16'>
        <div className='container mx-auto flex flex-col-reverse lg:flex-row items-center 
            bg-green-50 rounded-3xl'>
                {/* left content */}
                <div className='lg:w-1/2 p-8 text-center lg:text-left'>
                    <h2 className='text-2xl font-semibold text-center text-gray-700 mb-2'>
                        Comfort and Style
                    </h2>
                    <h2 className='text-4xl font-bold mb-6 lg:text-5xl'>
                        Apparel mafe for your everyday life
                    </h2>
                    <p className='text-lg text-gray-600 mb-6'>
                        Discover high-quality, comfortable clothing that effortlessly blends
                        fashion and function. Designed to make you look and feel great every day.
                    </p>
                    <div className='flex justify-center'>
                    <Link to="/collection/all" className='bg-gray-800 text-white px-6 py-3  rounded-lg hover:bg-gray-950' >Shop Now</Link>
                    </div>
                </div>
            
            <div className='lg:w-1/2'>
            <img 
                src={featuredImage}
                alt="Featured Image"
                className='object-cover w-full h-full lg:rounded-tr-3xl lg:rounded-br-3xl' />
            </div>
            </div>
    </section>
  )
}

export default FeaturedCollection
