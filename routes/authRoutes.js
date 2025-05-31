// routes/authRoutes.js
import express from 'express';
import { register, login } from '../controllers/authController.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// use the upload middleware to handle profileImage data from request
router.post('/register', upload.single('profileImage'), register); 
router.post('/login', login);

export default router;
