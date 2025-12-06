import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const { products, wishlistItems } = useContext(ShopContext);
    const navigate = useNavigate();

    const userWishlist = products.filter((item) => wishlistItems[item._id]);

    return (
        <div className='border-t pt-14 min-h-[60vh]'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <h1 className='text-3xl font-bold text-center mb-10 text-gray-800'>My Wishlist</h1>

                {userWishlist.length === 0 ? (
                    <div className='text-center mt-20'>
                        <p className='text-gray-500 text-lg mb-6'>Your wishlist is empty.</p>
                        <button
                            onClick={() => navigate('/collection')}
                            className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 rounded-md hover:bg-gray-800 transition'
                        >
                            BROWSE COLLECTION
                        </button>
                    </div>
                ) : (
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                        {userWishlist.map((item) => (
                            <ProductItem
                                key={item._id}
                                id={item._id}
                                name={item.name}
                                image={item.image}
                                price={item.price}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;