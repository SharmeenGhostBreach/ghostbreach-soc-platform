import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { baseTransform } from '../utils/jsonTransform.js';

const userSchema = new mongoose.Schema(
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
    // select:false -> the password is never returned by queries unless explicitly requested
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['Admin', 'Security Analyst', 'Developer', 'Viewer'],
      default: 'Viewer',
    },
    organization: { type: String, default: 'GhostBreach Cyber Ops', trim: true }, // shown on Profile page
    avatar: { type: String, default: null },
  },
  {
    timestamps: true, // createdAt, updatedAt
    toJSON: {
      transform: (doc, ret) => {
        baseTransform(doc, ret);
        delete ret.password; // never send the hash to the frontend
        return ret;
      },
    },
  }
);

// Hash the password with bcrypt before saving (only when it is new or changed)
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare a plain-text password with the stored hash (used by login later).
// The user must be loaded with: User.findOne({ email }).select('+password')
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;

export {};
