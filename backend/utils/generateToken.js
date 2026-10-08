import jwt from 'jsonwebtoken';

// Creates a signed JWT containing only the user's id.
// The secret comes from backend/.env (JWT_SECRET) and never reaches the frontend.
const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

export default generateToken;
