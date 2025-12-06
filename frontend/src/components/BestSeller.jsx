import React, { useContext, useEffect, useState, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import Tittle from './Tittle';
import ProductItem from './ProductItem';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const BestSeller = () => {
    const { products } = useContext(ShopContext) || {};
    const [bestSeller, setBestSeller] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (Array.isArray(products)) {
            const bestProducts = products.filter((item) => item.bestseller === true);
            setBestSeller(bestProducts);
        }
    }, [products]);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (direction === 'left') {
            current.scrollLeft -= 300;
        } else {
            current.scrollLeft += 300;
        }
    };

    if (bestSeller.length === 0) {
        return null; 
    }

    return (
        <div className='my-20 py-16 bg-stone-50'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex flex-col sm:flex-row justify-between items-center mb-10'>
                    <div className='text-center text-2xl md:text-2xl sm:text-left'>
                        <Tittle text1={'Our'} text2={'Best Sellers'} />
                        <p className='mt-2 text-gray-600 max-w-lg'>
                            Koleksi pilihan yang paling dicintai oleh pelanggan kami. Temukan favorit baru Anda di sini.
                        </p>
                    </div>
                    <a href="/collection" className='mt-4 sm:mt-0 bg-black text-white font-semibold py-2 px-6 rounded-md hover:bg-gray-800 transition whitespace-nowrap'>
                        View All
                    </a>
                </div>

                <div className='relative'>
                    <button onClick={() => scroll('left')} className='absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-md z-10 hover:bg-gray-100 transition hidden lg:flex'>
                        <FiArrowLeft />
                    </button>
                    
                    <div 
                        ref={scrollRef} 
                        className='flex overflow-x-auto gap-6 pb-4 scroll-smooth scrollbar-hide'
                    >
                        {bestSeller.map((item) => (
                            <div key={item._id} className='flex-shrink-0 w-64'>
                                <ProductItem
                                    id={item._id}
                                    name={item.name}
                                    image={item.image}
                                    price={item.price}
                                />
                            </div>
                        ))}
                    </div>
                    
                    <button onClick={() => scroll('right')} className='absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-3 shadow-md z-10 hover:bg-gray-100 transition hidden lg:flex'>
                        <FiArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BestSeller;