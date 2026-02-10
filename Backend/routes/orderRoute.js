import express from "express";
import isAuth from "../middlewares/isAuth.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import PDFDocument from "pdfkit";
import Review from "../models/reviewModel.js";

const router = express.Router();

// Order place;
router.post("/place", isAuth, async (req, res) => {
  try {
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

    for (const item of cartItems) {
      if (!item.quantity || item.quantity <= 0) {
        return res.status(400).json({
          message: `Invalid quantity for ${item.name}`,
        });
      }

      const product = await Product.findById(item._id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Only ${product.stock} items left for ${product.name}`,
        });
      }
    }

    for (const item of cartItems) {
      await Product.findByIdAndUpdate(item._id, {
        $inc: { stock: -item.quantity },
      });
    }

    const createdOrders = [];

    for (const item of cartItems) {
      const itemsPrice = item.price * item.quantity;
      const platformFee = 7;
      const totalPrice = itemsPrice + platformFee;

      const order = new Order({
        orderId: "ORD" + Date.now() + Math.floor(Math.random() * 1000),
        user: req.user._id,
        items: [
          {
            product: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image?.[0]?.url || "",
          },
        ],
        addressId,
        itemsPrice,
        platformFee,
        totalPrice,
        paymentMethod: payment,
        status: "PLACED",
      });

      await order.save();
      createdOrders.push(order);
    }

    res.status(201).json({
      message: "Orders created successfully",
      orders: createdOrders,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
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

    // Fetch user reviews for this orders;
    const productIds = order.items.map((item) => item.product._id);
    const userReviews = await Review.find({
      product: { $in: productIds },
      user: req.user._id,
    });

    const reviewMap = {};
    userReviews.forEach((r) => {
      reviewMap[r.product.toString()] = r;
    });

    const itemsPrice = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const platformFee = 7;
    const totalPrice = itemsPrice + platformFee;

    // Attach user review for each item;
    const itemWithReview = order.items.map((item) => ({
      ...item.toObject(),
      userReviews: reviewMap[item.product._id.toString()] || null,
    }));

    res.json({
      ...order.toObject(),
      items: itemWithReview,
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

// User can cancel the order;
router.patch("/:orderId/cancel", isAuth, async (req, res) => {
  try {
    // Find order
    const order = await Order.findById(req.params.orderId);
    // If order not exist;
    if (!order) return res.status(404).json({ message: "Order not found" });

    // If already cancel;
    if (order.status === "CANCELLED") {
      return res.status(400).json({ message: "Order already cancelled" });
    }

    // Not cancel after delivery;
    if (order.status === "DELIVERED") {
      return res
        .status(400)
        .json({ message: "Delivery product can not be cancelled" });
    }

    // Restore stock;
    const bulkOps = order.items.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { stock: item.quantity } },
      },
    }));

    await Product.bulkWrite(bulkOps);

    // Cancel order;
    order.status = "CANCELLED";
    order.cancelledAt = new Date();

    await order.save();
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to cancel the order !" });
  }
});

// User return the order;
router.patch("/:orderId/return", isAuth, async (req, res) => {
  try {
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({ message: "Return reason is required" });
    }

    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status !== "DELIVERED") {
      return res.status(400).json({ message: "Return not allowed" });
    }

    order.status = "RETURN_REQUESTED";
    order.returnReason = reason;
    order.returnRequestedAt = new Date();

    await order.save();
    res.json(order);
    console.log("RETURN REASON:", req.body.reason);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Return request failed" });
  }
});

// user cancel the return request;
router.patch("/:orderId/cancel-return", isAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }

    if (order.status !== "RETURN_REQUESTED") {
      return res
        .status(400)
        .json({ message: "Return not requested for this order" });
    }
    order.status = "DELIVERED";
    order.returnReason = undefined;
    order.returnRequestedAt = undefined;

    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to cancel return" });
  }
});

export default router;
