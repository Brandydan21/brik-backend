import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const BASE_URL = process.env.BASE_URL

// Utility to delete an image file
const deleteImageFile = (relativePath) => {
  const absolutePath = path.join(process.cwd(), relativePath);
  fs.unlink(absolutePath, (err) => {
    if (err) console.error(`Failed to delete image: ${absolutePath}`, err.message);
  });
};

// CREATE listing
export const createListing = async (req, res) => {
  const userId = req.user.id;
  const { description, location, rentPriceWeekly, availabilityDate, petsAllowed } = req.body;

  try {
    const existing = await prisma.listing.findUnique({ where: { userId } });
    if (existing) {
      return res.status(400).json({ message: 'Listing already exists for this user.' });
    }

    // 
    const imageUrls = [];
    for (let i = 1; i <= 5; i++) {
      const file = req.files[`listingImage${i}`]?.[0];
      if (file) {
        imageUrls.push(`user-images/${file.filename}`);
      }
    }

    const listing = await prisma.listing.create({
      data: {
        userId,
        description,
        location,
        rentPriceWeekly: parseFloat(rentPriceWeekly),
        availabilityDate: new Date(availabilityDate),
        petsAllowed: petsAllowed === 'true' || petsAllowed === true,
        imageUrls,
      }
    });

    res.status(201).json({
      message: 'Successfully created listing',
      listing: {
        ...listing,
        imageUrls: listing.imageUrls.map(url => `${BASE_URL}${url}`)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating listing', detail: error.message });
  }
};

// UPDATE listing
export const updateListing = async (req, res) => {
  const userId = req.user.id;
  const updates = req.body;

  try {
    const existingListing = await prisma.listing.findUnique({ where: { userId } });
    if (!existingListing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    let imageUrls = [...existingListing.imageUrls];

    for (let i = 1; i <= 5; i++) {
      const file = req.files[`listingImage${i}`]?.[0];
      if (file) {
        if (imageUrls[i - 1]) {
          deleteImageFile(imageUrls[i - 1]); // delete old image
        }
        imageUrls[i - 1] = `user-images/${file.filename}`;
      }
    }

    const updated = await prisma.listing.update({
      where: { userId },
      data: {
        ...updates,
        availabilityDate: updates.availabilityDate ? new Date(updates.availabilityDate) : undefined,
        rentPriceWeekly: updates.rentPriceWeekly ? parseFloat(updates.rentPriceWeekly) : undefined,
        petsAllowed: updates.petsAllowed !== undefined ? updates.petsAllowed === 'true' || updates.petsAllowed === true : undefined,
        imageUrls,
      }
    });

    res.status(200).json({
      message: 'Successfully updated listing',
      listing: {
        ...updated,
        imageUrls: updated.imageUrls.map(url => `${BASE_URL}${url}`)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error updating listing', detail: error.message });
  }
};

// DELETE listing
export const deleteListing = async (req, res) => {
  const userId = req.user.id;

  try {
    const existing = await prisma.listing.findUnique({ where: { userId } });
    if (existing?.imageUrls?.length) {
      existing.imageUrls.forEach(img => deleteImageFile(img));
    }

    await prisma.listing.delete({
      where: { userId }
    });

    res.json({ message: 'Listing deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting listing', detail: error.message });
  }
};

// GET listing for logged-in user
export const getListing = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const listing = await prisma.listing.findUnique({
        where: { userId }
      });
  
      if (!listing) {
        return res.status(404).json({ message: 'Listing not found.' });
      }
  
      res.status(200).json({
        listing: {
          ...listing,
          imageUrls: listing.imageUrls.map(url => `${BASE_URL}${url}`)
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching listing', detail: error.message });
    }
  };
  
