import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { FiCheckCircle, FiPackage, FiTruck, FiHome } from 'react-icons/fi'; 

const ShippingTracking = () => {
    const { orderId } = useParams(); 
    const { orders, currency, isLoggedIn } = useContext(ShopContext) || {};
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        if (Array.isArray(orders)) {
            const foundOrder = orders.find(o => o.id === orderId);
            setOrder(foundOrder);
        }
    }, [orderId, orders, isLoggedIn, navigate]);

    if (!orders || !isLoggedIn) {
        return <div className='text-center my-24'>Loading...</div>;
    }

    if (!order) {
        return (
            <div className='text-center my-24'>
                <p className='text-xl font-semibold'>Order Not Found</p>
                <p className='text-gray-500 mt-2'>We couldn't find an order with ID: {orderId}</p>
                <Link to="/orders" className='mt-6 inline-block text-blue-600 hover:underline'>Back to My Orders</Link>
            </div>
        );
    }

    const statuses = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
    const currentStatusIndex = statuses.indexOf(order.status);

    return (
        <div className='max-w-4xl mx-auto my-16 px-4'>
            <h1 className='text-3xl font-bold mb-4 text-center'>Order Tracking</h1>
            <p className='text-center text-gray-500 mb-10'>Order ID: {order.id}</p>

            <div className='bg-white border rounded-lg p-6 shadow-sm mb-8'>
                <h2 className='text-xl font-semibold mb-4 border-b pb-3'>Shipping Details</h2>
                <p><strong>Nama:</strong> {order.shipping.firstName} {order.shipping.lastName}</p>
                <p><strong>Alamat:</strong> {order.shipping.address}</p>
                <p><strong>Telepon:</strong> {order.shipping.phone}</p>
            </div>

            <div className='bg-white border rounded-lg p-6 shadow-sm'>
                <h2 className='text-xl font-semibold mb-6'>Tracking Status: {order.status}</h2>
                <div className='flex items-center justify-between text-center text-xs sm:text-sm relative mb-10'>
                    <div className='absolute top-1/2 left-0 w-full h-1 bg-gray-200 transform -translate-y-1/2 -z-0'></div>
                    <div
                        className='absolute top-1/2 left-0 h-1 bg-green-500 transform -translate-y-1/2 -z-0 transition-all duration-500'
                        style={{ width: `${(currentStatusIndex / (statuses.length - 1)) * 100}%` }}>
                    </div>

                    {statuses.map((status, index) => (
                        <div key={status} className='relative z-10 flex flex-col items-center'>
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 ${index <= currentStatusIndex ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
                                {index === 0 && <FiCheckCircle />}
                                {index === 1 && <FiPackage />}
                                {index === 2 && <FiTruck />}
                                {index === 3 && <FiHome />}
                            </div>
                            <p className={`mt-2 font-medium ${index <= currentStatusIndex ? 'text-green-600' : 'text-gray-400'}`}>{status}</p>
                        </div>
                    ))}
                </div>

                <h3 className='text-lg font-semibold mt-8 mb-4 border-t pt-4'>Items in this Order</h3>
                <div className='space-y-3'>
                    {order.items.map((item, index) => (
                        <div key={index} className='flex items-center gap-3 text-sm'>
                            <img src={item.image || 'placeholder.jpg'} alt={item.name} className='w-10 h-10 rounded object-cover' />
                            <span>{item.name} (x{item.quantity})</span>
                            <span className='ml-auto font-medium'>{currency} {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                        </div>
                    ))}
                </div>
                <p className='text-right font-bold text-gray-800 text-lg mt-4 border-t pt-4'>
                    Total: {currency} {order.total.toLocaleString('id-ID')}
                </p>
            </div>
        </div>
    );
};

export default ShippingTracking;