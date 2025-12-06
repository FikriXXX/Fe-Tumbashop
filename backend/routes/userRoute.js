const express = require('express');
const { loginUser, registerUser, adminLogin, getUserProfile, updateUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');


const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);

userRouter.get('/profile', authMiddleware, getUserProfile);
userRouter.post('/update-profile', authMiddleware, updateUserProfile);

module.exports = userRouter;