import React from 'react';
import { FaInstagram, FaFacebookF, FaTwitter, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 

const Footer = () => {
    return (
        <footer className='bg-gray-50 text-gray-600 font-montserrat border-t border-gray-200'>
            <div className='max-w-7xl mx-auto py-16 px-8'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>

                    {/* Kolom 1: Tentang & Logo */}
                    <div className='mb-6 md:mb-0'>
                        <h3 className='text-2xl font-bold text-gray-900 mb-4'>Tumbashop</h3>
                        <p className='text-sm leading-relaxed'>
                            Ekspresikan dirimu melalui fashion berkualitas. Kami menyediakan koleksi terbaik untuk membuat Anda tampil percaya diri setiap hari.
                        </p>
                    </div>

                    {/* Kolom 2: Navigasi */}
                    <div>
                        <h4 className='text-lg font-semibold text-gray-900 mb-4'>Navigasi</h4>
                        <ul className='space-y-3 text-sm'>
                            <li><Link to="/" className='hover:text-black transition-colors'>Home</Link></li>
                            <li><Link to="/collection" className='hover:text-black transition-colors'>Collection</Link></li>
                            <li><Link to="/about" className='hover:text-black transition-colors'>About</Link></li>
                            <li><Link to="/contact" className='hover:text-black transition-colors'>Contact</Link></li>
                            <li><Link to="/faq" className='hover:text-black transition-colors'>FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Kolom 3: Support */}
                    <div>
                        <h4 className='text-lg font-semibold text-gray-900 mb-4'>Support</h4>
                        <ul className='space-y-3 text-gray-600'>
                            <li><Link to="/faq" className='hover:text-black transition-colors'>FAQ</Link></li>
                            <li><Link to="/contact" className='hover:text-black transition-colors'>Hubungi Kami</Link></li>
                            <li><Link to="/privacy-policy" className='hover:text-black transition-colors'>Kebijakan Privasi</Link></li> 
                            <li><Link to="/testimonials" className='hover:text-black transition-colors'>Testimoni</Link></li>
                        </ul>
                    </div>

                    {/* Kolom 4: Ikuti Kami */}
                    <div>
                        <h4 className='text-lg font-semibold text-gray-900 mb-4'>Ikuti Kami</h4>
                        <p className='text-sm mb-4'>Dapatkan info terbaru tentang koleksi dan penawaran spesial.</p>
                        <div className='flex items-center gap-4 text-gray-500'>
                            <a href="#" aria-label="Instagram" className='text-xl hover:text-yellow-950 transition-colors'><FaInstagram /></a>
                            <a href="#" aria-label="Facebook" className='text-xl hover:text-yellow-950 transition-colors'><FaFacebookF /></a>
                            <a href="#" aria-label="Twitter" className='text-xl hover:text-yellow-950 transition-colors'><FaTwitter /></a>
                            <a href="#" aria-label="TikTok" className='text-xl hover:text-yellow-950 transition-colors'><FaTiktok /></a>
                        </div>
                    </div>

                </div>
            </div>

            <div className='border-t border-gray-200 py-6'>
                <p className='text-center text-xs text-gray-500'>
                    &copy; {new Date().getFullYear()} Tumbashop. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;