// routes/discount.js
import express from "express";
import User from "../models/user.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

const availableCodes = {
  "WELCOME15": 15,
  "RENT10": 10,
  "SUMMER50": 50,
};

router.post("/apply", authMiddleware, async (req, res) => {
  const { code } = req.body;
  const userId = req.user.id;

  if (!code) return res.status(400).json({ error: "Codul este necesar" });

  const normalized = code.trim().toUpperCase();
  const discountValue = availableCodes[normalized];

  if (!discountValue) {
    return res.status(404).json({ error: "Codul nu este valid." });
  }

  const user = await User.findById(userId);

  // verifică dacă a fost deja folosit într-o comandă plătită
  if (user.usedDiscountCodes.includes(normalized)) {
    return res.status(400).json({ error: "Ai folosit deja acest cod." });
  }

  // ✅ NU mai salva aici codul în `usedDiscountCodes`!
  res.status(200).json({ success: true, value: discountValue });
});


export default router;
