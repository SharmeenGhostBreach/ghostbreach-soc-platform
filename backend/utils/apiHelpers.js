import Asset from '../models/Asset.js';

// A MongoDB ObjectId is exactly 24 hex characters
export const isValidId = (id) => /^[0-9a-fA-F]{24}$/.test(String(id));

// Create an Error that carries an HTTP status code
export const httpError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

// One place that turns any error into a clean JSON response
export const sendError = (res, error) => {
  // Mongoose validation (required field missing, value not in enum, ...)
  if (error.name === 'ValidationError') {
    const message = Object.values(error.errors).map((e) => e.message).join('. ');
    return res.status(400).json({ success: false, message });
  }
  // Bad value type, e.g. a malformed ObjectId
  if (error.name === 'CastError') {
    return res.status(400).json({ success: false, message: `Invalid value for "${error.path}"` });
  }
  // Duplicate unique field (e.g. email already used)
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue || error.keyPattern || {})[0] || (String(error.message).match(/index: (\w+?)_\d/) || [])[1] || 'value';
    return res.status(409).json({ success: false, message: `A record with this ${field} already exists` });
  }
  // Errors we threw ourselves with httpError()
  if (error.statusCode) {
    return res.status(error.statusCode).json({ success: false, message: error.message });
  }
  console.error(error); // unexpected: log details on the server only
  return res.status(500).json({ success: false, message: 'Server error' });
};

// The frontend sends the asset NAME (e.g. "Client API"); the database stores an ObjectId.
// Accepts a name or an id and returns the Asset's _id.
//   undefined -> field not sent, leave unchanged
//   null / "" -> clear the asset
export const resolveAssetId = async (value) => {
  if (value === undefined) return undefined;
  if (value === null || value === '') return null;
  if (typeof value !== 'string') throw httpError(400, 'Asset must be an asset name or id');

  const asset = isValidId(value)
    ? await Asset.findById(value).select('_id')
    : await Asset.findOne({ name: value }).select('_id');

  if (!asset) throw httpError(400, `Asset "${value}" was not found`);
  return asset._id;
};

// ---------- Validation helpers ----------
export const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(String(email || ''));

// At least 8 characters, with at least one letter and one number.
// Returns an error message, or null when the password is acceptable.
export const passwordProblem = (password) => {
  const value = String(password || '');
  if (value.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) return 'Password must contain at least one letter and one number';
  return null;
};
