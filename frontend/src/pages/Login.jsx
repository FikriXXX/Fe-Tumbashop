import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const [currentState, setCurrentState] = useState('Login');
    const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (currentState === 'Sign Up') {
                const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem('token', response.data.token);
                    toast.success("Welcome to Tumbashop!");
                } else {
                    toast.error(response.data.message);
                }
            } else {
                const response = await axios.post(backendUrl + '/api/user/login', { email, password });
                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem('token', response.data.token);
                    toast.success("Welcome back!");
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (token) navigate('/');
    }, [token, navigate]);

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-10 px-4 bg-white">
            <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-full max-w-sm gap-6'>

                {/* Header */}
                <div className='flex flex-col items-center gap-2 mb-4'>
                    <h1 className='text-3xl font-serif text-gray-900 tracking-wide'>
                        {currentState}
                    </h1>
                    <div className='w-16 h-[1.5px] bg-gray-800'></div>
                </div>

                <div className="w-full space-y-4">
                    {currentState === 'Sign Up' && (
                        <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:border-black outline-none transition' placeholder='Full Name' required />
                    )}
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:border-black outline-none transition' placeholder='Email Address' required />
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:border-black outline-none transition' placeholder='Password' required />
                </div>

                <div className='w-full flex justify-between text-sm mt-[-4px]'>
                    <p className='cursor-pointer text-gray-500 hover:text-black transition'>Forgot your password?</p>
                    {currentState === 'Login'
                        ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer text-gray-800 font-semibold hover:underline'>Create account</p>
                        : <p onClick={() => setCurrentState('Login')} className='cursor-pointer text-gray-800 font-semibold hover:underline'>Login Here</p>
                    }
                </div>

                <button disabled={loading} className='w-full bg-black text-white font-medium px-8 py-3.5 mt-2 hover:bg-gray-900 transition active:scale-95 disabled:opacity-70'>
                    {loading ? "Processing..." : (currentState === 'Login' ? 'Sign In' : 'Sign Up')}
                </button>
            </form>
        </div>
    );
};

export default Login;