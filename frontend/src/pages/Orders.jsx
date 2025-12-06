import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext'; 
import { useNavigate, Link } from 'react-router-dom'; 

const Orders = () => {

    const { orders, currency, isLoggedIn } = useContext(ShopContext) || {};
    const navigate = useNavigate();

    if (orders === undefined || !isLoggedIn) { 
        return <div className='text-center my-24'>Loading...</div>;
    }

    return (
        <div className='max-w-4xl mx-auto my-16 px-4'>
            <h1 className='text-3xl font-bold mb-10 text-center text-gray-800'>My Orders</h1>

            <div className='space-y-8'>
                {orders.length === 0 ? (
                    <div className='text-center py-20 border rounded-lg bg-white shadow-sm'>
                        <p className='text-gray-500'>You have no past orders.</p>
                        <button onClick={() => navigate('/collection')} className='mt-4 bg-black text-white px-6 py-2 rounded-md'>
                            Shop Now
                        </button>
                    </div>
                ) : (
                    orders.map((order) => (
                        <div key={order.id} className='bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow'>
                            <div className='flex flex-col sm:flex-row justify-between items-start mb-4 border-b pb-4'>
                                <div>
                                    <p className='font-bold text-lg text-gray-900'>{order.id}</p>
                                    <p className='text-sm text-gray-500'>Date: {order.date}</p>
                                </div>
                                <p className={`text-xs sm:text-sm font-semibold px-3 py-1 rounded-full mt-2 sm:mt-0 ${order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800' 
                                    }`}>
                                    {order.status}
                                </p>
                            </div>

                            <div className='mb-4'>
                                {order.items.map((item, index) => (
                                    <div key={index} className='flex items-center gap-3 py-1 text-sm'>
                                        <img src={item.image || 'https://via.placeholder.com/40'} alt={item.name} className='w-8 h-8 rounded object-cover' />
                                        <span>{item.name} (x{item.quantity})</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between items-center mt-4 pt-4 border-t">
                                <p className='font-bold text-gray-800 text-lg'>
                                    Total: {currency} {order.total.toLocaleString('id-ID')}
                                </p>
                                <Link
                                    to={`/tracking/${order.id}`}
                                    className='bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded hover:bg-blue-700 transition'
                                >
                                    Track Order
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Orders;