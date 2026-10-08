import express from 'express';
import { getScans, getScanById, createScan, updateScan, deleteScan } from '../controllers/scanController.js';

import { protect, canWrite } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // every route below requires a valid JWT

router.route('/').get(getScans).post(canWrite, createScan);
router.route('/:id').get(getScanById).put(canWrite, updateScan).delete(canWrite, deleteScan);

export default router;
