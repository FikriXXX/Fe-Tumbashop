import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext) || {};

    return (
        <Link to={`/product/${id}`} className='group flex flex-col'>

            <div className='overflow-hidden rounded-lg'>
                <img
                    src={image[0]}
                    alt={name}
                    className='w-full h-auto aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out'
                />
            </div>

            <div className='pt-3 pb-1 flex-grow flex flex-col'>
                <h3 className='text-sm font-medium text-gray-800 truncate flex-grow'>{name}</h3>
                <p className='text-sm font-semibold text-gray-900 mt-1'>
                    {currency || 'Rp.'} {price ? price.toLocaleString('id-ID') : '0'}
                </p>
            </div>

        </Link>
    );
};

export default ProductItem;