import mongoose from 'mongoose';
import { baseTransform } from '../utils/jsonTransform.js';

const scanSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Scan name is required'], trim: true },
    target: { type: String, required: [true, 'Scan target is required'], trim: true }, // asset name
    type: {
      type: String,
      enum: ['Web Application', 'API', 'Network', 'WordPress', 'Vulnerability Assessment'],
      required: [true, 'Scan type is required'],
    },
    // "Queued" is what the current frontend scan engine uses; "Pending" is kept from the spec
    status: {
      type: String,
      enum: ['Queued', 'Pending', 'Running', 'Completed', 'Failed'],
      default: 'Queued',
    },
    progress: { type: Number, min: 0, max: 100, default: 0 },
    currentStep: { type: String, default: '' },
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date, default: null },
    duration: { type: String, default: '' }, // display text, e.g. "45s"
    findings: { type: Number, default: 0 }, // total number of findings
    // breakdown used by the Scan details modal
    findingsCount: {
      critical: { type: Number, default: 0 },
      high: { type: Number, default: 0 },
      medium: { type: Number, default: 0 },
      low: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        baseTransform(doc, ret);
        ret.started = ret.startedAt; // field names used by the original UI
        ret.completed = ret.completedAt;
        return ret;
      },
    },
  }
);

// NOTE: scans are SIMULATED records only. Nothing here touches a real target.
const Scan = mongoose.model('Scan', scanSchema);
export default Scan;

export {};
