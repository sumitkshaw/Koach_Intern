import express from 'express'
import { registerUser,deleteUserProfile, loginUser, getUserProfile, updateUserProfile } from '../controllers/userController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/profile', verifyToken, getUserProfile);
router.put('/profile', verifyToken, updateUserProfile);
router.delete('/profile', verifyToken, deleteUserProfile);

export default router;