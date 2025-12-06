const db = require('../config/db');

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const imageFiles = req.files;
        const imagesUrl = imageFiles.map(file => `http://localhost:${process.env.PORT}/images/${file.filename}`);
        const imageString = imagesUrl.join(',');

        const _id = "prod_" + Date.now();
        const date = Date.now();

        let sizesString = '[]';
        if (sizes) {
            sizesString = JSON.stringify(sizes.split(','));
        }

        const sql = `INSERT INTO products (_id, name, description, price, image, category, subCategory, sizes, bestseller, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        await db.query(sql, [_id, name, description, price, imageString, category, subCategory, sizesString, bestseller === 'true' ? 1 : 0, date]);

        res.json({ success: true, message: "Product Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM products ORDER BY date DESC');

        const products = rows.map(item => ({
            ...item,
            image: item.image ? item.image.split(',') : [],
            sizes: item.sizes ? JSON.parse(item.sizes) : [],
            bestseller: item.bestseller === 1
        }));

        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const removeProduct = async (req, res) => {
    try {
        await db.query('DELETE FROM products WHERE _id = ?', [req.body.id]);
        res.json({ success: true, message: "Product Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

module.exports = { addProduct, getAllProducts, removeProduct };