import express from 'express';
import { 
  registerUser, 
  loginUser, 
  getMe,
  getUsers,
  updateUserRole,
  getAllUsers
} from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', getMe);
router.get('/users', getUsers);
router.patch('/users/:id', updateUserRole);
router.get("/", getAllUsers);

export default router;