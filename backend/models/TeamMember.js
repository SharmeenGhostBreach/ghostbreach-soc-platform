import mongoose from 'mongoose';
import { baseTransform } from '../utils/jsonTransform.js';

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    role: {
      type: String,
      enum: ['Admin', 'Security Analyst', 'Developer', 'Viewer'],
      default: 'Viewer',
    },
    status: { type: String, enum: ['Active', 'Invited', 'Inactive'], default: 'Active' },
    avatar: { type: String, default: null },
    lastActive: { type: String, default: 'Never' }, // display text, e.g. "10 minutes ago"
  },
  {
    timestamps: true,
    toJSON: { transform: baseTransform },
  }
);

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);
export default TeamMember;

export {};
