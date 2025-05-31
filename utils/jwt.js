import jwt from 'jsonwebtoken';

// creates the token with a userid, email and name in the payload
export const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};
