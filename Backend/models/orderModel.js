import express from "express";
import Order from "../models/orderModel.js";

const router = express.Router();

// CREATE ORDER (mock payment)
router.post("/orders", async (req, res) => {
  try {
    const { orderId, transactionId, products, paymentMethod, totalAmount } =
      req.body;
    if (!orderId || !transactionId)
      return res.status(400).json({ message: "Missing order IDs" });

    if (!products || products.length === 0)
      return res.status(400).json({ message: "No products" });

    const order = new Order({
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
