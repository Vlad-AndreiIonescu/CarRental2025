import express from 'express';
import {
  getAllCars,
  getCarById,
  createCar,
  deleteCar,
  updateCar,
  addReviewToCar,
} from '../controllers/carController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getAllCars);
router.get('/:id', getCarById);
router.post('/',  createCar);
router.put('/:id',  updateCar);
router.patch('/:id',  updateCar);
router.delete('/:id', deleteCar);
router.post('/:id/reviews', authMiddleware, addReviewToCar);  

export default router;
