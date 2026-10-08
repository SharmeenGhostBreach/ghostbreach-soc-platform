import express from 'express';
import { getReports, getReportById, createReport, updateReport, deleteReport } from '../controllers/reportController.js';

import { protect, canWrite } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // every route below requires a valid JWT

router.route('/').get(getReports).post(canWrite, createReport);
router.route('/:id').get(getReportById).put(canWrite, updateReport).delete(canWrite, deleteReport);

export default router;
