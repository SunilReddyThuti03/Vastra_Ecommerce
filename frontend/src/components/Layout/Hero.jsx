import React from 'react';
import heroImage from '../../assets/heroImage.jpeg';
import { Link } from 'react-router-dom'; // ✅ corrected from 'react-router' to 'react-router-dom'

const Hero = () => {
  return (
    <section className="relative w-full">
      <img
        src={heroImage}
        alt="vastra"
        className="w-full h-[300px] sm:h-[400px] md:h-[600px] lg:h-[750px] object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-center text-white px-4 sm:px-8">
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight uppercase mb-4 leading-tight">
            Urban <br /> Escape
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-6 tracking-wide max-w-[600px] mx-auto">
            Discover monochrome fashion for every adventure.
          </p>
          <Link
            to="/collections/all"
            className="inline-block bg-white text-black px-5 py-2 sm:px-6 sm:py-2.5 rounded-md text-sm sm:text-base font-semibold transition hover:bg-gray-200"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
