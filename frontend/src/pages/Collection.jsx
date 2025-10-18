import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Tittle from '../components/Tittle';
import ProductItem from '../components/ProductItem';

const Collection = () => {
    // (FIX) Ganti 'searchTerm' menjadi 'search' agar sesuai dengan context
    const { products, search } = useContext(ShopContext) || {};
    const [showFilter, setShowFilter] = useState(true);

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [sortType, setSortType] = useState('Relevan');

    const toggleCategory = (e) => {
        const value = e.target.value;
        if (selectedCategories.includes(value)) {
            setSelectedCategories(prev => prev.filter(item => item !== value));
        } else {
            setSelectedCategories(prev => [...prev, value]);
        }
    };

    const toggleSubCategory = (e) => {
        const value = e.target.value;
        if (selectedSubCategories.includes(value)) {
            setSelectedSubCategories(prev => prev.filter(item => item !== value));
        } else {
            setSelectedSubCategories(prev => [...prev, value]);
        }
    };

    useEffect(() => {
        if (!Array.isArray(products)) {
            setFilteredProducts([]);
            return;
        }

        let tempProducts = [...products];

        // 1. Terapkan filter pencarian (search)
        if (search && search.trim() !== '') {
            tempProducts = tempProducts.filter(p =>
                p.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        // 2. Terapkan filter kategori
        if (selectedCategories.length > 0) {
            tempProducts = tempProducts.filter(item => selectedCategories.includes(item.category));
        }

        // 3. Terapkan filter sub-kategori (Type)
        if (selectedSubCategories.length > 0) {
            tempProducts = tempProducts.filter(item => selectedSubCategories.includes(item.subCategory));
        }

        // 4. Terapkan sorting
        const sortedProducts = tempProducts.sort((a, b) => {
            switch (sortType) {
                case 'Low-High Price':
                    return a.price - b.price;
                case 'High-Low Price':
                    return b.price - a.price;
                case 'Relevan':
                default:
                    return b.date - a.date;
            }
        });

        setFilteredProducts(sortedProducts);

    }, [products, selectedCategories, selectedSubCategories, sortType, search]); // <-- (FIX) Ganti 'searchTerm' menjadi 'search'

    return (
        <div className='flex flex-col sm:flex-row gap-8 pt-10 border-t px-4'>
            {/* ... (bagian filter tidak berubah) ... */}
            <div className='w-full sm:w-60'>
                <div onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center justify-between cursor-pointer'>
                    <p>Filters</p>
                    <img src={assets.dropdown_icon} className={`h-3 sm:hidden transition-transform ${showFilter ? 'rotate-180' : ''}`} alt="toggle filter" />
                </div>
                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>Categories</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <label className='flex items-center gap-2 cursor-pointer'><input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} />Women</label>
                        <label className='flex items-center gap-2 cursor-pointer'><input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} />Men</label>
                        <label className='flex items-center gap-2 cursor-pointer'><input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} />Kids</label>
                        <label className='flex items-center gap-2 cursor-pointer'><input className='w-3' type="checkbox" value={'Gaming Gear'} onChange={toggleCategory} />Gaming</label>
                        <label className='flex items-center gap-2 cursor-pointer'><input className='w-3' type="checkbox" value={'Elektronik'} onChange={toggleCategory} />Elektronik</label>
                    </div>
                </div>
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>Type</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <label className='flex items-center gap-2 cursor-pointer'><input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} /> Topwear</label>
                        <label className='flex items-center gap-2 cursor-pointer'><input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear</label>
                        <label className='flex items-center gap-2 cursor-pointer'><input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear</label>
                    </div>
                </div>
            </div>

            {/* Kolom Produk */}
            <div className='flex-1'>
                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Tittle text1={'All'} text2={'Collections'} />
                    <select value={sortType} onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
                        <option value="Relevan">Sort By Relevan</option>
                        <option value="Low-High Price">Sort By Low to high</option>
                        <option value="High-Low Price">Sort By High to Low</option>
                    </select>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((item) => (
                            <ProductItem key={item._id} id={item._id} name={item.name} price={item.price} image={item.image} />
                        ))
                    ) : (
                        <p className='col-span-full text-center text-gray-500 mt-10'>No products found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Collection;