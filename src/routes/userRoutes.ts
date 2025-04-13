/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */


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