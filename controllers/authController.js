import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../utils/jwt.js';

const BASE_URL = process.env.BASE_URL;
const prisma = new PrismaClient();

export const register = async (req, res) => {
  const { email, password, name, age, gender, bio, location } = req.body;
  
  const profileImagePath = req.file ? `user-images/${req.file.filename}` : null;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        age: parseInt(age),
        gender,
        bio,
        location,
        profileImage: profileImagePath
      }
    });

    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name
    });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        age: user.age,
        gender: user.gender,
        bio: user.bio,
        location: user.location,
        profileImage: user.profileImage
          ? `${BASE_URL}${user.profileImage}`
          : null,
        rating: user.rating,
        createdAt: user.createdAt,
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'Error registering user', detail: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = generateToken({
    id: user.id,
    email: user.email,
    name: user.name
  });
  
  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      age: user.age,
      gender: user.gender,
      bio: user.bio,
      location: user.location,
      rating: user.rating,
      profileImage: user.profileImage
        ?`${BASE_URL}${user.profileImage}`
        : null,
      createdAt: user.createdAt,
    },
  });
};
