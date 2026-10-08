import Report from '../models/Report.js';
import { isValidId, sendError } from '../utils/apiHelpers.js';

// GET /api/reports
export const getReports = async (req, res) => {
  try {
    const items = await Report.find().sort({ createdAt: -1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    sendError(res, error);
  }
};

// GET /api/reports/:id
export const getReportById = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid ID format' });
    const item = await Report.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Report not found' });
    res.json({ success: true, data: item });
  } catch (error) {
    sendError(res, error);
  }
};

// POST /api/reports
export const createReport = async (req, res) => {
  try {
    const data = { ...req.body };
    delete data.id;
    delete data._id;
    const item = await Report.create(data);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    sendError(res, error);
  }
};

// PUT /api/reports/:id
export const updateReport = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid ID format' });
    const data = { ...req.body };
    delete data.id;
    delete data._id;
    const item = await Report.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, message: 'Report not found' });
    res.json({ success: true, data: item });
  } catch (error) {
    sendError(res, error);
  }
};

// DELETE /api/reports/:id
export const deleteReport = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid ID format' });
    const item = await Report.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Report not found' });
    res.json({ success: true, message: 'Report deleted successfully' });
  } catch (error) {
    sendError(res, error);
  }
};

export {};
