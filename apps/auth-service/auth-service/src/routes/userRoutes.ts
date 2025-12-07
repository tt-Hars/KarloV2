import express from 'express';
import {
  authUser,
  authProvider,
  registerUser,
  logoutUser,
  getUserProfile,
  getInitialData,
  updateUserProfile,
  refresh,
} from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/auth', authUser);
router.post('/auth/provider', authProvider);
router.post('/logout', logoutUser);
router.post('/auth/refresh', refresh);
router
  .route('/profile')
  .get(protect, getInitialData)
  .put(protect, updateUserProfile);

// router.route('/').get()

export default router;