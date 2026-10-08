import TeamMember from '../models/TeamMember.js';
import { isValidId, sendError } from '../utils/apiHelpers.js';

// GET /api/team
export const getTeamMembers = async (req, res) => {
  try {
    const items = await TeamMember.find().sort({ createdAt: -1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    sendError(res, error);
  }
};

// GET /api/team/:id
export const getTeamMemberById = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid ID format' });
    const item = await TeamMember.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Team member not found' });
    res.json({ success: true, data: item });
  } catch (error) {
    sendError(res, error);
  }
};

// POST /api/team
export const createTeamMember = async (req, res) => {
  try {
    const data = { ...req.body };
    delete data.id;
    delete data._id;
    const item = await TeamMember.create(data);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    sendError(res, error);
  }
};

// PUT /api/team/:id
export const updateTeamMember = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid ID format' });
    const data = { ...req.body };
    delete data.id;
    delete data._id;
    const item = await TeamMember.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, message: 'Team member not found' });
    res.json({ success: true, data: item });
  } catch (error) {
    sendError(res, error);
  }
};

// DELETE /api/team/:id
export const deleteTeamMember = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid ID format' });
    const item = await TeamMember.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Team member not found' });
    res.json({ success: true, message: 'Team member deleted successfully' });
  } catch (error) {
    sendError(res, error);
  }
};

export {};
