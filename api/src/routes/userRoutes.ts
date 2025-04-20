import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  refreshToken,
} from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// router.post('/register1', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.post('/auth/refresh', refreshToken);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// router.route('/').get()

export default router;