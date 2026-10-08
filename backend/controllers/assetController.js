import Asset from '../models/Asset.js';
import Vulnerability from '../models/Vulnerability.js';
import Remediation from '../models/Remediation.js';
import { isValidId, sendError } from '../utils/apiHelpers.js';

// GET /api/assets
export const getAssets = async (req, res) => {
  try {
    const assets = await Asset.find().sort({ createdAt: -1 });
    res.json({ success: true, count: assets.length, data: assets });
  } catch (error) {
    sendError(res, error);
  }
};

// GET /api/assets/:id
export const getAssetById = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid ID format' });
    const asset = await Asset.findById(req.params.id);
    if (!asset) return res.status(404).json({ success: false, message: 'Asset not found' });
    res.json({ success: true, data: asset });
  } catch (error) {
    sendError(res, error);
  }
};

// POST /api/assets
export const createAsset = async (req, res) => {
  try {
    const data = { ...req.body };
    delete data.id;
    delete data._id;
    const asset = await Asset.create(data);
    res.status(201).json({ success: true, data: asset });
  } catch (error) {
    sendError(res, error);
  }
};

// PUT /api/assets/:id
export const updateAsset = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid ID format' });
    const data = { ...req.body };
    delete data.id;
    delete data._id;
    const asset = await Asset.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!asset) return res.status(404).json({ success: false, message: 'Asset not found' });
    res.json({ success: true, data: asset });
  } catch (error) {
    sendError(res, error);
  }
};

// DELETE /api/assets/:id
export const deleteAsset = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid ID format' });
    const asset = await Asset.findByIdAndDelete(req.params.id);
    if (!asset) return res.status(404).json({ success: false, message: 'Asset not found' });

    // Findings/tasks that pointed to this asset are kept, but no longer linked to it
    await Vulnerability.updateMany({ asset: asset._id }, { asset: null });
    await Remediation.updateMany({ asset: asset._id }, { asset: null });

    res.json({ success: true, message: 'Asset deleted successfully' });
  } catch (error) {
    sendError(res, error);
  }
};

export {};
