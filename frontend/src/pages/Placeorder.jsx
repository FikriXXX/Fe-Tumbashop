import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext'; // Impor context
import { useNavigate } from 'react-router-dom';
import { FiCreditCard, FiPackage, FiPhoneCall } from 'react-icons/fi'; // Ikon untuk metode pembayaran
import { FaWhatsapp } from 'react-icons/fa'; // Ikon WhatsApp

const Placeorder = () => {
    // Ambil data dan fungsi dari context dengan aman
    const contextValue = useContext(ShopContext);
    const navigate = useNavigate();

    // State untuk data form (controlled components)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        phone: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('cod'); // Default COD

    // Redirect jika context belum siap atau keranjang kosong
    useEffect(() => {
        if (!contextValue || !contextValue.getCartTotalAmount || contextValue.getCartTotalAmount() === 0) {
            navigate('/cart');
        }
    }, [contextValue, navigate]);

    // Tampilkan loading jika context belum siap
    if (!contextValue || !contextValue.products) {
        return <div className='text-center my-24'>Loading...</div>;
    }

    const { getCartTotalAmount, currency, delivery_fee, cartItems, products } = contextValue;
    const cartTotal = getCartTotalAmount();
    const deliveryFeeNumber = Number(delivery_fee); // Pastikan ongkir adalah angka

    // Handle perubahan input form
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    // Fungsi handle Place Order
    const handlePlaceOrder = (e) => {
        e.preventDefault(); 
        if (!formData.firstName || !formData.lastName || !formData.address || !formData.phone) {
            alert("Harap isi semua detail pengiriman.");
            return;
        }

        if (paymentMethod === 'whatsapp') {
            let orderDetails = `Halo Tumbashop, saya ingin memesan:\n\n`;
            products.forEach(product => {
                if (cartItems[product._id] > 0) {
                    orderDetails += `- ${product.name} (x${cartItems[product._id]}) - ${currency} ${(product.price * cartItems[product._id]).toLocaleString('id-ID')}\n`;
                }
            });
            orderDetails += `\nSubtotal: ${currency} ${cartTotal.toLocaleString('id-ID')}`;
            orderDetails += `\nOngkos Kirim: ${currency} ${deliveryFeeNumber.toLocaleString('id-ID')}`;
            orderDetails += `\n**Total: ${currency} ${(cartTotal + deliveryFeeNumber).toLocaleString('id-ID')}**`;
            orderDetails += `\n\nAlamat Pengiriman:\n`;
            orderDetails += `${formData.firstName} ${formData.lastName}\n`;
            orderDetails += `${formData.address}\n`;
            orderDetails += `Kontak: ${formData.phone}\n`;
            orderDetails += `\nMetode Pembayaran: Pesan via WhatsApp`;

            const whatsappMessage = window.encodeURIComponent(orderDetails);
            window.open(`https://wa.me/6281234567890?text=${whatsappMessage}`, '_blank');
        
        } else if (paymentMethod === 'cod') {
            alert("Pesanan COD Anda telah diterima! Tim kami akan menghubungi Anda untuk konfirmasi.");
            navigate('/collection'); 
        }
    };

    return (
        <form onSubmit={handlePlaceOrder} className='py-16 lg:py-24 bg-gray-100'> {/* Latar belakang sedikit abu-abu */}
            <div className='max-w-6xl mx-auto px-4'>
                <h1 className='text-3xl font-bold text-center mb-12 text-gray-800'>Checkout</h1>
                <div className='grid grid-cols-1 lg:grid-cols-5 gap-12 items-start'>
                    
                    {/* Kolom Kiri: Form Detail */}
                    <div className='lg:col-span-3 bg-white p-8 rounded-lg shadow-md border border-gray-200'> {/* Shadow lebih halus */}
                        
                        {/* Alamat Pengiriman */}
                        <section className='mb-8'>
                            <h2 className='text-xl font-semibold text-gray-900 mb-5'>Alamat Pengiriman</h2>
                            <div className='space-y-4'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                    <div>
                                        <label htmlFor='firstName' className='block text-sm font-medium text-gray-700'>Nama Depan *</label>
                                        <input id='firstName' name="firstName" value={formData.firstName} onChange={handleChange} type="text" required className='mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-yellow-800 focus:border-yellow-800'/>
                                    </div>
                                    <div>
                                        <label htmlFor='lastName' className='block text-sm font-medium text-gray-700'>Nama Belakang *</label>
                                        <input id='lastName' name="lastName" value={formData.lastName} onChange={handleChange} type="text" required className='mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-yellow-800 focus:border-yellow-800'/>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor='address' className='block text-sm font-medium text-gray-700'>Alamat Lengkap *</label>
                                    <textarea id='address' name="address" value={formData.address} onChange={handleChange} rows="3" required className='mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-yellow-800 focus:border-yellow-800'></textarea>
                                </div>
                                <div>
                                    <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>Nomor Telepon *</label>
                                    <input id='phone' name="phone" value={formData.phone} onChange={handleChange} type="tel" required placeholder='+62xxxxxxxxxx' className='mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-yellow-800 focus:border-yellow-800'/>
                                </div>
                            </div>
                        </section>
                        
                        {/* Metode Pembayaran */}
                        <section>
                            <h2 className='text-xl font-semibold text-gray-900 mb-5'>Metode Pembayaran</h2>
                            <div className='space-y-3'>
                                {/* COD */}
                                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${paymentMethod === 'cod' ? 'border-yellow-900 ring-2 ring-yellow-900/40 bg-yellow-50' : 'border-gray-300 hover:border-gray-400'}`}>
                                    <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className='h-4 w-4 text-yellow-900 focus:ring-yellow-900'/>
                                    <FiPackage className='mx-3 text-lg text-yellow-950'/>
                                    <span className='font-medium text-gray-800'>Cash on Delivery (COD)</span>
                                </label>
                                {/* WhatsApp */}
                                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${paymentMethod === 'whatsapp' ? 'border-yellow-900 ring-2 ring-yellow-900/40 bg-yellow-50' : 'border-gray-300 hover:border-gray-400'}`}>
                                    <input type="radio" name="payment" value="whatsapp" checked={paymentMethod === 'whatsapp'} onChange={() => setPaymentMethod('whatsapp')} className='h-4 w-4 text-yellow-900 focus:ring-yellow-900'/>
                                    <FaWhatsapp className='mx-3 text-lg text-green-600'/>
                                    <span className='font-medium text-gray-800'>Pesan via WhatsApp</span>
                                </label>
                            </div>
                        </section>
                    </div>

                    {/* Kolom Kanan: Ringkasan */}
                    <div className='lg:col-span-2 sticky top-8 bg-white p-6 rounded-lg shadow-md border border-gray-200'>
                        <h2 className='text-xl font-bold text-gray-900 mb-5 border-b border-gray-200 pb-4'>Ringkasan Pesanan</h2>
                        <div className='space-y-3 mb-6'>
                            <div className='flex justify-between text-gray-600'><span>Subtotal</span><span className='font-medium text-gray-800'>{currency} {cartTotal.toLocaleString('id-ID')}</span></div>
                            <div className='flex justify-between text-gray-600'><span>Ongkos Kirim</span><span className='font-medium text-gray-800'>{currency} {deliveryFeeNumber.toLocaleString('id-ID')}</span></div>
                        </div>
                        <div className='border-t border-gray-200 pt-4 flex justify-between font-bold text-lg text-gray-900'>
                            <span>Total</span>
                            <span>{currency} {(cartTotal + deliveryFeeNumber).toLocaleString('id-ID')}</span>
                        </div>
                        <button type="submit" className='w-full mt-6 bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition transform hover:scale-[1.02] duration-300'>
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Placeorder;