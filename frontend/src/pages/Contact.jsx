import React from 'react';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Contact = () => {
    return (
        <div className='py-16 lg:py-24 bg-stone-50'>
            <div className='max-w-6xl mx-auto px-4'>

                <div className='text-center mb-16'>
                    <h1 className='text-4xl md:text-5xl font-bold text-gray-800 font-montserrat'>
                        Hubungi Kami
                    </h1>
                    <p className='mt-4 text-base text-gray-600 max-w-2xl mx-auto'>
                        Punya pertanyaan atau masukan? Kami siap mendengarkan. Silakan isi formulir di bawah atau hubungi kami melalui detail kontak yang tersedia.
                    </p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start'>

                    <div className='bg-white p-8 rounded-lg shadow-md'>
                        <h2 className='text-2xl font-semibold text-gray-900 mb-6'>Kirim Pesan</h2>
                        <form action="#" method="POST" className='space-y-6'>
                            <div>
                                <label htmlFor="name" className='block text-sm font-medium text-gray-700'>Nama Lengkap</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-900 focus:border-yellow-900'
                                    placeholder='Nama Anda'
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Alamat Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-900 focus:border-yellow-900'
                                    placeholder='email@anda.com'
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className='block text-sm font-medium text-gray-700'>Pesan</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    required
                                    className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-900 focus:border-yellow-900'
                                    placeholder='Tuliskan pesan Anda di sini...'
                                ></textarea>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className='w-full py-3 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition-colors duration-300'
                                >
                                    Kirim Pesan
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className='space-y-8'>
                        <div className='bg-white p-8 rounded-lg shadow-md'>
                            <h2 className='text-2xl font-semibold text-gray-900 mb-6'>Info Kontak</h2>
                            <div className='space-y-4 text-gray-700'>
                                <div className='flex items-center gap-4'>
                                    <FiMail className='text-xl text-yellow-950' />
                                    <a href="mailto:contact@tumbashop.com" className='hover:text-black'>contact@tumbashop.com</a>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <FiPhone className='text-xl text-yellow-950' />
                                    <a href="tel:+622112345678" className='hover:text-black'>+62 21 1234 5678</a>
                                </div>
                                <div className='flex items-start gap-4'>
                                    <FiMapPin className='text-xl text-yellow-950 mt-1' />
                                    <p>Jl. Nangka Raya No.58 C, RT.7/RW.5, Tj. Bar., Kec. Jagakarsa, Kota Jakarta Selatan, DKI Jakarta 12530</p>
                                </div>
                            </div>
                        </div>
                        <div className='overflow-hidden rounded-lg shadow-md'>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.412321453121!2d106.8227658749912!3d-6.340912193649692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ec011f973e05%3A0x6b399694e976644!2sJl.%20Nangka%20Raya%20No.58C%2C%20RT.7%2FRW.5%2C%20Tj.%20Bar.%2C%20Kec.%20Jagakarsa%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2012530!5e0!3m2!1sen!2sid!4v1727530512345!5m2!1sen!2sid"
                                className='w-full h-64 border-0'
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contact;