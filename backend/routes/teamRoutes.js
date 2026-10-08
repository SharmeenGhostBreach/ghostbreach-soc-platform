import express from 'express';
import { getTeamMembers, getTeamMemberById, createTeamMember, updateTeamMember, deleteTeamMember } from '../controllers/teamController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // signed-in users can view the team; only Admins can change it

router.route('/').get(getTeamMembers).post(adminOnly, createTeamMember);
router.route('/:id').get(getTeamMemberById).put(adminOnly, updateTeamMember).delete(adminOnly, deleteTeamMember);

export default router;
