import express from 'express';
import { getAssets, getAssetById, createAsset, updateAsset, deleteAsset } from '../controllers/assetController.js';

import { protect, canWrite } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // every route below requires a valid JWT

router.route('/').get(getAssets).post(canWrite, createAsset);
router.route('/:id').get(getAssetById).put(canWrite, updateAsset).delete(canWrite, deleteAsset);

export default router;
