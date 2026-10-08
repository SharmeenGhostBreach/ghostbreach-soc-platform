import Remediation from '../models/Remediation.js';
import { isValidId, resolveAssetId, sendError } from '../utils/apiHelpers.js';

// Clean the request body: drop ids, resolve the asset name, accept the old "vulnerabilityId" name
const prepareData = async (body) => {
  const data = { ...body };
  delete data.id;
  delete data._id;
  if ('asset' in data) data.asset = await resolveAssetId(data.asset);
  if (data.vulnerabilityId && isValidId(data.vulnerabilityId)) data.vulnerability = data.vulnerabilityId;
  delete data.vulnerabilityId;
  return data;
};

// GET /api/remediation
export const getRemediations = async (req, res) => {
  try {
    const items = await Remediation.find().populate('asset', 'name').sort({ createdAt: -1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    sendError(res, error);
  }
};

// GET /api/remediation/:id
export const getRemediationById = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid ID format' });
    const item = await Remediation.findById(req.params.id).populate('asset', 'name');
    if (!item) return res.status(404).json({ success: false, message: 'Remediation task not found' });
    res.json({ success: true, data: item });
  } catch (error) {
    sendError(res, error);
  }
};

// POST /api/remediation
export const createRemediation = async (req, res) => {
  try {
    const data = await prepareData(req.body);
    const item = await Remediation.create(data);
    await item.populate('asset', 'name');
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    sendError(res, error);
  }
};

// PUT /api/remediation/:id
export const updateRemediation = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid ID format' });
    const data = await prepareData(req.body);
    const item = await Remediation.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    }).populate('asset', 'name');
    if (!item) return res.status(404).json({ success: false, message: 'Remediation task not found' });
    res.json({ success: true, data: item });
  } catch (error) {
    sendError(res, error);
  }
};

// DELETE /api/remediation/:id
export const deleteRemediation = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid ID format' });
    const item = await Remediation.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Remediation task not found' });
    res.json({ success: true, message: 'Remediation task deleted successfully' });
  } catch (error) {
    sendError(res, error);
  }
};

export {};
