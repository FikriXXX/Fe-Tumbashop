const db = require('../config/db');

const placeOrder = async (req, res) => {
    try {
        const { id, items, total, shipping, date } = req.body;

        const sql = `INSERT INTO orders (id, date, status, total, items, shipping) VALUES (?, ?, ?, ?, ?, ?)`;

        await db.query(sql, [
            id,
            date,
            'Processing',
            total,
            JSON.stringify(items),
            JSON.stringify(shipping)
        ]);

        res.json({ success: true, message: "Order Placed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

module.exports = { placeOrder };