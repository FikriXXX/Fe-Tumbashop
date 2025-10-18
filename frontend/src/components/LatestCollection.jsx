import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Tittle from '../components/Tittle'; // Asumsi komponen Tittle sudah ada
import ProductItem from '../components/ProductItem';
import { Link } from 'react-router-dom';

const LatestCollection = () => {
    const { products } = useContext(ShopContext) || {};
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        if (Array.isArray(products)) {
            const sortedProducts = [...products].sort((a, b) => b.date - a.date);
            setLatestProducts(sortedProducts.slice(0, 8));
        }
    }, [products]);

    if (latestProducts.length === 0) {
        return null;
    }

    return (
        <div className='my-20 py-16 bg-white'> 
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Header Section */}
                <div className='flex flex-col sm:flex-row justify-between items-center mb-12'>
                    <div className='text-center sm:text-left'>
                        
                        {/* (UBAH) Ukuran font judul diperbesar */}
                        <div className='text-3xl md:text-4xl'> 
                            <Tittle text1={'Latest'} text2={'Collection'} />
                        </div>
                        
                        {/* (UBAH) Ukuran font deskripsi diperbesar */}
                        <p className='mt-3 text-base text-gray-600 max-w-xl'> {/* Sebelumnya text-sm */}
                            Jelajahi koleksi terbaru kami yang dirancang untuk melengkapi gaya Anda. Temukan item favorit Anda hari ini.
                        </p>
                    </div>
                    <Link 
                        to="/collection" 
                        className='mt-4 sm:mt-0 bg-transparent border border-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-md hover:bg-gray-100 transition whitespace-nowrap'
                    >
                        View All
                    </Link>
                </div>

                {/* Grid Produk */}
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10'>
                    {latestProducts.map((item) => (
                        <ProductItem
                            key={item._id} 
                            id={item._id} 
                            name={item.name}
                            image={item.image}
                            price={item.price}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LatestCollection;