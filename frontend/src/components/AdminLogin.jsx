import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiLock } from 'react-icons/fi';

const AdminLogin = ({ setAdminToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:4000/api/user/admin', { email, password });
            if (response.data.success) {
                setAdminToken(response.data.token);
                toast.success("Welcome back, Admin!");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center w-full bg-gray-50'>
            <div className='bg-white shadow-xl rounded-2xl px-10 py-10 max-w-md w-full border border-gray-100'>
                <div className='flex flex-col items-center mb-8'>
                    <div className='w-12 h-12 bg-yellow-950 rounded-full flex items-center justify-center mb-4 text-white'>
                        <FiLock className='w-6 h-6' />
                    </div>
                    <h1 className='text-2xl font-bold text-gray-900'>Admin Access</h1>
                    <p className='text-sm text-gray-500'>Enter your credentials to manage the store</p>
                </div>

                <form onSubmit={onSubmitHandler} className='space-y-5'>
                    <div>
                        <label className='block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2'>Email Address</label>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-950 focus:border-transparent outline-none transition duration-200' type="email" required />
                    </div>
                    <div>
                        <label className='block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2'>Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-950 focus:border-transparent outline-none transition duration-200' type="password" required />
                    </div>
                    <button disabled={loading} className='w-full py-3.5 rounded-lg text-white bg-gray-900 hover:bg-black font-semibold transition transform active:scale-95 disabled:opacity-70 flex justify-center items-center' type="submit">
                        {loading ? <span className="loader"></span> : "Sign In to Dashboard"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin;