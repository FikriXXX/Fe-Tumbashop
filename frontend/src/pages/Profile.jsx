import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiUser, FiMapPin, FiMail, FiPhone } from 'react-icons/fi'; 

const Profile = () => {
    const { token, backendUrl } = useContext(ShopContext);

    const [userData, setUserData] = useState({
        name: '', email: '', phone: '',
        street: '', city: '', state: '', zipcode: '', country: ''
    });

    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    const loadUserProfile = async () => {
        try {
            if (!token) return;
            const { data } = await axios.get(backendUrl + '/api/user/profile', { headers: { token } });
            if (data.success) setUserData(data.userData);
            else toast.error(data.message);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const updateUserProfile = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post(backendUrl + '/api/user/update-profile', userData, { headers: { token } });
            if (data.success) {
                toast.success(data.message);
                setIsEdit(false);
                await loadUserProfile();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadUserProfile(); }, [token]);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className='min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans'>
            <div className='max-w-4xl mx-auto'>

                <div className='mb-8 text-center'>
                    <h1 className='text-3xl font-bold text-gray-900'>My Profile</h1>
                    <p className='text-gray-500 mt-2'>Manage your personal information and address</p>
                </div>

                <div className='bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100'>

                    <div className='bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-white flex flex-col sm:flex-row items-center gap-6'>
                        <div className='w-24 h-24 rounded-full bg-white text-gray-900 flex items-center justify-center text-3xl font-bold shadow-lg uppercase'>
                            {userData.name ? userData.name[0] : 'U'}
                        </div>
                        <div className='text-center sm:text-left'>
                            <h2 className='text-2xl font-bold capitalize'>{userData.name || 'User Name'}</h2>
                            <p className='text-gray-300 flex items-center justify-center sm:justify-start gap-2 mt-1'>
                                <FiMail className='w-4 h-4' /> {userData.email}
                            </p>
                            <span className='inline-block mt-3 px-3 py-1 bg-white/20 rounded-full text-xs font-medium tracking-wide'>
                                {isEdit ? 'EDIT MODE' : 'VIEW MODE'}
                            </span>
                        </div>
                    </div>

                    <div className='p-6 sm:p-10 space-y-8'>

                        <div>
                            <div className='flex items-center gap-2 mb-4 border-b pb-2 border-gray-100'>
                                <FiUser className='text-gray-400 w-5 h-5' />
                                <h3 className='text-lg font-semibold text-gray-800'>Personal Details</h3>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='space-y-2'>
                                    <label className='text-sm font-medium text-gray-600'>Full Name</label>
                                    {isEdit ? (
                                        <input name='name' value={userData.name} onChange={onChangeHandler} type="text"
                                            className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-gray-50' />
                                    ) : (
                                        <div className='px-4 py-3 bg-gray-50 rounded-lg text-gray-800 border border-transparent font-medium'>{userData.name}</div>
                                    )}
                                </div>

                                <div className='space-y-2'>
                                    <label className='text-sm font-medium text-gray-600'>Phone Number</label>
                                    {isEdit ? (
                                        <input name='phone' value={userData.phone} onChange={onChangeHandler} type="text"
                                            className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-gray-50' />
                                    ) : (
                                        <div className='px-4 py-3 bg-gray-50 rounded-lg text-gray-800 border border-transparent font-medium'>{userData.phone || '-'}</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className='flex items-center gap-2 mb-4 border-b pb-2 border-gray-100'>
                                <FiMapPin className='text-gray-400 w-5 h-5' />
                                <h3 className='text-lg font-semibold text-gray-800'>Address Information</h3>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='md:col-span-2 space-y-2'>
                                    <label className='text-sm font-medium text-gray-600'>Street Address</label>
                                    {isEdit ? (
                                        <input name='street' value={userData.street} onChange={onChangeHandler} type="text"
                                            className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-gray-50' />
                                    ) : (
                                        <div className='px-4 py-3 bg-gray-50 rounded-lg text-gray-800 border border-transparent font-medium'>{userData.street || '-'}</div>
                                    )}
                                </div>

                                <div className='space-y-2'>
                                    <label className='text-sm font-medium text-gray-600'>City</label>
                                    {isEdit ? (
                                        <input name='city' value={userData.city} onChange={onChangeHandler} type="text"
                                            className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-gray-50' />
                                    ) : (
                                        <div className='px-4 py-3 bg-gray-50 rounded-lg text-gray-800 border border-transparent font-medium'>{userData.city || '-'}</div>
                                    )}
                                </div>

                                <div className='space-y-2'>
                                    <label className='text-sm font-medium text-gray-600'>State / Province</label>
                                    {isEdit ? (
                                        <input name='state' value={userData.state} onChange={onChangeHandler} type="text"
                                            className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-gray-50' />
                                    ) : (
                                        <div className='px-4 py-3 bg-gray-50 rounded-lg text-gray-800 border border-transparent font-medium'>{userData.state || '-'}</div>
                                    )}
                                </div>

                                <div className='space-y-2'>
                                    <label className='text-sm font-medium text-gray-600'>Zipcode</label>
                                    {isEdit ? (
                                        <input name='zipcode' value={userData.zipcode} onChange={onChangeHandler} type="text"
                                            className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-gray-50' />
                                    ) : (
                                        <div className='px-4 py-3 bg-gray-50 rounded-lg text-gray-800 border border-transparent font-medium'>{userData.zipcode || '-'}</div>
                                    )}
                                </div>

                                <div className='space-y-2'>
                                    <label className='text-sm font-medium text-gray-600'>Country</label>
                                    {isEdit ? (
                                        <input name='country' value={userData.country} onChange={onChangeHandler} type="text"
                                            className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-gray-50' />
                                    ) : (
                                        <div className='px-4 py-3 bg-gray-50 rounded-lg text-gray-800 border border-transparent font-medium'>{userData.country || '-'}</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='pt-6 flex flex-col sm:flex-row gap-4 justify-end'>
                            {isEdit ? (
                                <>
                                    <button onClick={() => setIsEdit(false)} className='px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all shadow-sm'>
                                        Cancel
                                    </button>
                                    <button onClick={updateUserProfile} disabled={loading} className='px-8 py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition-all shadow-lg active:scale-95 disabled:opacity-50'>
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </>
                            ) : (
                                <button onClick={() => setIsEdit(true)} className='w-full sm:w-auto px-8 py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition-all shadow-md active:scale-95'>
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;