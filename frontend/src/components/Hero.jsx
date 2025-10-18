import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
const Hero = () => {
    return (
        <div className='flex flex-col sm:flex-row bg-yellow-900 min-h-[60vh] text-zinc-100'> 
            <div className='w-full sm:w-1/2 flex flex-col justify-center items-center sm:items-start px-8 py-16 sm:py-24 lg:px-16 text-center sm:text-left'>
                <div className='flex items-center gap-3 mb-3'>
                    <div className='w-10 h-0.5 bg-orange-50 opacity-75'></div> 
                    <p className='font-montserrat text-sm sm:text-base font-medium text-orange-50 tracking-wider uppercase'>
                        Our Best Seller
                    </p>
                </div>
                
                <h1 className='font-montserrat text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6'>
                    Latest Epic Drop!
                </h1>
                
                <Link 
                    to="/collection"
                    className='mt-4 inline-block bg-white text-yellow-950 font-montserrat font-semibold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300 ease-in-out transform hover:scale-105'
                >
                    Shop Now!
                </Link>
                
            </div>

            <div className='w-full sm:w-1/2 h-64 sm:h-auto'> 
                <img 
                    className='w-full h-full object-cover'
                    src={assets.hero_img} 
                    alt="Latest fashion collection showcase" 
                />
            </div>
        </div>
    );
};

export default Hero;