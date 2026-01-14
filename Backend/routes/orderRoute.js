import express from "express";
import isAuth from "../controllers/middleware.js";
import Order from "../models/orderModel.js";
const router = express.Router();

router.post("/place", isAuth, async (req, res) => {
  console.log("BODY:", req.body);

  const { cartItems, addressId, payment } = req.body;

  // Validate payload
  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  if (!addressId) {
    return res.status(400).json({ message: "Address is required" });
  }

  if (!payment) {
    return res.status(400).json({ message: "Payment method required" });
  }

  // Calculate total price
  let totalPrice = 0;
  cartItems.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  // Create order
  const orderItems = cartItems.map((item) => ({
    product: item._id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image?.[0]?.url || "", // ✅ STRING ONLY
  }));
  const newOrder = new Order({
    orderId: "ORD" + Date.now(),
    user: req.user._id,
    items: orderItems,
    addressId,
    totalPrice,
    paymentMethod: payment,
    status: "Pending",
  });

  await newOrder.save();

  res.status(201).json({
    message: "Order created successfully",
    orderId: newOrder.orderId,
    order: newOrder,
  });
});

export default router;
