import express from "express";
import { createOrder, getOrderById, getMyOrders, getAllOrders } from "../controllers/orderController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import Order from "../models/order.js";

const router = express.Router();

router.post("/", createOrder);
router.get('/my-orders',authMiddleware, getMyOrders);
router.get('/:id', getOrderById);
router.get("/", getAllOrders); // adaugă această linie
router.patch("/:id/confirm", async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(req.params.id, { status: "paid" }, { new: true });
      res.json(order);
    } catch (err) {
      res.status(500).json({ error: "Eroare la confirmarea comenzii." });
    }
  });


export default router;
