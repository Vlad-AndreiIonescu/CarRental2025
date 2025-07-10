// routes/stats.js
import express from "express";
import { getCarStats } from "../controllers/statsController.js";
import { getAllUsers } from "../controllers/authController.js";


const router = express.Router();
router.get("/cars", getCarStats);
router.get("/users", getAllUsers);

export default router;
