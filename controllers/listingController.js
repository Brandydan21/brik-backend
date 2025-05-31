import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// CREATE listing (1-to-1: each user can only post one listing)
export const createListing = async (req, res) => {
  const userId = req.user.id;
  const {
    description,
    location,
    rentPriceWeekly,
    availabilityDate,
    petsAllowed,
    imageUrl
  } = req.body;

  try {
    const existing = await prisma.listing.findUnique({ where: { userId } });
    if (existing) {
      return res.status(400).json({ message: 'Listing already exists for this user.' });
    }

    const listing = await prisma.listing.create({
      data: {
        userId,
        description,
        location,
        rentPriceWeekly,
        availabilityDate: new Date(availabilityDate),
        petsAllowed,
        imageUrl
      }
    });

    res.status(201).json({ message: 'Successfully created listing', listing });
  } catch (error) {
    res.status(500).json({ error: 'Error creating listing', detail: error.message });
  }
};

// GET listing for logged-in user
export const getListing = async (req, res) => {
  const userId = req.user.id;

  try {
    const listing = await prisma.listing.findUnique({
      where: { userId }
    });

    if (!listing) return res.status(404).json({ message: 'Listing not found.' });

    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching listing', detail: error.message });
  }
};

// UPDATE listing for logged-in user
export const updateListing = async (req, res) => {
  const userId = req.user.id;
  const updates = req.body;

  try {
    const listing = await prisma.listing.update({
      where: { userId },
      data: {
        ...updates,
        availabilityDate: updates.availabilityDate
          ? new Date(updates.availabilityDate)
          : undefined
      }
    });

    res.status(200).json({ message: 'Successfully updated listing', listing });
  } catch (error) {
    res.status(500).json({ error: 'Error updating listing', detail: error.message });
  }
};

// DELETE listing for logged-in user
export const deleteListing = async (req, res) => {
  const userId = req.user.id;

  try {
    await prisma.listing.delete({
      where: { userId }
    });

    res.json({ message: 'Listing deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting listing', detail: error.message });
  }
};
