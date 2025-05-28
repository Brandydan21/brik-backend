// controllers/authController.js
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../utils/jwt.js';

const prisma = new PrismaClient();

export const register = async (req, res) => {
  const { email, password, name, age } = req.body;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, passwordHash, name, age },
  });

  const token = generateToken(user.id);
  res.status(201).json({ token, user: { id: user.id, email, name, age } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = generateToken(user.id);
  res.json({ token, user: { id: user.id, email, name: user.name, age: user.age } });
};
