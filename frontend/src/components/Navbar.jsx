import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const {setShowSearch} = useContext(ShopContext)
    const navigate = useNavigate();

    return (
        <div className='flex items-center justify-between py-5 px-8 font-medium shadow-sm'>
            <Link to='/'>
                <img src={assets.logo} className='w-36' alt="Logo" />
            </Link>

            <ul className='hidden sm:flex gap-8 text-gray-700'>

                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    {({ isActive }) => (
                        <>
                            <p className={isActive ? "text-yellow-950" : ""}>Home</p>
                            <hr className={`w-2/4 border-none h-[2px] bg-yellow-950 ${isActive ? 'block' : 'hidden'}`} />
                        </>
                    )}
                </NavLink>

                
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    {({ isActive }) => (
                        <>
                            <p className={isActive ? "text-yellow-950" : ""}>About</p>
                            <hr className={`w-2/4 border-none h-[2px] bg-yellow-950 ${isActive ? 'block' : 'hidden'}`} />
                        </>
                    )}
                </NavLink>


                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    {({ isActive }) => (
                        <>
                            <p className={isActive ? "text-yellow-950" : ""}>Collection</p>
                            <hr className={`w-2/4 border-none h-[2px] bg-yellow-950 ${isActive ? 'block' : 'hidden'}`} />
                        </>
                    )}
                </NavLink>


                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    {({ isActive }) => (
                        <>
                            <p className={isActive ? "text-yellow-950" : ""}>Contact</p>
                            <hr className={`w-2/4 border-none h-[2px] bg-yellow-950 ${isActive ? 'block' : 'hidden'}`} />
                        </>
                    )}
                </NavLink>

                <NavLink to='/faq' className='flex flex-col items-center gap-1'>
                    {({ isActive }) => (
                        <>
                            <p className={isActive ? "text-yellow-950" : ""}>FAQ</p>
                            <hr className={`w-2/4 border-none h-[2px] bg-yellow-950 ${isActive ? 'block' : 'hidden'}`} />
                        </>
                    )}
                </NavLink>

                <NavLink onClick={() => setVisible(false)} className={({ isActive }) => `... ${isActive ? '...' : ''}`} to='/faq'></NavLink>


            </ul>
            <div className='flex items-center gap-6'>
                <img onClick={() =>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />

                <div className='group relative'>
                    <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
                    <div className='group-hover:block hidden absolute dropdown right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-3/6 py-3 px-5 bg-slate-100 text-gray-700'>
                            <p className='cursor-pointer hover:text-black'>My Profile</p>
                            <p onClick={() => navigate('/login')} className='cursor-pointer hover:text-black'>Login</p>
                            <p onClick={() => navigate('/cart')} className='cursor-pointer hover:text-black'>Orders</p>
                        </div>
                    </div>
                </div>
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                    <p className='absolute right-[-5px] bottom=[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>10</p>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
            </div>
            {visible && (
                <div
                    onClick={() => setVisible(false)}
                    className='fixed inset-0 bg-white z-40'
                >
                    <div className='flex flex-col text-yellow-950'>
                        <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                            <p>Back</p>
                        </div>
                        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>Home</NavLink>
                        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>Collection</NavLink>
                        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>About</NavLink>
                        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>Contact</NavLink>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;