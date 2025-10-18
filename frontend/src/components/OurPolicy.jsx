import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
    return (
        <div className='flex flex-col sm:flex-row justify-around gap-12 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>

            {/* Item 1: Easy Exchange */}
            <div className='flex flex-col items-center gap-2'>
                <img src={assets.exchange_icon} className='w-12 mb-3' alt="Easy Exchange" />
                <p className='font-semibold'>Easy Exchange Policy</p>
                <p className='text-gray-500'>We Offer Free Exchange Policy</p>
            </div>

            {/* Item 2: Fast Delivery */}
            <div className='flex flex-col items-center gap-2'>
                <img src={assets.delivery_icon} className='w-12 mb-3' alt="Fast Delivery" />
                <p className='font-semibold'>Fast Delivery</p>
                <p className='text-gray-500'>Get Your Order Delivered in 3-4 Days</p>
            </div>

            {/* Item 3: Best Quality */}
            <div className='flex flex-col items-center gap-2'>
                <img src={assets.quality_icon} className='w-12 mb-3' alt="Best Quality" />
                <p className='font-semibold'>Best Quality</p>
                <p className='text-gray-500'>We Provide Products with Best Quality</p>
            </div>

        </div>
    );
};

export default OurPolicy;