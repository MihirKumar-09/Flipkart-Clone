import Review from "../models/reviewModel.js";
import Product from "../models/productModel.js";

// ========GET ALL REVIEWS=======
export const getAllReview = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId }).populate(
      "user",
      "username",
    );

    res.json(reviews);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// =======CREATE NEW REVIEW=======
export const createNewReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const { productId } = req.params;

    // Validation;
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be 1 to 5" });
    }
    if (!comment || !comment.trim()) {
      return res.status(400).json({ message: "Comment is required" });
    }

    const product = await Product.findById(productId);
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
    next(err);
  }
};

// =======DELETE REVIEW=======
export const deleteReview = async (req, res, next) => {
  try {
    const { productId, reviewId } = req.params;
    const review = await Review.findOne({
      _id: reviewId,
      product: productId,
    });
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }
    await review.deleteOne();
    res.status(200).json({
      message: "Review delete successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
