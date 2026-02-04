import express from "express";
import isAuth from "../middlewares/isAuth.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

const router = express.Router();

router.post("/place", isAuth, async (req, res) => {
  console.log("BODY:", req.body);

  const { cartItems, addressId, payment } = req.body;

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  if (!addressId) {
    return res.status(400).json({ message: "Address is required" });
  }

  if (!payment) {
    return res.status(400).json({ message: "Payment method required" });
  }
  // Validate stock ;
  for (const item of cartItems) {
    const product = await Product.findById(item._id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    if (product.stock < item.quantity) {
      return res.status(400).json({
        message: `Only ${product.stock} items left for ${product.name}`,
      });
    }
  }

  // Reduce stock;
  for (const item of cartItems) {
    await Product.findByIdAndUpdate(item._id, {
      $inc: { stock: -item.quantity },
    });
  }

  // Calculate total price
  let totalPrice = 0;
  cartItems.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  // Ready order items;
  const orderItems = cartItems.map((item) => ({
    product: item._id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image?.[0]?.url || "",
  }));

  // Create order
  const newOrder = new Order({
    orderId: "ORD" + Date.now(),
    user: req.user._id,
    items: orderItems,
    addressId,
    totalPrice,
    paymentMethod: payment,
  });

  await newOrder.save();

  res.status(201).json({
    message: "Order created successfully",
    orderId: newOrder.orderId,
    order: newOrder,
  });
});

router.get("/my-orders", isAuth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// Fetch Specific Orders;
router.get("/:orderId", isAuth, async (req, res) => {
  try {
    const { orderId } = req.params; //get order id from URL;

    const order = await Order.findById(orderId)
      .populate("items.product", "name highlights price")
      .populate("user", "username email")
      .populate("addressId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Compare order user with (req.user._id) ;
    const orderUserId =
      typeof order.user === "object"
        ? order.user._id.toString()
        : order.user.toString();

    if (req.user.role !== "ADMIN" && orderUserId !== req.user._id.toString()) {
      return res.status(403).json({ message: "Something went wrong!" });
    }

    res.json(order);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
