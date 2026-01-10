import express from "express";
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

    if (!userId) return res.status(400).json({ message: "User ID missing" });
    if (!products || products.length === 0)
      return res.status(400).json({ message: "No products" });

    const order = new Order({
      user: userId,
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
    console.error(err);
    res.status(500).json({ message: "Order not saved" });
  }
});

export default router;
