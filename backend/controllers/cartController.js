const db = require('../config/db');

const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        const [users] = await db.query('SELECT cartData FROM users WHERE id = ?', [userId]);
        let cartData = users[0].cartData || {};

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        await db.query('UPDATE users SET cartData = ? WHERE id = ?', [JSON.stringify(cartData), userId]);

        res.json({ success: true, message: "Added to Cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const updateCart = async (req, res) => {
    try {
        const { userId, itemId, quantity } = req.body;

        const [users] = await db.query('SELECT cartData FROM users WHERE id = ?', [userId]);
        let cartData = users[0].cartData || {};

        cartData[itemId] = quantity;

        await db.query('UPDATE users SET cartData = ? WHERE id = ?', [JSON.stringify(cartData), userId]);
        res.json({ success: true, message: "Cart Updated" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;

        const [users] = await db.query('SELECT cartData FROM users WHERE id = ?', [userId]);
        let cartData = users[0].cartData || {};

        res.json({ success: true, cartData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

module.exports = { addToCart, updateCart, getUserCart };