import User from '../models/User.js';
import { isValidId, sendError, isValidEmail, passwordProblem } from '../utils/apiHelpers.js';

// The password field is never returned: it is select:false in the model and removed in toJSON.

const isSelfOrAdmin = (req) => req.user.role === 'Admin' || String(req.user._id) === req.params.id;

// GET /api/users   (Admin only - see routes)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    sendError(res, error);
  }
};

// GET /api/users/:id   (Admin, or the user themself)
export const getUserById = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid ID format' });
    if (!isSelfOrAdmin(req)) return res.status(403).json({ success: false, message: 'Access denied.' });
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user });
  } catch (error) {
    sendError(res, error);
  }
};

// PUT /api/users/:id   (Admin, or the user themself)
// Uses find + save() (not findByIdAndUpdate) so a new password is hashed by the model's pre-save hook.
// Only an Admin may change a role.
export const updateUser = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid ID format' });
    if (!isSelfOrAdmin(req)) return res.status(403).json({ success: false, message: 'Access denied.' });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (req.body.email && !isValidEmail(req.body.email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
    }
    if (req.body.password) {
      const problem = passwordProblem(req.body.password);
      if (problem) return res.status(400).json({ success: false, message: problem });
    }
    if (req.body.role !== undefined && req.body.role !== user.role && req.user.role !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Only an Admin can change roles.' });
    }

    const allowed = ['name', 'email', 'role', 'organization', 'avatar', 'password'];
    allowed.forEach((field) => {
      if (req.body[field] !== undefined && req.body[field] !== '') user[field] = req.body[field];
    });

    await user.save();
    res.json({ success: true, data: user });
  } catch (error) {
    sendError(res, error);
  }
};

// DELETE /api/users/:id   (Admin only - see routes). Admins cannot delete their own account.
export const deleteUser = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid ID format' });
    if (String(req.user._id) === req.params.id) {
      return res.status(400).json({ success: false, message: 'You cannot delete your own account.' });
    }
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    await user.deleteOne();
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    sendError(res, error);
  }
};
