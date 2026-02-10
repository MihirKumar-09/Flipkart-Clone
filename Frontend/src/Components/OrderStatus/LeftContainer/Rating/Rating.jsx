import style from "./Rating.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
import React from "react";

export default function Rating({ order, product, submitReview, userReview }) {
  const isReviewed = !!userReview;

  const [rating, setRating] = useState(userReview ? userReview.rating : 0);
  const [comment, setComment] = useState(userReview ? userReview.comment : "");
  const [showReviewsForm, setShowReviewsForm] = useState(false);
  const [error, setError] = useState("");

  if (order.status !== "DELIVERED") return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      setError("Review comment can't be empty");
      return;
    }
    setError("");

    try {
      await submitReview({
        productId: product._id,
        rating,
        comment,
      });

      toast.success("Review added successfully");
      setComment("");
      setRating(0);
      setShowReviewsForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={style.rating}>
      <h6>Rate your experience</h6>

      <div className={style.starContainer}>
        <div>
          <i className="fa-solid fa-bag-shopping"></i>
          <span> Rate the product</span>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className={style.star}>
            <fieldset className="starability-basic">
              <input
                type="radio"
                id="no-rate"
                className="input-no-rate"
                name={`review[rating]-${product._id}`}
                value="0"
                defaultChecked
                aria-label="No rating."
                disabled={isReviewed}
                onChange={() => {
                  if (!isReviewed) setShowReviewsForm(true);
                }}
              />

              {[1, 2, 3, 4, 5].map((star) => (
                <React.Fragment key={star}>
                  <input
                    type="radio"
                    id={`first-rate${star}-${product._id}`}
                    name={`review[rating]-${product._id}`}
                    value={star}
                    checked={rating === star}
                    disabled={isReviewed}
                    onChange={() => {
                      setRating(star);
                      if (!isReviewed) setShowReviewsForm(true);
                    }}
                  />
                  <label
                    htmlFor={`first-rate${star}-${product._id}`}
                    title={
                      star === 1
                        ? "Terrible"
                        : star === 2
                          ? "Not good"
                          : star === 3
                            ? "Average"
                            : star === 4
                              ? "Very good"
                              : "Amazing"
                    }
                  >
                    {star} star
                  </label>
                </React.Fragment>
              ))}
            </fieldset>

            {!isReviewed && showReviewsForm && (
              <>
                <textarea
                  name="review[comment]"
                  placeholder="Drop your review"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
                {error && <p className={style.error}>{error}</p>}
                <button type="submit">Submit</button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
