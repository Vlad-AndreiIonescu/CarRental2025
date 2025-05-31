import express from "express";
import { createOrder, getOrderById, getMyOrders } from "../controllers/orderController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import Order from "../models/order.js";

const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.get('/my-orders', authMiddleware, getMyOrders);
router.get('/:id', authMiddleware, getOrderById);
router.patch("/:id/confirm", async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(req.params.id, { status: "paid" }, { new: true });
      res.json(order);
    } catch (err) {
      res.status(500).json({ error: "Eroare la confirmarea comenzii." });
    }
  });


export default router;
