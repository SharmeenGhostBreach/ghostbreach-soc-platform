import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// protect: the request must carry "Authorization: Bearer <token>".
// On success the logged-in user is available as req.user.
export const protect = async (req, res, next) => {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication required. Please sign in.' });
  }

  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Account no longer exists. Please sign in again.' });
    }
    req.user = user;
    next();
  } catch (error) {
    // Expired, tampered or malformed token
    return res.status(401).json({ success: false, message: 'Session expired or invalid. Please sign in again.' });
  }
};

// authorize('Admin', 'Security Analyst'): only these roles may continue.
export const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: 'Access denied. Your role does not allow this action.' });
  }
  next();
};

// Roles that may create / edit / delete SOC data. "Viewer" is read-only.
export const canWrite = authorize('Admin', 'Security Analyst', 'Developer');
export const adminOnly = authorize('Admin');
