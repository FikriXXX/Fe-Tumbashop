import React, { createContext, useState } from "react";
import { products as allProductsData } from "../assets/assets";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    // --- State & Data Dasar ---
    const currency = 'Rp.';
    const delivery_fee = 15000;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // ---Logika Keranjang ---
    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId, quantity = 1) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + quantity }));
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
            if (newCart[itemId]) {
                delete newCart[itemId];
            }
            return newCart;
        });
    };

    const getCartTotalAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = allProductsData.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    // --- Logika Login/Logout ---
    const login = (email) => {
        console.log(`User logged in: ${email}`);
        setIsLoggedIn(true);
    };

    const logout = () => {
        console.log("User logged out");
        setIsLoggedIn(false);

    };

    // --- Nilai yang Dibagikan oleh Context ---
    const value = {
        products: allProductsData, 
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        isLoggedIn,
        login,
        logout,
        cartItems,
        addToCart,
        removeFromCart,
        deleteFromCart,
        getCartTotalAmount,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;