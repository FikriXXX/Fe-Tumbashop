import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Collection from './pages/Collection';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Placeorder from './pages/Placeorder';
import Orders from './pages/Orders';
import Faq from './pages/Faq';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Testimonials from './components/Testimonials';

const App = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <SearchBar />
      <main className='flex-grow px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product' element={<Product />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/place-order' element={<Placeorder />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/faq' element={<Faq />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/testimonials' element={<Testimonials />} />
          <Route path='/placeorder' element={<Placeorder />} />


        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;