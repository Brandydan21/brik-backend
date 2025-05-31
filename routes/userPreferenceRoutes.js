// routes/userPreferenceRoutes.js
import express from 'express';
import {
    createUserPreference,
    getUserPreference,
    updateUserPreference,
    deleteUserPreference
} from '../controllers/userPreferencesController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';


const router = express.Router();
// user preference routes require auth token to access
router.post('/', authenticateToken, createUserPreference);
router.get('/', authenticateToken, getUserPreference);
router.put('/', authenticateToken, updateUserPreference);
router.delete('/', authenticateToken, deleteUserPreference);

export default router;
