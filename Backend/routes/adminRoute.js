import express, { json } from "express";
const router = express.Router();
import isAuth from "../middlewares/isAuth.js";
import isAdmin from "../middlewares/isAdmin.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import { getRounds } from "bcrypt";

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
router.get("/orders/analytics", isAuth, isAdmin, async (req, res) => {
  try {
    // Total Orders;
    const totalOrders = await Order.countDocuments();

    // Cancel Orders;
    const cancelledOrders = await Order.countDocuments({
      status: "CANCELLED",
    });

    // Active orders;
    const activeOrders = await Order.countDocuments({
      status: { $in: ["PLACED", "SHIPPED"] },
    });

    // Total revenue (Only delivery orders);
    const revenueData = await Order.aggregate([
      { $match: { status: "DELIVERED" } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalRevenue =
      revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    // Total user;
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      totalOrders,
      totalRevenue,
      totalUsers,
      cancelledOrders,
      activeOrders,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch analytics data" });
  }
});

// Generate monthly revenue;
router.get(
  "/orders/analytics/monthly-revenue",
  isAuth,
  isAdmin,
  async (req, res) => {
    try {
      const revenue = await Order.aggregate([
        {
          $match: {
            status: "DELIVERED",
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            totalRevenue: { $sum: "$totalPrice" },
          },
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]);

      res.status(200).json(revenue);
    } catch (err) {
      console.error("Monthly revenue error:", err);
      res.status(500).json({ message: "Monthly revenue fetch failed" });
    }
  },
);

// Fetch top selling products;
router.get(
  "/orders/analytics/top-products",
  isAuth,
  isAdmin,
  async (req, res) => {
    try {
      const topProducts = await Order.aggregate([
        { $match: { items: { $exists: true, $ne: [] } } },
        { $unwind: "$items" },
        {
          $addFields: {
            "items.product": { $toObjectId: "$items.product" },
          },
        },
        {
          $group: {
            _id: "$items.product",
            totalSold: { $sum: "$items.quantity" },
            revenue: {
              $sum: { $multiply: ["$items.quantity", "$items.price"] },
            },
          },
        },
        { $sort: { totalSold: -1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        {
          $project: {
            _id: 0,
            productId: "$product._id",
            name: "$product.name",
            totalSold: 1,
            revenue: 1,
          },
        },
      ]);
      res.status(200).json(topProducts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);
export default router;
