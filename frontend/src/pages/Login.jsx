// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // If you have links like "Forgot Password"

const Login = () => {
    // State to toggle between Login and Sign Up
    const [isLogin, setIsLogin] = useState(true); 
    
    // State for form data (example)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            alert(`Logging in with Email: ${formData.email}`);
            // Add actual login logic here (e.g., API call)
        } else {
            alert(`Signing up with Name: ${formData.name}, Email: ${formData.email}`);
            // Add actual sign up logic here (e.g., API call)
        }
    };

    return (
        <div className='min-h-[calc(100vh-200px)] flex items-center justify-center bg-stone-50 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg'>
                <div>
                    <h2 className='mt-6 text-center text-3xl font-bold text-gray-900'>
                        {isLogin ? 'Login to your account' : 'Create an account'}
                    </h2>
                </div>
                <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
                    {/* Input fields */}
                    <div className='rounded-md shadow-sm -space-y-px'>
                        {!isLogin && ( // Only show Name field on Sign Up
                            <div>
                                <label htmlFor="name" className="sr-only">Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required={!isLogin}
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-900 focus:border-yellow-900 focus:z-10 sm:text-sm"
                                    placeholder="Your Name"
                                />
                            </div>
                        )}
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className={`appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 ${isLogin ? 'rounded-t-md' : ''} focus:outline-none focus:ring-yellow-900 focus:border-yellow-900 focus:z-10 sm:text-sm`}
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-900 focus:border-yellow-900 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition"
                        >
                            {isLogin ? 'Sign in' : 'Sign up'}
                        </button>
                    </div>
                </form>

                {/* Toggle Link */}
                <div className="text-sm text-center">
                    <button 
                        onClick={() => setIsLogin(!isLogin)} 
                        className="font-medium text-yellow-900 hover:text-yellow-700"
                    >
                        {isLogin ? 'Don\'t have an account? Sign up' : 'Already have an account? Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;