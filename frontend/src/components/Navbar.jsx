import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { FiSearch, FiShoppingCart, FiHeart, FiUser, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
    const [visible, setVisible] = useState(false);

    const { setShowSearch, cartItems, wishlistItems, token, logout } = useContext(ShopContext);

    const navigate = useNavigate();

    const totalCartItems = Object.values(cartItems).reduce((acc, count) => acc + count, 0);
    const totalWishlistItems = Object.keys(wishlistItems).length;

    return (
        // UBAHAN 1: Padding py-5 biar lebih tinggi, z-index 50 biar selalu paling atas
        <div className='flex items-center justify-between py-5 px-6 sm:px-10 font-medium border-b border-gray-200 bg-white sticky top-0 z-50'>

            <Link to='/'>
                {/* UBAHAN 2: Logo diperbesar */}
                <img src={assets.logo} className='w-36 sm:w-44 h-auto object-contain' alt="Logo" />
            </Link>

            {/* UBAHAN 3: Font jadi text-base (standar), gap dilebarkan jadi gap-12 */}
            <ul className='hidden lg:flex gap-12 text-gray-700 text-base'>
                <NavLink to='/' className='flex flex-col items-center gap-1 uppercase tracking-wide'>
                    {({ isActive }) => (
                        <>
                            <p className={isActive ? "text-yellow-950 font-bold" : "hover:text-yellow-950 transition-colors"}>Home</p>
                            <hr className={`w-1/2 border-none h-[2px] ${isActive ? 'bg-yellow-950' : 'bg-transparent'}`} />
                        </>
                    )}
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1 uppercase tracking-wide'>
                    {({ isActive }) => (
                        <>
                            <p className={isActive ? "text-yellow-950 font-bold" : "hover:text-yellow-950 transition-colors"}>About</p>
                            <hr className={`w-1/2 border-none h-[2px] ${isActive ? 'bg-yellow-950' : 'bg-transparent'}`} />
                        </>
                    )}
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1 uppercase tracking-wide'>
                    {({ isActive }) => (
                        <>
                            <p className={isActive ? "text-yellow-950 font-bold" : "hover:text-yellow-950 transition-colors"}>Collection</p>
                            <hr className={`w-1/2 border-none h-[2px] ${isActive ? 'bg-yellow-950' : 'bg-transparent'}`} />
                        </>
                    )}
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1 uppercase tracking-wide'>
                    {({ isActive }) => (
                        <>
                            <p className={isActive ? "text-yellow-950 font-bold" : "hover:text-yellow-950 transition-colors"}>Contact</p>
                            <hr className={`w-1/2 border-none h-[2px] ${isActive ? 'bg-yellow-950' : 'bg-transparent'}`} />
                        </>
                    )}
                </NavLink>
            </ul>

            <div className='flex items-center gap-6'>
                {/* UBAHAN 4: Icon diperbesar jadi w-6 h-6 */}
                <FiSearch onClick={() => setShowSearch(true)} className='w-6 h-6 cursor-pointer text-gray-700 hover:text-black transition-transform hover:scale-110' />

                <div className='group relative'>
                    <FiUser onClick={() => !token && navigate('/login')} className='w-6 h-6 cursor-pointer text-gray-700 hover:text-black transition-transform hover:scale-110' />

                    {token && (
                        <div className='group-hover:block hidden absolute dropdown right-0 pt-4'>
                            <div className='flex flex-col gap-1 w-48 py-3 px-4 bg-slate-50 text-gray-700 rounded-md shadow-xl border border-gray-100'>
                                <Link to='/profile' className='block px-2 py-2 hover:bg-white hover:text-yellow-950 rounded transition-all'>
                                    My Profile
                                </Link>                                <Link to='/orders' className='block px-2 py-2 hover:bg-white hover:text-yellow-950 rounded transition-all'>My Orders</Link>
                                <button onClick={() => logout()} className='block w-full text-left px-2 py-2 hover:bg-red-50 text-red-600 rounded font-semibold transition-all'>
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <Link to='/wishlist' className='relative'>
                    <FiHeart className='w-6 h-6 text-gray-700 hover:text-black transition-transform hover:scale-110' />
                    {totalWishlistItems > 0 && <span className='absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full text-[11px] font-bold shadow-sm'>{totalWishlistItems}</span>}
                </Link>

                <Link to='/cart' className='relative'>
                    <FiShoppingCart className='w-6 h-6 text-gray-700 hover:text-black transition-transform hover:scale-110' />
                    {totalCartItems > 0 && <span className='absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-yellow-950 text-white rounded-full text-[11px] font-bold shadow-sm'>{totalCartItems}</span>}
                </Link>

                <button onClick={() => setVisible(true)} className='lg:hidden text-gray-700'>
                    <FiMenu className='w-7 h-7' />
                </button>
            </div>

            {/* Sidebar Mobile Menu */}
            <div className={`fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-300 ${visible ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setVisible(false)}></div>

            <div className={`fixed top-0 right-0 bottom-0 bg-white z-50 w-3/4 max-w-sm transform transition-transform duration-300 shadow-2xl ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className='flex flex-col text-gray-800 h-full'>
                    <div className='flex items-center justify-between p-6 border-b'>
                        <span className='font-bold text-xl'>Menu</span>
                        <FiX onClick={() => setVisible(false)} className='w-7 h-7 cursor-pointer hover:rotate-90 transition-transform' />
                    </div>
                    <div className='flex flex-col p-4 text-lg font-medium'>
                        <NavLink onClick={() => setVisible(false)} className='py-4 px-2 border-b hover:text-yellow-950' to='/'>Home</NavLink>
                        <NavLink onClick={() => setVisible(false)} className='py-4 px-2 border-b hover:text-yellow-950' to='/collection'>Collection</NavLink>
                        <NavLink onClick={() => setVisible(false)} className='py-4 px-2 border-b hover:text-yellow-950' to='/about'>About</NavLink>
                        <NavLink onClick={() => setVisible(false)} className='py-4 px-2 border-b hover:text-yellow-950' to='/contact'>Contact</NavLink>

                        {token ? (
                            <div className='mt-4'>
                                <NavLink onClick={() => setVisible(false)} className='block py-4 px-2 border-b hover:text-yellow-950' to='/orders'>My Orders</NavLink>
                                <button onClick={() => { logout(); setVisible(false); }} className='w-full text-left py-4 px-2 text-red-600 font-bold'>Logout</button>
                            </div>
                        ) : (
                            <NavLink onClick={() => setVisible(false)} className='py-4 px-2 border-b text-yellow-950' to='/login'>Login / Register</NavLink>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;