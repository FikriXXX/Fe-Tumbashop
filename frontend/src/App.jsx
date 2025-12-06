import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components User
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';

// Components Admin
import Sidebar from './components/SideBar';
import AdminLogin from './components/AdminLogin';

// Pages - User
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Faq from './pages/Faq';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Placeorder from './pages/Placeorder';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import ShippingTracking from './pages/ShippingTracking';
import OrderConfirmed from './pages/OrderConfirmed';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Testimonials from './components/Testimonials';

// Pages - Admin
import AddProduct from './pages/AddProduct';
import ListProduct from './pages/ListProduct';
import Profile from './pages/Profile';


const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // State untuk Token Admin
  const [adminToken, setAdminToken] = useState(localStorage.getItem('admin_token') ? localStorage.getItem('admin_token') : '');

  useEffect(() => {
    localStorage.setItem('admin_token', adminToken);
  }, [adminToken]);

  const adminLogout = () => {
    setAdminToken('');
    localStorage.removeItem('admin_token');
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <ToastContainer position="top-right" autoClose={3000} />
      {isAdminRoute ? (
        <>
          {adminToken === "" ? (
            <AdminLogin setAdminToken={setAdminToken} />
          ) : (
            <div className='bg-gray-50 min-h-screen'>
              <div className='flex items-center justify-between px-[4%] py-4 bg-white border-b shadow-sm'>
                <h1 className='text-xl font-bold font-serif text-gray-800'>Tumbashop <span className='text-xs font-sans font-normal text-gray-500 bg-gray-200 px-2 py-1 rounded ml-2'>Admin Panel</span></h1>
                <button onClick={adminLogout} className='bg-gray-800 hover:bg-black text-white px-6 py-2 rounded-full text-sm font-medium transition'>Logout</button>
              </div>

              <div className='flex w-full'>
                <Sidebar />
                <div className='w-full md:w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                  <Routes>
                    <Route path='/admin/add' element={<AddProduct token={adminToken} />} />
                    <Route path='/admin/list' element={<ListProduct token={adminToken} />} />
                  </Routes>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        // === TAMPILAN USER BIASA ===
        <>
          <Navbar />
          <SearchBar />

          <main className='flex-grow px-4 sm:px-6 lg:px-8 py-6'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/collection' element={<Collection />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/faq' element={<Faq />} />
              <Route path='/product/:productId' element={<Product />} />
              <Route path='/privacy-policy' element={<PrivacyPolicy />} />
              <Route path='/testimonials' element={<Testimonials />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/login' element={<Login />} />
              <Route path='/placeorder' element={<Placeorder />} />
              <Route path='/order-confirmed/:orderId' element={<OrderConfirmed />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/wishlist' element={<Wishlist />} />
              <Route path='/tracking/:orderId' element={<ShippingTracking />} />
              <Route path='profile' element={<Profile />} />
            </Routes>
          </main>

          <Footer />
        </>
      )}
    </div>
  );
};

export default App;