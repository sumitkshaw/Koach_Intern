import express from 'express'
import { registerUser,deleteUserProfile, loginUser, getUserProfile, updateUserProfile } from '../controllers/userController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = express.Router();

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// Protected routes for authenticated users
router.get('/profile', verifyToken, getUserProfile);
router.put('/profile', verifyToken, updateUserProfile);
router.delete('/profile', verifyToken, deleteUserProfile);

export default router;