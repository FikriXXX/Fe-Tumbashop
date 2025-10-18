import React from 'react';
import { FiStar } from 'react-icons/fi';

// Data dummy
const testimonialData = [
    { id: 1, name: "Ahmad S.", location: "Jakarta", quote: "Kualitas produknya luar biasa! Pengirimannya juga cepat. Sangat puas belanja di Tumbashop.",  },
    { id: 2, name: "Bunga C.", location: "Surabaya", quote: "Suka banget sama koleksi pakaiannya, selalu update dengan tren terbaru. Harganya juga terjangkau.", },
    { id: 3, name: "Citra D.", location: "Bandung", quote: "Pelayanan CS-nya ramah dan responsif. Proses pengembalian barang juga mudah.", },
    { id: 4, name: "Dedi K.", location: "Medan", quote: "Keyboard gaming yang saya beli mantap! Sesuai deskripsi dan berfungsi dengan baik.", },
    { id: 5, name: "Eka P.", location: "Yogyakarta", quote: "Websitenya mudah digunakan, proses checkout cepat dan tidak ribet. Recommended!",},
    { id: 6, name: "Fajar R.", location: "Semarang", quote: "Barang elektronik sampai dengan aman, packingnya rapi banget. Terima kasih Tumbashop!",},
    { id: 7, name: "Gita W.", location: "Makassar", quote: "Sering ada promo menarik, jadi bisa dapat barang bagus dengan harga lebih murah.", },
    { id: 8, name: "Hadi L.", location: "Palembang", quote: "Ukuran pakaiannya pas sesuai size guide. Bahannya juga adem dan nyaman dipakai.",},
    { id: 9, name: "Indah M.", location: "Bekasi", quote: "Mouse gamingnya responsif banget, cocok buat main game kompetitif. Pengiriman cepat!" },
];

const Testimonials = () => {
    return (
        <div className='py-20 bg-stone-50'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Header Section */}
                <div className='text-center mb-12'>
                    <h2 className='text-3xl font-bold text-gray-800'>
                        Loved by Our Customers
                    </h2>
                    <p className='mt-2 text-gray-600'>See what others are saying about Tumbashop.</p>
                </div>
                
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {testimonialData.map((testimonial) => (
                        // Card Testimonial
                        <div key={testimonial.id} className='bg-white p-6 rounded-lg shadow-lg border border-gray-100 flex flex-col'>
                            <div className='flex text-yellow-500 mb-3'>
                                <FiStar fill='currentColor' />
                                <FiStar fill='currentColor' />
                                <FiStar fill='currentColor' />
                                <FiStar fill='currentColor' />
                                <FiStar fill='currentColor' />
                            </div>
                            <p className='text-gray-700 mb-4 flex-grow text-base'>
                                "{testimonial.quote}"
                            </p>
                            {/* Customer Info */}
                            <div className='flex items-center mt-auto pt-4 border-t border-gray-100'>
                                <img 
                                    src={testimonial.image} 
                                    alt={testimonial.name}
                                    className='w-10 h-10 rounded-full object-cover mr-3'
                                />
                                <div>
                                    <p className='font-semibold text-gray-900 text-sm'>{testimonial.name}</p>
                                    <p className='text-xs text-gray-500'>{testimonial.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;