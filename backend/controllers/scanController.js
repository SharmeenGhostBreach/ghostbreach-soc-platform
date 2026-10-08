import Scan from '../models/Scan.js';
import Asset from '../models/Asset.js';
import { isValidId, sendError } from '../utils/apiHelpers.js';
import { runScanSimulation } from '../utils/scanSimulator.js';

// GET /api/scans
export const getScans = async (req, res) => {
  try {
    const items = await Scan.find().sort({ createdAt: -1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    sendError(res, error);
  }
};

// GET /api/scans/:id
export const getScanById = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid ID format' });
    const item = await Scan.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Scan not found' });
    res.json({ success: true, data: item });
  } catch (error) {
    sendError(res, error);
  }
};

// POST /api/scans
// SAFE SIMULATION: the target must be the name of an asset registered in this system.
// The scan is created as "Queued" and the server then simulates progress in the background.
export const createScan = async (req, res) => {
  try {
    const { name, target, type } = req.body;
    if (!name || !target || !type) {
      return res.status(400).json({ success: false, message: 'Scan name, target asset and type are required' });
    }
    const asset = await Asset.findOne({ name: target }).select('_id');
    if (!asset) {
      return res.status(400).json({ success: false, message: 'Target must be a registered asset. Real targets are never scanned.' });
    }

    const item = await Scan.create({
      name,
      target,
      type,
      status: 'Queued',
      progress: 0,
      currentStep: 'Initialization queued...',
      duration: 'In progress',
    });
    runScanSimulation(item._id); // runs in the background (not awaited)
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    sendError(res, error);
  }
};

// PUT /api/scans/:id
export const updateScan = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid ID format' });
    const data = { ...req.body };
    delete data.id;
    delete data._id;
    const item = await Scan.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, message: 'Scan not found' });
    res.json({ success: true, data: item });
  } catch (error) {
    sendError(res, error);
  }
};

// DELETE /api/scans/:id
export const deleteScan = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid ID format' });
    const item = await Scan.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Scan not found' });
    res.json({ success: true, message: 'Scan deleted successfully' });
  } catch (error) {
    sendError(res, error);
  }
};

export {};
