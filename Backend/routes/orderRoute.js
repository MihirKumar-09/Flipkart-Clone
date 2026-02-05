import express from "express";
import isAuth from "../middlewares/isAuth.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import PDFDocument from "pdfkit";

const router = express.Router();

router.post("/place", isAuth, async (req, res) => {
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

  // Validate stock
  for (const item of cartItems) {
    if (!item.quantity || item.quantity <= 0) {
      return res.status(400).json({
        message: `Invalid quantity for ${item.name}`,
      });
    }

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

  // Reduce stock
  for (const item of cartItems) {
    await Product.findByIdAndUpdate(item._id, {
      $inc: { stock: -item.quantity },
    });
  }

  // Calculate price
  let itemsPrice = 0;
  cartItems.forEach((item) => {
    itemsPrice += item.price * item.quantity;
  });

  const platformFee = 7;
  const totalPrice = itemsPrice + platformFee;

  // Order items
  const orderItems = cartItems.map((item) => ({
    product: item._id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image?.[0]?.url || "",
  }));

  const newOrder = new Order({
    orderId: "ORD" + Date.now(),
    user: req.user._id,
    items: orderItems,
    addressId,
    itemsPrice,
    platformFee,
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
    const { orderId } = req.params;

    const order = await Order.findById(orderId)
      .populate("items.product", "name highlights price")
      .populate("user", "username email")
      .populate("addressId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const orderUserId =
      typeof order.user === "object"
        ? order.user._id.toString()
        : order.user.toString();

    if (req.user.role !== "ADMIN" && orderUserId !== req.user._id.toString()) {
      return res.status(403).json({ message: "Something went wrong!" });
    }

    const itemsPrice = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const platformFee = 7;
    const totalPrice = itemsPrice + platformFee;

    res.json({
      ...order.toObject(),
      itemsPrice,
      platformFee,
      totalPrice,
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:orderId/invoice", isAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate("user")
      .populate("addressId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Headers FIRST
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Invoice-${order.orderId}.pdf`,
    );

    const doc = new PDFDocument({ margin: 50 });

    doc.pipe(res);

    doc.fontSize(20).text("INVOICE", { align: "center" });
    doc.moveDown();

    doc.fontSize(12);
    doc.text(`Order ID: ${order.orderId}`);
    doc.text(`Order Date: ${order.createdAt.toDateString()}`);
    doc.moveDown();

    doc.text(`Customer: ${order.addressId.name}`);
    doc.text(`Address: ${order.addressId.address}`);
    doc.moveDown();

    doc.text("Items:");
    doc.moveDown(0.5);

    order.items.forEach((item, i) => {
      doc.text(`${i + 1}. ${item.name}  x${item.quantity}  ₹${item.price}`);
    });
    const platformFee = 7;
    const totalPrice = order.totalPrice + platformFee;
    doc.moveDown();
    doc.text(`Total Amount: ₹${totalPrice.toLocaleString("en-IN")}`);
    doc.font("Helvetica");

    doc.end();
  } catch (err) {
    console.error("Invoice error:", err);
    res.status(500).end();
  }
});

export default router;
