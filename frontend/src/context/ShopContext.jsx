import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const currency = 'Rp.';
    const delivery_fee = 15000;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [wishlistItems, setWishlistItems] = useState({});
    const [orders, setOrders] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : "");

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/products/list');
            console.log("Data dari Backend:", response.data);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error("Gagal: " + response.data.message);
            }
        } catch (error) {
            console.error("Eror Fetch:", error);
            toast.error("Gagal koneksi ke server");
        }
    };

    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
        }
    }, [token]);

    const addToCart = (itemId, quantity = 1) => {
        setCartItems((prev) => {
            const newCart = { ...prev };
            newCart[itemId] = (newCart[itemId] || 0) + quantity;
            return newCart;
        });
        toast.success("Item added to cart");
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const newCart = { ...prev };
            if (newCart[itemId] > 1) {
                newCart[itemId] -= 1;
            } else {
                delete newCart[itemId];
            }
            return newCart;
        });
    };

    const deleteFromCart = (itemId) => {
        setCartItems((prev) => {
            const newCart = { ...prev };
            delete newCart[itemId];
            return newCart;
        });
    };

    const getCartTotalAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = products.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const clearCart = () => setCartItems({});

    const toggleWishlist = (itemId) => {
        setWishlistItems((prev) => {
            const newWishlist = { ...prev };
            if (newWishlist[itemId]) {
                delete newWishlist[itemId];
                toast.info("Removed from wishlist");
            } else {
                newWishlist[itemId] = true;
                toast.success("Added to wishlist");
            }
            return newWishlist;
        });
    };

    const addOrder = async (items, totalAmount, shippingDetails) => {
        const orderId = `#ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const date = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

        const newOrder = {
            id: orderId,
            date: date,
            status: 'Processing',
            total: totalAmount,
            items: items,
            shipping: shippingDetails
        };

        setOrders(prevOrders => [newOrder, ...prevOrders]);

        try {
            const response = await axios.post(backendUrl + '/api/orders/place', newOrder);
            if (response.data.success) {
                console.log("Order saved to database");
            } else {
                console.error("Failed to save order:", response.data.message);
            }
        } catch (error) {
            console.error("Error creating order:", error);
        }

        return orderId;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
        navigate('/login');
    };

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, removeFromCart, deleteFromCart, getCartTotalAmount, clearCart,
        wishlistItems, toggleWishlist,
        orders, addOrder,
        backendUrl, token, setToken, navigate, logout
    };



    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;