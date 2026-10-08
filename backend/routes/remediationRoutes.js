import express from 'express';
import { getRemediations, getRemediationById, createRemediation, updateRemediation, deleteRemediation } from '../controllers/remediationController.js';

import { protect, canWrite } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // every route below requires a valid JWT

router.route('/').get(getRemediations).post(canWrite, createRemediation);
router.route('/:id').get(getRemediationById).put(canWrite, updateRemediation).delete(canWrite, deleteRemediation);

export default router;
