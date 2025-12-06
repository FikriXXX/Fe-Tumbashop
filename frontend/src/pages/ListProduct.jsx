import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiTrash2, FiBox, FiSearch } from 'react-icons/fi';

const ListProduct = ({ token }) => {
    const { backendUrl, currency } = useContext(ShopContext);
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/products/list');
            if (response.data.success) {
                setList(response.data.products);
            } else {
                toast.error("Gagal memuat data");
            }
        } catch (error) {
            toast.error("Eror koneksi ke database");
        }
    };

    const removeProduct = async (id) => {
        if (window.confirm("Yakin ingin menghapus produk ini?")) {
            try {
                const response = await axios.post(backendUrl + '/api/products/remove', { id }, { headers: { token } });
                if (response.data.success) {
                    toast.success(response.data.message);
                    await fetchList();
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className='p-4 sm:p-8 w-full'>
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className='text-2xl font-bold text-gray-800'>Daftar Produk</h2>
                    <p className="text-gray-500 text-sm mt-1">Kelola semua produk di toko Anda.</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-full border border-gray-200 flex items-center gap-2 shadow-sm">
                    <span className="text-sm font-semibold text-gray-600">Total:</span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-bold">{list.length} Items</span>
                </div>
            </div>

            <div className='bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm'>
                {/* Table Header */}
                <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] bg-gray-50 border-b border-gray-200 py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider'>
                    <span>Gambar</span>
                    <span>Nama Produk</span>
                    <span>Kategori</span>
                    <span>Harga</span>
                    <span className='text-center'>Aksi</span>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-100">
                    {list.map((item, index) => (
                        <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4 py-4 px-6 hover:bg-gray-50 transition duration-150 group'>
                            {/* Image */}
                            <div className="h-16 w-16 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 flex-shrink-0 shadow-sm">
                                {item.image && item.image.length > 0 ? (
                                    <img className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' src={item.image[0]} alt={item.name} />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300"><FiBox /></div>
                                )}
                            </div>

                            {/* Name */}
                            <div className="min-w-0 pr-4">
                                <p className='text-sm font-semibold text-gray-900 truncate group-hover:text-yellow-950 transition-colors'>{item.name}</p>
                                <p className='text-xs text-gray-500 md:hidden mt-1'>{item.category}</p>
                            </div>

                            {/* Category */}
                            <p className='hidden md:block text-sm text-gray-600'><span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium border border-gray-200">{item.category}</span></p>

                            {/* Price */}
                            <p className='hidden md:block text-sm font-medium text-gray-900'>{currency} {item.price ? item.price.toLocaleString('id-ID') : '0'}</p>

                            {/* Action */}
                            <div className='text-center'>
                                <button
                                    onClick={() => removeProduct(item._id)}
                                    className='p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all'
                                    title="Hapus Produk"
                                >
                                    <FiTrash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {list.length === 0 && (
                    <div className='flex flex-col items-center justify-center py-20 text-center'>
                        <div className="bg-gray-50 p-4 rounded-full mb-4">
                            <FiBox className="w-10 h-10 text-gray-300" />
                        </div>
                        <p className="text-gray-900 font-medium text-lg">Belum ada produk</p>
                        <p className="text-gray-500 text-sm mt-1">Mulai tambahkan produk baru melalui menu sidebar.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListProduct;