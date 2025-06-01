import express from 'express';
import { updateUser } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.put('/update', authenticateToken, upload.single('profileImage'), updateUser);

export default router;