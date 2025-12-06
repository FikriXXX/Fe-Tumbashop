import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiPlusSquare, FiList, FiPackage, FiGrid } from 'react-icons/fi';

const Sidebar = () => {
    const activeStyle = "bg-yellow-50 border-r-4 border-yellow-950 text-yellow-950 font-medium";
    const defaultStyle = "text-gray-500 hover:bg-gray-50 hover:text-gray-900 border-r-4 border-transparent transition-all duration-200";

    return (
        <div className='w-[18%] min-h-screen border-r border-gray-200 bg-white sticky top-0 left-0 h-screen'>
            <div className='flex items-center gap-2 px-6 py-8 border-b border-gray-100 mb-4'>
                <FiGrid className='w-6 h-6 text-yellow-950' />
                <span className='font-bold text-lg tracking-tight text-gray-800 hidden md:block'>Admin Panel</span>
            </div>

            <div className='flex flex-col gap-2 pt-4 pl-[10%] pr-4'>

                <NavLink to='/admin/add' className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-l-lg ${isActive ? activeStyle : defaultStyle}`}>
                    <FiPlusSquare className="w-5 h-5" />
                    <p className='hidden md:block text-sm'>Add Product</p>
                </NavLink>

                <NavLink to='/admin/list' className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-l-lg ${isActive ? activeStyle : defaultStyle}`}>
                    <FiList className="w-5 h-5" />
                    <p className='hidden md:block text-sm'>Product List</p>
                </NavLink>

                <NavLink to='/admin/orders' className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-l-lg ${isActive ? activeStyle : defaultStyle}`}>
                    <FiPackage className="w-5 h-5" />
                    <p className='hidden md:block text-sm'>Orders</p>
                </NavLink>

            </div>
        </div>
    )
}

export default Sidebar;