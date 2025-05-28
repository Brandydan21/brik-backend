// This util is used to generate our JWT Token for authorization

import jwt from 'jsonwebtoken';

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};