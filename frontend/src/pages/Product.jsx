import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import { FiShoppingCart } from 'react-icons/fi';

const Product = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const contextValue = useContext(ShopContext);

    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (contextValue && Array.isArray(contextValue.products)) {
            const foundProduct = contextValue.products.find((p) => p._id === productId);
            if (foundProduct) {
                setProduct(foundProduct);
                setMainImage(foundProduct.image[0]);
                setQuantity(1);
                window.scrollTo(0, 0);
            } else {
                navigate('/collection'); 
            }
        }
    }, [productId, contextValue, navigate]);

    if (!product || !contextValue) {
        return <div className='text-center my-24'>Loading...</div>;
    }

    const { addToCart, currency } = contextValue;
    const relatedProducts = contextValue.products
        .filter(p => p.category === product.category && p._id !== product._id)
        .slice(0, 4);

    return (
        <div className='py-12 lg:py-20 bg-white'>
            <div className='max-w-6xl mx-auto px-4'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start'>
                    
                    <div className='lg:sticky top-8 self-start'>
                        <div className='flex flex-col-reverse sm:flex-row gap-4'>
                            <div className='flex sm:flex-col gap-3'>
                                {product.image.map((img, index) => (
                                    <div 
                                        key={index} 
                                        className={`w-16 h-16 cursor-pointer border-2 rounded-md overflow-hidden ${mainImage === img ? 'border-yellow-950' : 'border-transparent'}`}
                                        onMouseEnter={() => setMainImage(img)}
                                    >
                                        <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className='w-full h-full object-cover' />
                                    </div>
                                ))}
                            </div>
                            <div className='flex-grow'>
                                <img src={mainImage} alt={product.name} className='w-full h-auto object-cover rounded-lg shadow-md' />
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-5'>
                        <div>
                            <p className='text-sm text-gray-500 mb-1'>{product.category} &gt; {product.subCategory}</p>
                            <h1 className='text-3xl md:text-4xl font-bold text-gray-900'>{product.name}</h1>
                        </div>
                        <p className='text-3xl font-semibold text-yellow-950'>{currency} {product.price.toLocaleString('id-ID')}</p>
                        <p className='text-gray-600 leading-relaxed'>{product.description}</p>
                        
                        <div>
                            <h3 className='font-semibold mb-2'>Select Size:</h3>
                            <div className='flex gap-2'>
                                {product.sizes.map(size => (
                                    <button key={size} className='w-10 h-10 border rounded-md hover:border-black focus:border-black transition'>{size}</button>
                                ))}
                            </div>
                        </div>

                        <div className='flex items-center gap-4 mt-4'>
                            <div className='flex items-center border rounded-md'>
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className='w-10 h-10 text-xl'>-</button>
                                <span className='w-10 h-10 flex items-center justify-center'>{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)} className='w-10 h-10 text-xl'>+</button>
                            </div>
                            <button 
                                onClick={() => addToCart(product._id)}
                                className='flex-grow flex items-center justify-center gap-3 bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition'
                            >
                                <FiShoppingCart/>
                                <span>Add to Cart</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className='mt-24'>
                    <h2 className='text-2xl font-bold text-center mb-10'>You Might Also Like</h2>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                        {relatedProducts.map(item => (
                            <ProductItem key={item._id} {...item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;