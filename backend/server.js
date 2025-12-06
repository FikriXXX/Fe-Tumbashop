const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db = require('./config/db'); // Pastikan db.js sudah support mysql2/promise

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// --- UPDATE BAGIAN INI ---
const userRouter = require('./routes/userRoute');
const productRouter = require('./routes/productRoute'); // Pastikan file ini ada

app.use('/api/user', userRouter);
app.use('/api/products', productRouter); // PAKE 'S' BIAR COCOK SAMA FRONTEND

app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send("API Working Bang!");
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server jalan di port ${port}`);
    });
}

app.listen(port, () => {
    console.log(`Server jalan di port ${port}`);
});