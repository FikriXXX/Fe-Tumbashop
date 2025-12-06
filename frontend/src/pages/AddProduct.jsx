import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiUploadCloud, FiCheck } from 'react-icons/fi';

const AddProduct = ({ token }) => {
    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("Topwear");
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestseller", bestseller);
            formData.append("sizes", JSON.stringify(sizes));

            image1 && formData.append("image", image1);
            image2 && formData.append("image", image2);
            image3 && formData.append("image", image3);
            image4 && formData.append("image", image4);

            const response = await axios.post('http://localhost:4000/api/products/add', formData, { headers: { token } });

            if (response.data.success) {
                toast.success(response.data.message);
                setName(''); setDescription(''); setPrice(''); setSizes([]); setBestseller(false);
                setImage1(false); setImage2(false); setImage3(false); setImage4(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleSize = (size) => {
        setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size]);
    };

    return (
        <form onSubmit={onSubmitHandler} className='max-w-4xl bg-white p-8 rounded-xl shadow-sm border border-gray-100'>
            <div className="mb-8 pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
                <p className="text-gray-500 text-sm">Fill in the details to upload a new item.</p>
            </div>

            <div className='mb-8'>
                <p className='text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide'>Product Images</p>
                <div className='flex gap-4 overflow-x-auto'>
                    {[image1, image2, image3, image4].map((img, idx) => (
                        <label key={idx} htmlFor={`img-${idx}`} className='cursor-pointer group'>
                            <div className={`w-24 h-24 rounded-xl border-2 border-dashed flex items-center justify-center transition-all ${img ? 'border-yellow-950 bg-white' : 'border-gray-300 bg-gray-50 group-hover:bg-gray-100'}`}>
                                {img ? <img className='w-full h-full object-cover rounded-xl' src={URL.createObjectURL(img)} alt="" /> : <FiUploadCloud className='text-2xl text-gray-400 group-hover:text-gray-600' />}
                            </div>
                            <input onChange={(e) => [setImage1, setImage2, setImage3, setImage4][idx](e.target.files[0])} type="file" id={`img-${idx}`} hidden />
                        </label>
                    ))}
                </div>
            </div>

            <div className='grid grid-cols-1 gap-6'>
                <div className="space-y-1">
                    <label className='text-sm font-semibold text-gray-700'>Product Name</label>
                    <input onChange={(e) => setName(e.target.value)} value={name} className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-yellow-950 outline-none' type="text" placeholder='e.g. Classic Cotton Shirt' required />
                </div>

                <div className="space-y-1">
                    <label className='text-sm font-semibold text-gray-700'>Description</label>
                    <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-yellow-950 outline-none' rows="4" placeholder='Detailed description...' required />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
                    <div className="space-y-1">
                        <label className='text-sm font-semibold text-gray-700'>Category</label>
                        <select onChange={(e) => setCategory(e.target.value)} className='w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none bg-white'>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Kids">Kids</option>
                            <option value="Kids">Gaming</option>
                            <option value="Kids">Electronics</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className='text-sm font-semibold text-gray-700'>Sub Category</label>
                        <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none bg-white'>
                            <option value="Topwear">Topwear</option>
                            <option value="Bottomwear">Bottomwear</option>
                            <option value="Winterwear">Winterwear</option>
                            <option value="Winterwear">Gaming Gear</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className='text-sm font-semibold text-gray-700'>Price (IDR)</label>
                        <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-yellow-950 outline-none' type="number" placeholder='0' required />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className='text-sm font-semibold text-gray-700'>Available Sizes</label>
                    <div className='flex gap-3'>
                        {["S", "M", "L", "XL", "XXL"].map(size => (
                            <div key={size} onClick={() => toggleSize(size)} className={`w-10 h-10 flex items-center justify-center rounded cursor-pointer border transition-all ${sizes.includes(size) ? "bg-yellow-950 text-white border-yellow-950" : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"}`}>
                                {size}
                            </div>
                        ))}
                    </div><div className='flex gap-3'>
                        {["-"].map(size => (
                            <div key={size} onClick={() => toggleSize(size)} className={`w-10 h-10 flex items-center justify-center rounded cursor-pointer border transition-all ${sizes.includes(size) ? "bg-yellow-950 text-white border-yellow-950" : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"}`}>
                                {size}
                            </div>
                        ))}
                    </div>
                </div>

                <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg'>
                    <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" className='w-5 h-5 accent-yellow-950 cursor-pointer' />
                    <label className='cursor-pointer text-gray-700 font-medium' htmlFor="bestseller">Mark as Bestseller</label>
                </div>
            </div>

            <button type="submit" disabled={loading} className='mt-8 w-full bg-black text-white py-3.5 rounded-lg font-bold hover:bg-gray-800 transition shadow-lg disabled:opacity-70'>
                {loading ? 'UPLOADING...' : 'ADD PRODUCT'}
            </button>
        </form>
    )
}

export default AddProduct;