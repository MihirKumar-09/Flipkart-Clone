import Alert from "../models/alertModel.js";
import Product from "../models/productModel.js";

export const createAlert = async (req, res, next) => {
  try {
    const { productId, email, type, targetPrice } = req.body;

    const errors = {};
    if (!productId) errors.productId = "Product ID is required";
    if (!email) errors.email = "Email is required";
    if (!type) errors.type = "Alert type is required";

    if (type === "price" && !targetPrice) {
      errors.targetPrice = "Target price is required for price alert";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    // check product exist;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Prevent duplicate alerts;
    const existingAlert = await Alert.findOne({
      productId,
      email,
      type,
      targetPrice: type === "price" ? targetPrice : null,
      notified: false,
    });
    if (existingAlert) {
      return res.status(400).json({
        message: "You have already set this alert",
      });
    }

    // Create new alert;
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
