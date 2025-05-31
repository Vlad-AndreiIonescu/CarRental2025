
import Order from "../models/order.js";
import Car from "../models/car.js";
import createError from "../utils/createError.js";

export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
  
    const order = await Order.findById(id);
    if (!order) return next(createError("Order not found", 404));

    const car = await Car.findById(order.car);
    if (!car) return next(createError("Car not found for this order", 404));

    // Convertim orderul în obiect simplu și adăugăm mașina
    const orderData = order.toObject();
    orderData.car = car;

    res.status(200).json(orderData);
  } catch (err) {
    console.error("Eroare la obținerea comenzii:", err);
    next(createError("Eroare la obținerea comenzii", 500));
  }
};
export const createOrder = async (req, res, next) => {
  const { body } = req;

  try {
    if (!body) {
      return next(createError("Invalid request body", 400));
    }

    // Destructurare și validare minimală
    const { car, pickupLocation, pickupDate, returnDate, extras, totalPrice } = body;

    if (!car || !pickupLocation || !pickupDate || !returnDate || !totalPrice) {
      return next(createError("Missing required order fields", 400));
    }

    const newOrder = new Order({
        user: req.user.id,
        car, // direct string
        pickupLocation,
        pickupDate,
        returnDate,
        extras,
        totalPrice,
      });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Order creation error:", error); // Afișează eroarea reală în terminal
  return next(createError(error.message || "Error creating order", 500)); // Trimite mesajul exact
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("car") // dacă vrei și detalii despre mașină
      .sort({ createdAt: -1 }); // cele mai recente primele

    res.status(200).json({ orders });
  } catch (err) {
    console.error("Eroare la obținerea comenzilor:", err);
    next(createError("Eroare la obținerea comenzilor", 500));
  }
};
