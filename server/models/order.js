import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  pickupLocation: {
    type: String,
    required: true,
  },
  returnLocation: {
    type: String,
    required: true,
  } ,
  pickupDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
  extras: [
    {
      name: String,
      price: Number,
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'cancelled', 'refunded'],
    default: 'pending',
  },
  customerName: { type: String },
  sessionId: { type: String, required: true, unique: true },
  paymentIntentId: { type: String },
  refundMethod: {
    type: String,
    enum: ['money', 'credit'],
  },
  discountCode: { type: String }

}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
