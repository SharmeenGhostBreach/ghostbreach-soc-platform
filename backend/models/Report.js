import mongoose from 'mongoose';
import { baseTransform, toLongDate } from '../utils/jsonTransform.js';

const reportSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Report name is required'], trim: true },
    client: { type: String, default: 'Demo Client', trim: true },
    target: { type: String, required: [true, 'Report target is required'], trim: true },
    assessmentType: {
      type: String,
      enum: ['Web Application', 'API', 'Network', 'WordPress', 'Vulnerability Assessment'],
      required: [true, 'Assessment type is required'],
    },
    riskLevel: {
      type: String,
      enum: ['Critical', 'High', 'Medium', 'Low'],
      required: [true, 'Risk level is required'],
    },
    status: { type: String, enum: ['Draft', 'Completed'], default: 'Completed' },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        baseTransform(doc, ret);
        ret.title = ret.name; // the Reports page displays `title`
        ret.type = ret.assessmentType; // ...and `type`
        ret.createdDate = toLongDate(ret.createdAt); // e.g. "September 25, 2026"
        return ret;
      },
    },
  }
);

const Report = mongoose.model('Report', reportSchema);
export default Report;

export {};
