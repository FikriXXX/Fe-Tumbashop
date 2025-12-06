const mysql = require('mysql2/promise'); // Perhatikan ada '/promise'
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'tumbashop',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Cek koneksi pas awal jalan
pool.getConnection()
    .then(conn => {
        console.log("✅ Database MySQL Terkoneksi!");
        conn.release();
    })
    .catch(err => {
        console.error("❌ Gagal Konek Database:", err.message);
    });

module.exports = pool;