import express from 'express';
import {
  createListing,
  getListing,
  updateListing,
  deleteListing
} from '../controllers/listingController.js';

import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, createListing);
router.get('/', authenticateToken, getListing);
router.put('/', authenticateToken, updateListing);
router.delete('/', authenticateToken, deleteListing);

export default router;
