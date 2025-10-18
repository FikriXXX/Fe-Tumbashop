import React from 'react';

const faqData = [
    {
        question: "Bagaimana cara melacak pesanan saya?",
        answer: "Setelah pesanan Anda dikirim, kami akan mengirimkan email konfirmasi yang berisi nomor pelacakan. Anda dapat menggunakan nomor tersebut di situs web kurir untuk melihat status pengiriman."
    },
    {
        question: "Apa kebijakan pengembalian barang Anda?",
        answer: "Kami menawarkan kebijakan pengembalian barang dalam 14 hari setelah barang diterima. Barang harus dalam kondisi asli, belum dipakai, dan dengan label yang masih terpasang. Silakan hubungi layanan pelanggan kami untuk memulai proses pengembalian."
    },
    {
        question: "Metode pembayaran apa saja yang diterima?",
        answer: "Kami menerima berbagai metode pembayaran, termasuk kartu kredit/debit (Visa, MasterCard), transfer bank, dan dompet digital (GoPay, OVO, Dana)."
    }
];

const Faq = () => {
    return (
        <div className='my-20 px-4 md:px-8 max-w-7xl mx-auto'>
            <div className='flex flex-col lg:flex-row gap-12 lg:gap-16'>
                <div className='w-full lg:w-1/2'>
                    <h2 className='font-montserrat text-3xl not-italic text-center lg:text-center font-bold mb-12'>
                        Frequently Asked Questions
                    </h2>
                    <div className='space-y-6'>
                        {faqData.map((item, index) => (
                            <div key={index} className='border rounded-lg p-6 shadow-sm bg-white'>
                                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                                    {item.question}
                                </h3>
                                <p className='text-gray-600 leading-relaxed'>
                                    {item.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='w-full lg:w-1/2 flex flex-col'>
                    <h2 className='font-montserrat text-3xl not-italic text-center lg:text-center font-bold mb-12'>
                        Lokasi Kami
                    </h2>
                    <div className='overflow-hidden rounded-lg shadow-lg flex-grow'>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.412321453121!2d106.8227658749912!3d-6.340912193649692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ec011f973e05%3A0x6b399694e976644!2sJl.%20Nangka%20Raya%20No.58C%2C%20RT.7%2FRW.5%2C%20Tj.%20Bar.%2C%20Kec.%20Jagakarsa%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2012530!5e0!3m2!1sen!2sid!4v1727530512345!5m2!1sen!2sid"
                            className='w-full h-full border-0'
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Faq;