const db = require('../config/db'); // Pastikan path config db bener
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = users[0];

        if (!user) return res.json({ success: false, message: "User tidak ditemukan" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user.id);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Password salah" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const [exists] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (exists.length > 0) return res.json({ success: false, message: "Email sudah terdaftar" });
        if (!validator.isEmail(email)) return res.json({ success: false, message: "Email tidak valid" });
        if (password.length < 8) return res.json({ success: false, message: "Password minimal 8 karakter" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [result] = await db.query(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [name, email, hashedPassword]);
        const token = createToken(result.insertId);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Kredensial Admin Salah" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        const [users] = await db.query('SELECT name, email, phone, street, city, state, zipcode, country FROM users WHERE id = ?', [userId]);
        if (users.length > 0) res.json({ success: true, userData: users[0] });
        else res.json({ success: false, message: "User tidak ditemukan" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const { userId, name, phone, street, city, state, zipcode, country } = req.body;
        console.log("Mencoba update profile untuk User ID:", userId);
        console.log("Data baru:", { name, phone, city });
        if (!userId) {
            return res.json({ success: false, message: "Gagal Update: User ID tidak ditemukan (Cek Token)" });
        }
        const sql = `UPDATE users SET name=?, phone=?, street=?, city=?, state=?, zipcode=?, country=? WHERE id=?`;
        await db.query(sql, [name, phone, street, city, state, zipcode, country, userId]);
        res.json({ success: true, message: "Profil berhasil diperbarui!" });
    } catch (error) {
        console.log("❌ Error Update Profile:", error);
        res.json({ success: false, message: error.message });
    }
}

module.exports = { loginUser, registerUser, adminLogin, getUserProfile, updateUserProfile };