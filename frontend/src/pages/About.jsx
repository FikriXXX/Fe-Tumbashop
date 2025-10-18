import React from 'react';
import { FiEye, FiTarget, FiAward, FiSmile, FiPackage } from 'react-icons/fi';

const About = () => {
    return (
        <div className='bg-white text-gray-800'>
            {/* Hero Section */}
            <div className='relative h-[50vh] flex items-center justify-center text-center px-4'>
                <div
                    className='absolute inset-0 bg-cover bg-center bg-no-repeat'
                    style={{ backgroundImage: "url('https://images.pexels.com/photos/5692348/pexels-photo-5692348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}
                >
                    <div className='absolute inset-0 bg-black opacity-50'></div>
                </div>
                <div className='relative z-10 text-white'>
                    <h1 className='text-4xl md:text-6xl font-bold font-montserrat'>
                        Ekspresikan Dirimu Bersama Kami
                    </h1>
                    <p className='mt-4 text-lg md:text-xl max-w-2xl mx-auto'>
                        Temukan semua kebutuhan Anda di satu tempat, dari fashion hingga gaming gear.</p>
                </div>
            </div>

            {/* Visi & Misi dalam Kartu */}
            <div className='max-w-5xl mx-auto py-20 px-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                    <div className='bg-stone-50 p-8 rounded-lg shadow-sm text-center'>
                        <FiEye className='mx-auto text-4xl text-yellow-950 mb-4' />
                        <h2 className='text-2xl font-bold text-gray-800 mb-3'>Visi Kami</h2>
                        <p className='text-gray-600 leading-relaxed'>
                            Menjadi destinasi fashion online terdepan yang menginspirasi kepercayaan diri melalui produk yang berkualitas, dan terjangkau.
                        </p>
                    </div>
                    <div className='bg-stone-50 p-8 rounded-lg shadow-sm text-center'>
                        <FiTarget className='mx-auto text-4xl text-yellow-950 mb-4' />
                        <h2 className='text-2xl font-bold text-gray-800 mb-3'>Misi Kami</h2>
                        <ul className='text-gray-600 space-y-2 leading-relaxed list-none'>
                            <li>Menyediakan barang dan fashion yang selalu up-to-date.</li>
                            <li>Menjamin kualitas terbaik di setiap produk.</li>
                            <li>Memberikan pengalaman belanja yang tak terlupakan.</li>
                            <li>Membangun komunitas fashion yang positif.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className='bg-stone-50 py-20 lg:py-28'>
                <div className='max-w-5xl mx-auto px-4'>
                    <div className='text-center mb-16'>
                        <h2 className='text-4xl font-bold text-yellow-950 font-montserrat'>Perjalanan Kami</h2>
                        <p className='mt-4 text-gray-600 max-w-2xl mx-auto'>Dari mimpi sederhana hingga menjadi bagian dari cerita fashion Anda.</p>
                    </div>

                    <div className='relative'>
                        <div className='absolute left-1/2 w-0.5 h-full bg-gray-300 -translate-x-1/2'></div>

                        <div className='relative flex items-center justify-between w-full mb-16'>
                            <div className='hidden lg:block w-5/12'></div>
                            <div className='z-10 bg-yellow-950 text-white p-3 rounded-full text-2xl'><FiAward /></div>
                            <div className='w-full lg:w-5/12 bg-white p-6 rounded-lg shadow-md'>
                                <h3 className='font-bold text-xl mb-2'>2023 - Awal Mula</h3>
                                <p className='text-gray-600'>Tumbashop lahir dari sebuah ide sederhana: membuat online shop berkualitas dapat diakses oleh semua orang di Indonesia.</p>
                            </div>
                        </div>

                        <div className='relative flex items-center justify-between w-full mb-16'>
                            <div className='w-full lg:w-5/12 bg-white p-6 rounded-lg shadow-md text-right'>
                                <h3 className='font-bold text-xl mb-2'>2024 - Tumbuh Bersama</h3>
                                <p className='text-gray-600'>Berkat dukungan Anda, kami berkembang pesat, memperluas koleksi, dan membangun tim yang solid.</p>
                            </div>
                            <div className='z-10 bg-yellow-950 text-white p-3 rounded-full text-2xl'><FiSmile /></div>
                            <div className='hidden lg:block w-5/12'></div>
                        </div>

                        <div className='relative flex items-center justify-between w-full'>
                            <div className='hidden lg:block w-5/12'></div>
                            <div className='z-10 bg-yellow-950 text-white p-3 rounded-full text-2xl'><FiPackage /></div>
                            <div className='w-full lg:w-5/12 bg-white p-6 rounded-lg shadow-md'>
                                <h3 className='font-bold text-xl mb-2'>Masa Depan</h3>
                                <p className='text-gray-600'>Kami terus berinovasi untuk memberikan pengalaman terbaik, dari kualitas produk hingga layanan pelanggan.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;