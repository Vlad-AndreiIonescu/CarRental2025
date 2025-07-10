import express from 'express';
import { 
  registerUser, 
  loginUser, 
  getMe,
  getUsers,
  updateUserRole 
} from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getMe);
router.get('/users', authMiddleware, getUsers);
router.patch('/users/:id', authMiddleware, updateUserRole);

export default router;