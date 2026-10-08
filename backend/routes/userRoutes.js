import express from 'express';
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/').get(adminOnly, getUsers);
// getUserById / updateUser allow "Admin, or the user themself" (checked inside the controller)
router.route('/:id').get(getUserById).put(updateUser).delete(adminOnly, deleteUser);

export default router;
