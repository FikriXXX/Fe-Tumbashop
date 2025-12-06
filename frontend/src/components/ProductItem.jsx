import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';

const ProductItem = ({ id, image, name, price }) => {
    const { currency, addToCart, wishlistItems, toggleWishlist } = useContext(ShopContext);
    const [isAdding, setIsAdding] = useState(false);

    const isWishlisted = wishlistItems[id];

    const handleWishlistClick = (e) => {
        e.preventDefault();
        toggleWishlist(id);
    };

    const handleAddToCartClick = (e) => {
        e.preventDefault();
        setIsAdding(true);
        setTimeout(() => {
            addToCart(id);
            setIsAdding(false);
        }, 500);
    };

    return (
        <Link to={`/product/${id}`} className='group relative flex flex-col text-gray-700 cursor-pointer'>

            <button
                onClick={handleWishlistClick}
                className={`absolute top-2 right-2 z-10 p-2 rounded-full shadow-sm transition-all duration-300 ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white'
                    }`}
            >
                <FiHeart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>

            <div className='overflow-hidden rounded-lg bg-gray-100'>
                <img
                    className='hover:scale-110 transition ease-in-out duration-500 w-full h-auto aspect-[3/4] object-cover'
                    src={image[0]}
                    alt={name}
                />
            </div>

            <p className='pt-3 pb-1 text-sm truncate font-medium'>{name}</p>
            <p className='text-sm text-gray-900'>{currency} {price.toLocaleString('id-ID')}</p>

            <button
                onClick={handleAddToCartClick}
                disabled={isAdding}
                className={`absolute bottom-14 right-2 w-10 h-10 flex items-center justify-center rounded-full shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:bottom-16 ${isAdding ? 'bg-green-500 text-white' : 'bg-white hover:bg-black hover:text-white text-gray-800'
                    }`}
            >
                {isAdding ? '✓' : <FiShoppingCart className="w-5 h-5" />}
            </button>
        </Link>
    );
};

export default ProductItem;