import mongoose from 'mongoose';
import { baseTransform } from '../utils/jsonTransform.js';

const assetSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Asset name is required'], trim: true },
    type: {
      type: String,
      enum: ['Web Application', 'API', 'WordPress', 'Network', 'Cloud'],
      required: [true, 'Asset type is required'],
    },
    url: { type: String, required: [true, 'Asset URL / host is required'], trim: true },
    status: { type: String, enum: ['Active', 'Monitoring', 'Inactive'], default: 'Active' },
    securityScore: { type: Number, min: 0, max: 100, default: 85 },
    lastScan: { type: Date, default: null }, // null = never scanned
    owner: { type: String, default: '', trim: true }, // team name, e.g. "Security Team"
    description: { type: String, default: '', trim: true },
  },
  {
    timestamps: true,
    toJSON: { transform: baseTransform },
  }
);

const Asset = mongoose.model('Asset', assetSchema);
export default Asset;

export {};
