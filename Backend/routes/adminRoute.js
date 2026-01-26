import express from "express";
const router = express.Router();
import isAuth from "../middlewares/middleware.js";
import isAdmin from "../middlewares/isAdmin.js";
import Order from "../models/orderModel.js";
router.get("/orders", isAuth, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "username email");
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
});
// Update order status;
router.patch("/admin/orders/:id", async (req, res) => {
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;
