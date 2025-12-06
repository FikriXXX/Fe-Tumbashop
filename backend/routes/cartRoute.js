const express = require('express');
const { addToCart, getUserCart, updateCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/auth');

const cartRouter = express.Router();

cartRouter.post('/add', authMiddleware, addToCart);
cartRouter.post('/update', authMiddleware, updateCart);
cartRouter.post('/get', authMiddleware, getUserCart);

module.exports = cartRouter;