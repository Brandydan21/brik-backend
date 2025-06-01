import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const BASE_URL = process.env.BASE_URL;

export const updateUser = async (req, res) => {
  const userId = req.user.id;
  const {
    name,
    age,
    gender,
    bio,
    location,
  } = req.body;

  const newImagePath = req.file ? `user-images/${req.file.filename}` : undefined;

  try {
    // Fetch current user to get old image path
    const existingUser = await prisma.user.findUnique({ where: { id: userId } });

    // Delete old image if new one is uploaded and old exists
    if (newImagePath && existingUser.profileImage) {
      const relativePath = existingUser.profileImage.replace(BASE_URL, '');
      const oldImagePath = path.join(process.cwd(), relativePath);

      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error(`Failed to delete old profile image: ${err.message}`);
        }
      });
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        age: age ? parseInt(age) : undefined,
        gender,
        bio,
        location,
        ...(newImagePath && { profileImage: newImagePath }),
      },
    });

    res.status(200).json({
      message: 'User updated successfully',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        age: updatedUser.age,
        gender: updatedUser.gender,
        bio: updatedUser.bio,
        location: updatedUser.location,
        rating: updatedUser.rating,
        profileImage: updatedUser.profileImage
          ? `${BASE_URL}${updatedUser.profileImage}`
          : null,
        createdAt: updatedUser.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user', detail: error.message });
  }
};
