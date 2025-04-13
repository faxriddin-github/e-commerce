import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 opacity-10">
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="150" cy="150" r="120" stroke="#6366F1" strokeWidth="2" strokeDasharray="8 8"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-2 md:gap-12">
        {/* Text content */}
        <div className="md:w-1/2 space-y-6">
          <span className="inline-block px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full">
            New Arrivals
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Elegant Jewelry for <span className="text-indigo-600">Every Moment</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-md">
            Discover our carefully curated collection of minimalist jewelry that complements your personal style.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center gap-2">
              Shop Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-indigo-400 hover:text-indigo-600 transition-colors duration-300">
              View Collection
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-90 h-90 md:w-100 md:h-100 rounded-lg overflow-hidden ">
            <Image
              src="/12085283_20944108.svg" // Replace with your image
              alt="Minimalist Jewelry"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-white/10 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;