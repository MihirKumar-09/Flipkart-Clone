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
export default router;
