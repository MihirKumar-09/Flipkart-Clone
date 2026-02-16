import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  createNewReview,
  deleteReview,
  getAllReview,
} from "../controllers/reviewController.js";
const router = express.Router();

// Fetch all review ;
router.get("/products/:productId/reviews", getAllReview);

// Create new review
router.post("/products/:productId/review", isAuth, createNewReview);

// Delete specific review;
router.delete("/products/:productId/reviews/:reviewId", isAuth, deleteReview);
export default router;
