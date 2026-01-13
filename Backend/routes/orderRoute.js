import express from "express";
import mongoose from "mongoose";
import Order from "../models/orderModel.js";

const router = express.Router();

router.post("/orders", async (req, res) => {
  try {
    const {
      userId,
      orderId,
      transactionId,
      products,
      paymentMethod,
      totalAmount,
    } = req.body;

    // Extra safety
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid userId format - must be valid MongoDB ObjectId",
      });
    }

    if (!products?.length) {
      return res.status(400).json({ message: "No products in order" });
    }

    const order = new Order({
      user: userId, // Mongoose khud ObjectId mein cast karega
      orderId,
      transactionId,
      products,
      paymentMethod,
      paymentStatus: "Paid",
      totalAmount,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Order save error:", err);
    res.status(500).json({
      message: "Order not saved",
      error: err.message,
    });
  }
});

export default router;
