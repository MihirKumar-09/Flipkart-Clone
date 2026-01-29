import express from "express";
const router = express.Router();
import isAuth from "../middlewares/isAuth.js";
import isAdmin from "../middlewares/isAdmin.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
// Admin check ;
router.get("/check-admin", isAuth, isAdmin, async (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
    },
  });
});
// Fetch all orders;
router.get("/orders", isAuth, isAdmin, async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 20, 1);

    const totalOrders = await Order.countDocuments();
    const totalPages = Math.ceil(totalOrders / limit);

    if (page > totalPages && totalOrders > 0) {
      return res.status(400).json({
        message: "Invalid page number",
        orders: [],
        totalPages,
        currentPage: page,
      });
    }

    const skip = (page - 1) * limit;

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username email");

    res.status(200).json({
      orders,
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
});

// Update order status;
router.patch("/orders/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }

    const oldStatus = order.status;
    const newStatus = status;

    console.log("OLD:", oldStatus, "NEW:", newStatus);

    // Restore stock after admin cancel;
    if (oldStatus !== "CANCELLED" && newStatus === "CANCELLED") {
      for (const item of order.items) {
        console.log("RESTORING STOCK:", item.product.toString(), item.quantity);

        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: item.quantity },
        });
      }
    }

    order.status = newStatus;
    await order.save();

    res.json(order);
    console.log("UPDATED ORDER ID:", req.params.id);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch out_of_deliver and deliver product;
router.get("/orders/delivery", isAuth, isAdmin, async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 20, 1);

    const totalOrders = await Order.countDocuments();
    const totalPages = Math.ceil(totalOrders / limit);

    if (page > totalPages && totalOrders > 0) {
      return res.status(400).json({
        message: "Invalid page number",
        orders: [],
        totalPages,
        currentPage: page,
      });
    }

    const skip = (page - 1) * limit;
    const orders = await Order.find({
      status: { $in: ["OUT_FOR_DELIVERY", "DELIVERED"] },
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username email");
    res.status(200).json({
      orders,
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch deliver products" });
  }
});

export default router;
