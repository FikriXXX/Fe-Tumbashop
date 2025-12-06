import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiPackage, FiShoppingBag, FiTruck, FiUser, FiMapPin } from 'react-icons/fi';

const OrderConfirmed = () => {
    const { orderId } = useParams();
    const { orders, currency } = useContext(ShopContext);
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        if (orders && orders.length > 0) {
            const foundOrder = orders.find(o => o.id === orderId);
            if (foundOrder) setOrder(foundOrder);
        }
    }, [orderId, orders]);

    if (!order) return <div className='min-h-screen flex items-center justify-center'><span className="loader"></span></div>;

    return (
        <div className='max-w-3xl mx-auto px-4 py-16 lg:py-24 bg-gray-50 min-h-screen'>
            <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
                {/* Header Sukses */}
                <div className="bg-green-50 p-8 text-center border-b border-green-100">
                    <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce'>
                        <FiCheckCircle className='text-5xl text-green-600' />
                    </div>
                    <h1 className='text-3xl font-bold text-gray-900 mb-2'>Order Success!</h1>
                    <p className='text-green-700'>Thank you for your purchase.</p>
                </div>

                <div className='p-8'>
                    {/* Info Utama */}
                    <div className="flex flex-col md:flex-row justify-between gap-6 pb-8 border-b border-gray-100">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Order Number</p>
                            <p className="text-lg font-bold text-gray-900 mt-1">{order.id}</p>
                        </div>
                        <div className="md:text-right">
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
                            <p className="text-lg font-medium text-gray-900 mt-1">{order.date}</p>
                        </div>
                    </div>

                    {/* Detail Pengiriman */}
                    <div className="py-8 border-b border-gray-100">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                            <FiTruck className="text-gray-400" /> Delivery Details
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl">
                            <div>
                                <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><FiUser /> Customer</p>
                                <p className="font-medium text-gray-900">{order.shipping.firstName} {order.shipping.lastName}</p>
                                <p className="text-gray-500 text-sm mt-1">{order.shipping.phone}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><FiMapPin /> Address</p>
                                <p className="font-medium text-gray-900 leading-relaxed">{order.shipping.address}</p>
                            </div>
                        </div>
                    </div>

                    {/* Item List */}
                    <div className="py-8">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                            <FiPackage className="text-gray-400" /> Order Items
                        </h3>
                        <div className="space-y-4">
                            {order.items.map((item, index) => (
                                <div key={index} className='flex justify-between items-center p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition'>
                                    <div className='flex items-center gap-4'>
                                        <div className='w-12 h-12 rounded-lg bg-gray-100 overflow-hidden'>
                                            <img src={item.image || 'https://via.placeholder.com/50'} alt="" className='w-full h-full object-cover' />
                                        </div>
                                        <div>
                                            <p className='font-semibold text-gray-900'>{item.name}</p>
                                            <p className='text-sm text-gray-500'>Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <span className='font-medium text-gray-900'>{currency} {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Total */}
                    <div className="bg-gray-900 text-white p-6 rounded-xl flex justify-between items-center mt-4">
                        <span className="font-medium opacity-80">Total Amount Paid</span>
                        <span className="text-2xl font-bold">{currency} {order.total.toLocaleString('id-ID')}</span>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className='bg-gray-50 p-6 flex flex-col sm:flex-row gap-4 justify-center border-t border-gray-100'>
                    <button onClick={() => navigate('/collection')} className='flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition'>
                        <FiShoppingBag /> Continue Shopping
                    </button>
                    <button onClick={() => navigate(`/tracking/${order.id}`)} className='flex-1 flex items-center justify-center gap-2 bg-yellow-950 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-900 transition shadow-lg shadow-yellow-900/20'>
                        <FiPackage /> Track Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmed;