import Product from "../models/productModel.js";
import Alert from "../models/alertModel.js";

// Back in stock alert;
export const createAlert = async (req, res, next) => {
  try {
    let { productId, email, type, targetPrice } = req.body;

    const errors = {};

    // Normalize email
    if (email) {
      email = email.toLowerCase().trim();
    }

    // Validation
    if (!productId) errors.productId = "Product ID is required";

    if (!email) {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = "Invalid email format";
      }
    }

    if (!type) errors.type = "Alert type is required";

    if (type === "price" && !targetPrice) {
      errors.targetPrice = "Target price is required for price alert";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const query = {
      productId,
      email,
      type,
      notified: false,
    };

    if (type === "price") {
      query.targetPrice = targetPrice;
    }

    const existingAlert = await Alert.findOne(query);

    if (existingAlert) {
      return res.status(400).json({
        message: "You have already set this alert",
      });
    }

    const newAlert = new Alert({
      productId,
      email,
      type,
      targetPrice: type === "price" ? targetPrice : null,
    });

    await newAlert.save();

    res.status(201).json({
      message: "Alert created successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const priceDrop = async (req, res, next) => {
  try {
    const { productId, targetPrice, email } = req.body;

    if (!productId || !targetPrice || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (Number(targetPrice) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid target price",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const existingAlert = await Alert.findOne({
      productId,
      email,
      type: "price",
      notified: false,
    });

    if (existingAlert) {
      return res.status(400).json({
        success: false,
        message: "You already have an active price alert",
      });
    }

    await Alert.create({
      productId,
      email,
      type: "price",
      targetPrice: Number(targetPrice),
      notified: false,
    });

    return res.status(201).json({
      success: true,
      message: "Price alert created successfully",
    });
  } catch (err) {
    next(err);
  }
};
