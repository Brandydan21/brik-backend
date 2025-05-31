import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// CREATE preference (1-to-1: each user gets only one)
export const createUserPreference = async (req, res) => {
  const userId = req.user.id;
  const {
    preferredLocation,
    minBudget,
    maxBudget,
    petsAllowed,
    smokingAllowed,
    minAge,
    maxAge,
    cleanlinessLevel,
    lifestyle
  } = req.body;

  try {
    const existing = await prisma.userPreference.findUnique({ where: { userId } });
    if (existing) {
      return res.status(400).json({ message: 'Preference already exists for this user.' });
    }

    const preference = await prisma.userPreference.create({
      data: {
        userId,
        preferredLocation,
        minBudget,
        maxBudget,
        petsAllowed,
        smokingAllowed,
        minAge,
        maxAge,
        cleanlinessLevel,
        lifestyle
      }
    });

    res.status(201).json({message: 'successfully created user preferences', preferences:preference});
  } catch (error) {
    res.status(500).json({ error: 'Error creating user preference', detail: error.message });
  }
};

// GET preference for logged-in user
export const getUserPreference = async (req, res) => {
  const userId = req.user.id;

  try {
    const preference = await prisma.userPreference.findUnique({
      where: { userId }
    });

    if (!preference) return res.status(404).json({ message: 'Preference not found.' });

    res.json(preference);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user preference', detail: error.message });
  }
};

// UPDATE preference for logged-in user
export const updateUserPreference = async (req, res) => {
  const userId = req.user.id;
  const updates = req.body;

  try {
    const preference = await prisma.userPreference.update({
      where: { userId },
      data: updates
    });

    res.status(201).json({message: 'successfully updated user preferences', preferences:preference});
  } catch (error) {
    res.status(500).json({ error: 'Error updating user preference', detail: error.message });
  }
};

// DELETE preference for logged-in user
export const deleteUserPreference = async (req, res) => {
  const userId = req.user.id;

  try {
    await prisma.userPreference.delete({
      where: { userId }
    });

    res.json({ message: 'User preference deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user preference', detail: error.message });
  }
};
