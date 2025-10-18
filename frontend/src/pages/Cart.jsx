import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext'; // Impor context
import { useNavigate } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

const Cart = () => {
    // Ambil data dan fungsi dari context
    const { 
        products, 
        cartItems, 
        addToCart,      // Kita butuh ini juga untuk tombol +
        removeFromCart,
        deleteFromCart, // Opsional: untuk hapus semua item
        getCartTotalAmount, 
        currency, 
        delivery_fee 
    } = useContext(ShopContext) || {}; // Tambahkan fallback
    
    const navigate = useNavigate();

    // Hitung total dengan aman
    const cartTotal = getCartTotalAmount ? getCartTotalAmount() : 0;
    const totalItemsInCart = Object.values(cartItems || {}).reduce((acc, quantity) => acc + quantity, 0);

    // Filter produk yang ada di keranjang
    const itemsInCart = products ? products.filter(p => cartItems && cartItems[p._id] > 0) : [];

    return (
        <div className='bg-stone-50 min-h-[calc(100vh-150px)]'> {/* Beri tinggi minimum */}
            <div className='max-w-6xl mx-auto px-4 py-16 lg:py-24'>
                {/* Header */}
                <div className='text-center mb-12'>
                    <h1 className='text-3xl md:text-4xl font-bold text-gray-800'>Shopping Cart</h1>
                    {cartTotal > 0 && <p className='text-gray-500 mt-2'>You have {totalItemsInCart} items.</p>}
                </div>

                {/* Tampilan jika Keranjang Kosong */}
                {cartTotal === 0 ? (
                    <div className='text-center py-20 bg-white border rounded-lg shadow-sm'>
                        <h2 className='text-2xl font-semibold text-gray-700'>Your Cart is Empty</h2>
                        <p className='text-gray-500 mt-2 mb-6'>Add some items to get started!</p>
                        <button onClick={() => navigate('/collection')} className='bg-black text-white font-semibold py-3 px-8 rounded-md hover:bg-gray-800 transition'>
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-12 items-start'>
                        {/* Kolom Kiri: Daftar Item */}
                        <div className='lg:col-span-2 bg-white p-6 rounded-lg border shadow-sm space-y-6'>
                            {itemsInCart.map((product) => (
                                <div key={product._id} className='flex flex-col sm:flex-row items-center gap-4 border-b pb-6 last:border-b-0 last:pb-0'>
                                    <img src={Array.isArray(product.image) && product.image.length > 0 ? product.image[0] : 'placeholder.jpg'} alt={product.name} className='w-24 h-24 object-cover rounded-md' />
                                    <div className='flex-grow text-center sm:text-left'>
                                        <p className='font-semibold text-gray-800'>{product.name}</p>
                                        <p className='text-sm text-gray-500'>{currency} {product.price.toLocaleString('id-ID')}</p>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        {/* Pengatur Jumlah */}
                                        <div className='flex items-center border rounded-md'>
                                            <button onClick={() => removeFromCart(product._id)} className='w-8 h-8 flex items-center justify-center text-lg'><FiMinus/></button>
                                            <span className='w-10 h-8 flex items-center justify-center text-sm font-semibold'>{cartItems[product._id]}</span>
                                            <button onClick={() => addToCart(product._id)} className='w-8 h-8 flex items-center justify-center text-lg'><FiPlus/></button>
                                        </div>
                                        {/* Total Harga per Item */}
                                        <p className='font-semibold w-24 text-right'>{currency} {(product.price * cartItems[product._id]).toLocaleString('id-ID')}</p>
                                        {/* Tombol Hapus Total */}
                                        <button onClick={() => deleteFromCart(product._id)} className='text-red-500 hover:text-red-700 ml-2'><FiTrash2/></button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Kolom Kanan: Ringkasan Belanja */}
                        <div className='lg:col-span-1 sticky top-8 bg-white p-6 rounded-lg border shadow-sm'>
                            <h2 className='text-xl font-bold text-gray-900 mb-6 border-b pb-4'>Order Summary</h2>
                            <div className='space-y-3 text-sm'>
                                <div className='flex justify-between text-gray-700'><span>Subtotal</span><span>{currency} {cartTotal.toLocaleString('id-ID')}</span></div>
                                <div className='flex justify-between text-gray-700'><span>Delivery Fee</span><span>{currency} {Number(delivery_fee).toLocaleString('id-ID')}</span></div>
                                <hr className='my-3' />
                                <div className='flex justify-between font-bold text-base text-gray-900'><span>Total</span><span>{currency} {(cartTotal + Number(delivery_fee)).toLocaleString('id-ID')}</span></div>
                            </div>
                            <button onClick={() => navigate('/placeorder')} className='w-full mt-6 bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition'>
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;