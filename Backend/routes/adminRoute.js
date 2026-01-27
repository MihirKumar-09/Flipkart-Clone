import express from "express";
const router = express.Router();
import isAuth from "../middlewares/middleware.js";
import isAdmin from "../middlewares/isAdmin.js";
import Order from "../models/orderModel.js";
router.get("/orders", isAuth, isAdmin, async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);

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
router.patch("/orders/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true },
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }
    res.json(order);
    console.log("UPDATING ORDER ID:", req.params.id);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;
