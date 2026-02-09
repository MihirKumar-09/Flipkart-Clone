import style from "./Rating.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
export default function Rating({ order, product, submitReview }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  if (order.status !== "DELIVERED") return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      setError("Review comment is can't be empty");
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
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {order.status === "DELIVERED" && (
        <div className={style.rating}>
          <h6>Rate your experience</h6>

          <div className={style.starContainer}>
            <div>
              <i className="fa-solid fa-bag-shopping"></i>
              <span> Rate the product</span>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className={style.star}>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  id="rating"
                  name="review[rating]"
                  className="form-range"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
                <fieldset class="starability-basic">
                  <input
                    type="radio"
                    id="no-rate"
                    className="input-no-rate"
                    name="rating"
                    value="0"
                    defaultChecked
                    aria-label="No rating."
                  />
                  <input
                    type="radio"
                    id="first-rate1"
                    name="rating"
                    value="1"
                  />
                  <label for="first-rate1" title="Terrible">
                    1 star
                  </label>
                  <input
                    type="radio"
                    id="first-rate2"
                    name="rating"
                    value="2"
                  />
                  <label for="first-rate2" title="Not good">
                    2 stars
                  </label>
                  <input
                    type="radio"
                    id="first-rate3"
                    name="rating"
                    value="3"
                  />
                  <label for="first-rate3" title="Average">
                    3 stars
                  </label>
                  <input
                    type="radio"
                    id="first-rate4"
                    name="rating"
                    value="4"
                  />
                  <label for="first-rate4" title="Very good">
                    4 stars
                  </label>
                  <input
                    type="radio"
                    id="first-rate5"
                    name="rating"
                    value="5"
                  />
                  <label for="first-rate5" title="Amazing">
                    5 stars
                  </label>
                </fieldset>

                <textarea
                  name="review[comment]"
                  id="comment"
                  placeholder="Drop your review"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
                {error && <p className={style.error}>{error}</p>}
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
