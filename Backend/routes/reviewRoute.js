import express from "express";
import isAuth from "../middlewares/isAuth.js";
import Product from "../models/productModel.js";
import Review from "../models/reviewModel.js";

const router = express.Router();

// Fetch all review ;
router.get("/products/:id/reviews", async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.id }).populate(
      "user",
      "username",
    );

    res.json(reviews);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
});

router.post("/products/:id/review", isAuth, async (req, res) => {
  try {
    const { rating, comment } = req.body;

    // Validation;
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be 1 to 5" });
    }
    if (!comment || !comment.trim()) {
      return res.status(400).json({ message: "Comment is required" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // If review already given;
    const alreadyReviewed = await Review.findOne({
      product: product._id,
      user: req.user._id,
    });
    if (alreadyReviewed) {
      return res.status(400).json({ message: " Product already reviewed" });
    }

    const review = await Review.create({
      product: product._id,
      user: req.user._id,
      rating,
      comment: comment.trim(),
    });

    // update rating breakdown;
    product.ratingBreakdown[rating] += 1;

    // Update num reviews;
    product.numReviews += 1;

    // Update average rating;
    product.rating =
      (product.rating * (product.numReviews - 1) + rating) / product.numReviews;

    await product.save();

    res.status(201).json({
      message: "Review added successfully",
      review,
    });
  } catch (err) {
    console.error("REview route error", err);
    res.status(500).json({ message: "Internal server error" });
  }
});
export default router;
