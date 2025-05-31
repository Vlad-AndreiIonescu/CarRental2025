// routes/stripe.js
import express from "express";
import Stripe from "stripe";
import sendEmail from "../utils/sendEmail.js";
import { generateInvoicePdfBuffer } from "../utils/generateInvoice.js";
import { generateEmailHtml } from "../utils/emailTemplates.js";
import dotenv from "dotenv";
import Order from "../models/order.js";
import User from "../models/user.js";
import authMiddleware from "../middlewares/authMiddleware.js";


dotenv.config();
const router = express.Router();
const stripe = new Stripe("sk_test_51LBOA0DgKXMuc8tSYmBG4fMdft0o8yHbbDZZIE7wR01q7Li9KxY23rW6u68SDM9wsu7sAO1BQhK4IxtmwSJ7D6LV00Mdnp5DDQ");

// Creează o sesiune Stripe
router.post("/create-checkout-session", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      car,
      pickupLocation,
      pickupDate,
      returnDate,
      rentalDays,
      extras,
      remainingToPayAfterApplying,
      useCredit,
      creditUsed
    } = req.body;


    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Rezervare Mașină",
              description: useCredit
                ? `Se folosește store credit: €${creditUsed}`
                : undefined
            },
            unit_amount: Math.round(remainingToPayAfterApplying * 100), // Stripe cere valoare în cenți
          },
          quantity: 1,
        }
      ],
      success_url: `http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/payment-cancelled`,
      metadata: {
        userId,
        car,
        pickupLocation,
        pickupDate,
        returnDate,
        rentalDays,
        extras: JSON.stringify(extras),
        remainingToPayAfterApplying,
        useCredit: String(useCredit),
        creditUsed: String(creditUsed)
      }
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err.message);
    res.status(500).json({ error: "Stripe session failed." });
  }
});

// Confirmă/creează comanda o singură dată
router.get("/order-details", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id, {
      expand: ["customer_details"],
    });

    const paymentIntentId = session.payment_intent;

    const meta = session.metadata;

    // 1. Verificare dacă comanda există deja (anti-duplicat)
    const existingOrder = await Order.findOne({ sessionId: session.id }).populate("user car");
    if (existingOrder) {
      return res.status(200).json({ order: existingOrder });
    }

    // 2. Verificare dacă plata a fost finalizată
    if (session.payment_status !== "paid") {
      return res.status(400).json({ error: "Plata nu este confirmată." });
    }

    // 3. Nume client din datele Stripe introduse la checkout
    const stripeName = session.customer_details?.name || "Client Stripe";

    // 4. Creează comanda
    const order = await Order.create({
      sessionId: session.id,
      paymentIntentId,
      user: meta.userId,
      car: meta.car,
      pickupLocation: meta.pickupLocation,
      pickupDate: meta.pickupDate,
      returnDate: meta.returnDate,
      rentalDays: meta.rentalDays,
      extras: JSON.parse(meta.extras),
      totalPrice: meta.remainingToPayAfterApplying,
      customerName: stripeName, // nou adăugat
      status: "paid",
    });

    // 5. Returnează comanda populată complet
    const populated = await Order.findById(order._id).populate("user car");
    res.status(200).json({ order: populated });

    try {
      const user = await User.findById(meta.userId);
      if (user?.email) {
        const emailContent = generateEmailHtml(user, populated, meta);
        const invoiceBuffer = await generateInvoicePdfBuffer(populated, user);
    
        await sendEmail(user.email, "Rezervarea ta CarRentalPro", emailContent, [
          {
            filename: "Factura-CarRentalPro.pdf",
            content: invoiceBuffer,
          },
        ]);
      }
    } catch (emailErr) {
      console.warn("Trimitere email eșuată:", emailErr.message);
    }

  } catch (err) {
    console.error("Order fetch/create failed:", err.message);
    res.status(500).json({ error: "Eroare la obținerea comenzii." });
  }
});

router.post("/refund", authMiddleware, async (req, res) => {
  try {
    const { orderId, paymentIntentId, refundType } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: "Comanda nu a fost găsită" });

    if (order.status !== "paid") return res.status(400).json({ error: "Comanda nu este eligibilă pentru refund" });

    // Dacă e store credit
    if (refundType === "credit") {
      const user = await User.findById(order.user);
      if (!user) return res.status(404).json({ error: "Utilizatorul nu a fost găsit" });
    
      user.storeCredit += order.totalPrice;
      await user.save();
    
      order.status = "refunded";
      order.refundMethod = "credit";
      await order.save();
      return res.status(200).json({ message: "Refund efectuat ca store credit." });
    } else {
      const refund = await stripe.refunds.create({ payment_intent: paymentIntentId });
    
      order.status = "refunded";
      order.refundMethod = "money";
      await order.save();
      return res.status(200).json({ message: "Refund Stripe efectuat.", refund });
    }


  } catch (err) {
    console.error("Eroare la refund:", err.message);
    res.status(500).json({ error: "Refund eșuat" });
  }
});




export default router;
