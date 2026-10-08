import 'dotenv/config'; // must be first so process.env is ready for every other import
import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import assetRoutes from './routes/assetRoutes.js';
import vulnerabilityRoutes from './routes/vulnerabilityRoutes.js';
import scanRoutes from './routes/scanRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import remediationRoutes from './routes/remediationRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import userRoutes from './routes/userRoutes.js';

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ---------- Global middleware ----------
app.use(express.json());
app.use(
  cors({
    // CLIENT_URL may hold several comma-separated origins, e.g. http://localhost:5173,http://localhost:5174
    origin: (process.env.CLIENT_URL || 'http://localhost:5173').split(',').map((o) => o.trim()),
    credentials: true,
  })
);

// ---------- Health check ----------
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'GhostBreach SOC API is running',
  });
});

// ---------- API routes ----------
app.use('/api/auth', authRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/vulnerabilities', vulnerabilityRoutes);
app.use('/api/scans', scanRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/remediation', remediationRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/users', userRoutes);

// ---------- Error handling (must be last) ----------
app.use(notFound);
app.use(errorHandler);

// ---------- Startup: connect to MongoDB first, then start Express ----------
const startServer = async () => {
  // JWT needs a real secret. A missing/placeholder value is only tolerated in development.
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.startsWith('your_') || secret.length < 16) {
    console.error('JWT_SECRET in backend/.env is missing, too short, or still a placeholder.');
    console.error('Generate one with:  node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"');
    process.exit(1);
  }

  await connectDB();

  app.listen(PORT, () => {
    console.log(`GhostBreach SOC API running on http://localhost:${PORT}`);
  });
};

startServer();
