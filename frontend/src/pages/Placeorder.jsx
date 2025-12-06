import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { FiPackage, FiTruck, FiMapPin, FiCreditCard, FiLoader } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import OrderSuccessModal from '../components/OrderSuccessModal';

const Placeorder = () => {
    const { getCartTotalAmount, currency, delivery_fee, cartItems, products, addOrder, clearCart } = useContext(ShopContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ firstName: '', lastName: '', address: '', phone: '' });
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [showModal, setShowModal] = useState(false);
    const [createdOrderId, setCreatedOrderId] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 

    const cartTotal = getCartTotalAmount ? getCartTotalAmount() : 0;
    const deliveryFeeNumber = Number(delivery_fee);
    const finalTotal = cartTotal + deliveryFeeNumber;

    const cartProducts = products.filter(item => cartItems[item._id] > 0);

    useEffect(() => {
        if (!getCartTotalAmount || cartTotal === 0) {
            navigate('/cart');
        }
    }, [cartTotal, navigate]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (!formData.firstName || !formData.lastName || !formData.address || !formData.phone) {
            alert("Harap lengkapi semua detail pengiriman.");
            return;
        }

        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 800));

        const orderItems = cartProducts.map(product => ({
            id: product._id,
            name: product.name,
            quantity: cartItems[product._id],
            price: product.price,
            image: Array.isArray(product.image) ? product.image[0] : null
        }));

        const newOrderId = addOrder(orderItems, finalTotal, formData);
        setCreatedOrderId(newOrderId);
        clearCart();
        setIsLoading(false);
        setShowModal(true);

        if (paymentMethod === 'whatsapp') {
            let msg = `Halo, saya ingin memesan (Order ID: ${newOrderId}):\n\n`;
            orderItems.forEach(i => msg += `- ${i.name} (x${i.quantity})\n`);
            msg += `\nTotal: ${currency} ${finalTotal.toLocaleString('id-ID')}\nAlamat: ${formData.address}`;
            window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(msg)}`, '_blank');
        }
    };

    return (
        <div className='bg-gray-50 min-h-screen py-10 lg:py-16'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

                <div className="mb-10 text-center">
                    <h1 className='text-3xl font-extrabold text-gray-900 tracking-tight'>Checkout</h1>
                    <p className="mt-2 text-sm text-gray-500">Selesaikan pesanan Anda dalam langkah mudah.</p>
                </div>

                <form onSubmit={handlePlaceOrder} className='grid grid-cols-1 lg:grid-cols-12 gap-10'>

                    <div className='lg:col-span-7 space-y-8'>

                        <div className='bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100'>
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><FiMapPin className="w-5 h-5" /></div>
                                <h2 className='text-lg font-bold text-gray-900'>Alamat Pengiriman</h2>
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-gray-500 uppercase">Nama Depan</label>
                                    <input name="firstName" onChange={handleChange} required type="text" className='w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:border-black focus:ring-0 transition duration-200' placeholder="John" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-gray-500 uppercase">Nama Belakang</label>
                                    <input name="lastName" onChange={handleChange} required type="text" className='w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:border-black focus:ring-0 transition duration-200' placeholder="Doe" />
                                </div>
                                <div className="sm:col-span-2 space-y-1">
                                    <label className="text-xs font-medium text-gray-500 uppercase">Alamat Lengkap</label>
                                    <textarea name="address" onChange={handleChange} required rows="3" className='w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:border-black focus:ring-0 transition duration-200' placeholder="Jalan, No. Rumah, Kecamatan..."></textarea>
                                </div>
                                <div className="sm:col-span-2 space-y-1">
                                    <label className="text-xs font-medium text-gray-500 uppercase">Nomor Telepon (WhatsApp)</label>
                                    <input name="phone" onChange={handleChange} required type="tel" className='w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:border-black focus:ring-0 transition duration-200' placeholder="0812..." />
                                </div>
                            </div>
                        </div>

                        <div className='bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100'>
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600"><FiCreditCard className="w-5 h-5" /></div>
                                <h2 className='text-lg font-bold text-gray-900'>Metode Pembayaran</h2>
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                <div
                                    onClick={() => setPaymentMethod('cod')}
                                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 flex flex-col gap-3 ${paymentMethod === 'cod' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="p-2 bg-white rounded-full shadow-sm"><FiPackage className="w-5 h-5 text-gray-800" /></div>
                                        {paymentMethod === 'cod' && <div className="w-4 h-4 rounded-full bg-black"></div>}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">Cash on Delivery</p>
                                        <p className="text-xs text-gray-500">Bayar saat barang sampai</p>
                                    </div>
                                </div>

                                <div
                                    onClick={() => setPaymentMethod('whatsapp')}
                                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 flex flex-col gap-3 ${paymentMethod === 'whatsapp' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="p-2 bg-white rounded-full shadow-sm"><FaWhatsapp className="w-5 h-5 text-green-600" /></div>
                                        {paymentMethod === 'whatsapp' && <div className="w-4 h-4 rounded-full bg-green-500"></div>}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">WhatsApp Order</p>
                                        <p className="text-xs text-gray-500">Konfirmasi manual via WA</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='lg:col-span-5'>
                        <div className='bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 sticky top-8'>
                            <h2 className='text-xl font-bold text-gray-900 mb-6'>Ringkasan Pesanan</h2>

                            <div className="max-h-60 overflow-y-auto mb-6 pr-2 space-y-4 scrollbar-hide">
                                {cartProducts.map((item) => (
                                    <div key={item._id} className="flex gap-4">
                                        <div className="w-16 h-16 flex-shrink-0 rounded-md bg-gray-100 overflow-hidden border border-gray-200">
                                            <img src={item.image[0]} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">{item.name}</h4>
                                            <p className="text-xs text-gray-500 mt-1">Qty: {cartItems[item._id]}</p>
                                            <p className="text-sm font-medium text-gray-900 mt-1">{currency} {(item.price * cartItems[item._id]).toLocaleString('id-ID')}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='space-y-3 py-6 border-t border-gray-100 text-sm'>
                                <div className='flex justify-between text-gray-600'>
                                    <span>Subtotal</span>
                                    <span className="font-medium text-gray-900">{currency} {cartTotal.toLocaleString('id-ID')}</span>
                                </div>
                                <div className='flex justify-between text-gray-600'>
                                    <span className="flex items-center gap-2"><FiTruck className="text-gray-400" /> Pengiriman</span>
                                    <span className="font-medium text-gray-900">{currency} {deliveryFeeNumber.toLocaleString('id-ID')}</span>
                                </div>
                            </div>

                            <div className='flex justify-between items-end border-t border-gray-100 pt-6 mb-8'>
                                <span className='text-base font-bold text-gray-900'>Total Bayar</span>
                                <span className='text-2xl font-extrabold text-black'>{currency} {finalTotal.toLocaleString('id-ID')}</span>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className='w-full group bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-900 focus:ring-4 focus:ring-gray-200 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                            >
                                {isLoading ? <FiLoader className="animate-spin w-5 h-5" /> : 'Buat Pesanan Sekarang'}
                            </button>

                            <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                                <FiPackage className="w-3 h-3" /> Transaksi aman & terpercaya
                            </p>
                        </div>
                    </div>
                </form>
            </div>

            <OrderSuccessModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                orderId={createdOrderId}
                onTrackOrder={() => navigate(`/tracking/${createdOrderId}`)}
                onContinueShopping={() => navigate('/')}
            />
        </div>
    );
};

export default Placeorder;