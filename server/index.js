import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

import { connectDB } from './config/database.js';
import carRoutes from './routes/car.js';
import authRoutes from './routes/auth.js';
import orderRoutes from "./routes/order.js";
import stripeRoutes from "./routes/stripe.js";
import discountRoutes from "./routes/discount.js";


import errorMiddleware from './middlewares/errorMiddleware.js';


dotenv.config({ path: './config/config.env' });

const app = express();

connectDB();

const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "https://car-rental2025.vercel.app",
  credentials: true
}));


// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/stripe', stripeRoutes);
app.use("/api/discount", discountRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  