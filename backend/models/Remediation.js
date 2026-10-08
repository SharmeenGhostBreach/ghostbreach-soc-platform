import mongoose from 'mongoose';
import { baseTransform, flattenAsset, toShortDate } from '../utils/jsonTransform.js';

const remediationSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true },
    description: { type: String, default: '', trim: true },
    // Relationships (both optional)
    asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset' },
    vulnerability: { type: mongoose.Schema.Types.ObjectId, ref: 'Vulnerability' },
    severity: {
      type: String,
      enum: ['Critical', 'High', 'Medium', 'Low', 'Informational'],
      required: [true, 'Severity is required'],
    },
    // The UI assigns tasks to a role/team label ("Security Analyst", "Developer"), so this is text
    assignedTo: { type: String, default: '', trim: true },
    status: { type: String, enum: ['Open', 'In Progress', 'Resolved'], default: 'Open' },
    dueDate: { type: Date },
    notes: { type: String, default: '', trim: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        baseTransform(doc, ret);
        flattenAsset(ret); // asset -> asset name for the UI
        ret.dueDate = toShortDate(ret.dueDate); // "2026-10-05", same as the frontend creates
        return ret;
      },
    },
  }
);

const Remediation = mongoose.model('Remediation', remediationSchema);
export default Remediation;

export {};
