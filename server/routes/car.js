import express from "express";
import {
  getAllCars,
  getCarById,
  createCar,
  deleteCar,
  updateCar,
  addReviewToCar,
} from "../controllers/carController.js";
import authMiddleware from '../middlewares/authMiddleware.js';


const router = express.Router();

router.get("/", getAllCars);
router.get("/:id", getCarById);
router.post("/", authMiddleware, createCar);
router.put("/:id", authMiddleware, updateCar);
router.patch("/:id",authMiddleware, updateCar);
router.delete("/:id", authMiddleware, deleteCar);
router.post("/:id/reviews", addReviewToCar);

export default router;
