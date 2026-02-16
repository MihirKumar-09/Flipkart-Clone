import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";

// ==========GET ALL ORDER=========
export const getAllOrder = async (req, res, next) => {
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

    const allowedStatuses = [
      "PLACED",
      "CONFIRMED",
      "SHIPPED",
      "OUT_FOR_DELIVERY",
      "DELIVERED",
      "CANCELLED",
    ];

    const orders = await Order.find({
      status: { $in: allowedStatuses },
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
    next(err);
  }
};

// =========UPDATE ORDER STATUS==========
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status: newStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }

    const oldStatus = order.status;

    console.log("OLD:", oldStatus, "NEW:", newStatus);

    if (oldStatus !== "CANCELLED" && newStatus === "CANCELLED") {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: item.quantity },
        });
      }
      if (!order.cancelledAt) {
        order.cancelledAt = new Date();
      }
    }

    if (oldStatus !== "CONFIRMED" && newStatus === "CONFIRMED") {
      if (!order.confirmedAt) order.confirmedAt = new Date();
    }

    if (oldStatus !== "SHIPPED" && newStatus === "SHIPPED") {
      if (!order.shippedAt) order.shippedAt = new Date();
    }

    if (oldStatus !== "OUT_FOR_DELIVERY" && newStatus === "OUT_FOR_DELIVERY") {
      if (!order.outForDeliveryAt) {
        order.outForDeliveryAt = new Date();
      }
    }

    if (oldStatus !== "DELIVERED" && newStatus === "DELIVERED") {
      if (!order.deliveredAt) order.deliveredAt = new Date();
    }
    if (oldStatus !== "RETURN_REQUESTED" && newStatus === "RETURN_REQUESTED") {
      if (!order.returnRequestedAt) {
        order.returnRequestedAt = new Date();
      }
    }
    if (oldStatus !== "RETURN_APPROVED" && newStatus === "RETURN_APPROVED") {
      if (!order.returnApprovedAt) {
        order.returnApprovedAt = new Date();
      }
    }
    if (newStatus === "RETURN_COMPLETED" && !order.returnCompleteAt) {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: item.quantity },
        });
      }
      order.returnCompleteAt = new Date();
    }
    if (
      oldStatus !== "RETURN_REQUEST_REJECTED" &&
      newStatus === "RETURN_REQUEST_REJECTED"
    ) {
      if (!order.returnRejectedAt) {
        order.returnRejectedAt = new Date();
      }
    }

    order.status = newStatus;
    await order.save();

    res.json(order);
  } catch (err) {
    next(err);
  }
};

// ======GET DELIVERY ORDERS=========
export const deliveryOrder = async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 20, 1);
    const filter = {
      status: { $in: ["OUT_FOR_DELIVERY", "DELIVERED"] },
    };
    const totalOrders = await Order.countDocuments(filter);
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
    next(err);
  }
};

// ========GET RETURN ORDERS===========
export const returnOrders = async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 20, 1);

    const RETURN_STATUSES = [
      "RETURN_REQUESTED",
      "RETURN_APPROVED",
      "RETURN_COMPLETED",
    ];

    const totalOrders = await Order.countDocuments({
      status: { $in: RETURN_STATUSES },
    });

    const totalPages = Math.ceil(totalOrders / limit);
    const skip = (page - 1) * limit;

    const orders = await Order.find({
      status: { $in: RETURN_STATUSES },
    })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username email");

    res.status(200).json({
      orders,
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    next(err);
  }
};

// ========GET ANALYTICS ORDERS=========
export const analyticsOrders = async (req, res, next) => {
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
    next(err);
  }
};

// =======MONTHLY REVENUE========
export const monthlyRevenue = async (req, res, next) => {
  try {
    const revenue = await Order.aggregate([
      {
        $match: {
          status: "DELIVERED",
          deliveredAt: { $exists: true },
        },
      },
      {
        $group: {
          _id: {
            year: {
              $year: {
                date: "$deliveredAt",
                timezone: "Asia/Kolkata",
              },
            },
            month: {
              $month: {
                date: "$deliveredAt",
                timezone: "Asia/Kolkata",
              },
            },
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
    next(err);
  }
};

// =========FETCH TOP SELLING PRODUCTS==========
export const topSelling = async (req, res, next) => {
  try {
    const pipeline = [
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.product",
          name: { $first: "$items.name" },
          totalSold: { $sum: "$items.quantity" },
          revenue: {
            $sum: { $multiply: ["$items.quantity", "$items.price"] },
          },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          name: 1,
          totalSold: 1,
          revenue: 1,
        },
      },
    ];

    const topProducts = await Order.aggregate(pipeline);

    res.status(200).json({
      success: true,
      data: topProducts,
    });
  } catch (error) {
    next(err);
  }
};

// =========FETCH LOW STOCK PRODUCTS=======
export const lowStock = async (req, res, next) => {
  try {
    const threshold = parseInt(req.query.threshold) || 5; // refer boundary and limitation alert;
    const products = await Product.find({ stock: { $lte: threshold } })
      .sort({ stock: 1 }) //lowest stock
      .select("name stock"); //products name and stock

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// =====FETCH PAYMENT METHOD=========
export const paymentMethod = async (req, res, next) => {
  try {
    const data = await Order.aggregate([
      {
        $match: {
          paymentMethod: { $in: ["COD", "ONLINE"] },
        },
      },
      {
        $group: {
          _id: "$paymentMethod",
          totalOrders: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          method: "$_id",
          totalOrders: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};
