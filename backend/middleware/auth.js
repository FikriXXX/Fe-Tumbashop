const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: "Tidak Terotorisasi, Login Lagi" });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        if (!req.body) {
            req.body = {};
        }

        req.body.userId = token_decode.id;

        next();
    } catch (error) {
        console.log("❌ Error Auth:", error.message);
        res.json({ success: false, message: "Error Token: " + error.message });
    }
}

module.exports = authMiddleware;