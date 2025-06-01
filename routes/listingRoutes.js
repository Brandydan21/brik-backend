import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js'; 
import {
  createListing,
  getListing,
  updateListing,
  deleteListing
} from '../controllers/listingController.js';

const router = express.Router();

// Upload up to 5 images as listingImage1, listingImage2, ..., listingImage5
const listingImageFields = [
  { name: 'listingImage1', maxCount: 1 },
  { name: 'listingImage2', maxCount: 1 },
  { name: 'listingImage3', maxCount: 1 },
  { name: 'listingImage4', maxCount: 1 },
  { name: 'listingImage5', maxCount: 1 },
];

router.post('/', authenticateToken, upload.fields(listingImageFields), createListing);
router.get('/', authenticateToken, getListing);
router.put('/', authenticateToken, upload.fields(listingImageFields), updateListing);
router.delete('/', authenticateToken, deleteListing);

export default router;
