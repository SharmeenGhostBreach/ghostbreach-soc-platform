import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import { sendError, isValidEmail, passwordProblem } from '../utils/apiHelpers.js';

// POST /api/auth/register
// Self-registered users are always "Viewer" (the role is NOT taken from the request).
// The password is hashed by the User model's pre-save hook (bcryptjs).
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
    }
    const problem = passwordProblem(password);
    if (problem) return res.status(400).json({ success: false, message: problem });

    if (await User.findOne({ email: String(email).toLowerCase() })) {
      return res.status(409).json({ success: false, message: 'A user with this email already exists' });
    }

    const user = await User.create({ name, email, password, role: 'Viewer' });
    res.status(201).json({ success: true, token: generateToken(user._id), data: user });
  } catch (error) {
    sendError(res, error);
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: String(email).toLowerCase() }).select('+password');
    // Same message for "no such user" and "wrong password" so emails can't be probed
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.json({ success: true, token: generateToken(user._id), data: user });
  } catch (error) {
    sendError(res, error);
  }
};

// GET /api/auth/me   (protected: req.user is set by the protect middleware)
export const getMe = async (req, res) => {
  res.json({ success: true, data: req.user });
};
