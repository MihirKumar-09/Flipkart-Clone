import { useEffect, useState } from "react";
import style from "./Reviews.module.css";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";

export default function Reviews() {
  const { user: currentUser } = useAuth();
  const { id: productId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [breakdown, setBreakdown] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });

  // Fetch all reviews;
  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/products/${productId}/reviews`,
        );
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();

        setReviews(data);

        // Calculate numReviews
        const total = data.length;
        setNumReviews(total);

        // Calculate average
        const avg =
          total === 0 ? 0 : data.reduce((sum, r) => sum + r.rating, 0) / total;
        setAverage(avg);

        // Calculate breakdown
        const bd = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        data.forEach((r) => {
          bd[r.rating] = (bd[r.rating] || 0) + 1;
        });
        setBreakdown(bd);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllReviews();
  }, [productId]);

  // Delete review;
  const deleteReview = async (reviewId) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/products/${productId}/reviews/${reviewId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      if (!res.ok) {
        throw new Error("Delete failed");
      }
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      setOpenMenuId(null);
    } catch (err) {
      console.log(err);
    }
  };

  if (reviews.length === 0) return <p></p>;
  return (
    <div className={style.ratingContainer}>
      <div className={style.ratingSummary}>
        <h3>Rating & Reviews</h3>

        <div className={style.averageRating}>
          <span>{average.toFixed(1)}</span>
          <i className="fa-solid fa-star"></i>
          <span>({numReviews} reviews)</span>
        </div>

        <div className={style.breakdown}>
          {Object.keys(breakdown)
            .sort((a, b) => b - a)
            .map((rate) => (
              <div key={rate} className={style.breakRow}>
                <span>
                  {rate} <i className="fa-solid fa-star"></i>
                </span>
                <div className={style.barContainer}>
                  <div
                    className={style.bar}
                    style={{
                      width: `${(breakdown[rate] / (numReviews || 1)) * 100}%`,
                      backgroundColor:
                        Number(rate) >= 3
                          ? "#388e3c"
                          : Number(rate) === 2
                            ? "#ff9800"
                            : Number(rate) === 1
                              ? "#d32f2f"
                              : "",
                    }}
                  ></div>
                </div>
                <span>{breakdown[rate]}</span>
              </div>
            ))}
        </div>
      </div>

      <div className={style.allReviews}>
        {reviews.length === 0 && <p>No reviews yet.</p>}
        {reviews.map((r) => {
          const isOwner =
            currentUser && r.user && currentUser._id === r.user._id;

          return (
            <div key={r._id} className={style.reviewCard}>
              <div className={style.topRow}>
                <span className={style.starContainer}>
                  <span
                    className={`${style.ratingBadge} ${
                      r.rating >= 3
                        ? style.good
                        : r.rating <= 2
                          ? style.bad
                          : style.avg
                    }`}
                  >
                    {r.rating} <i className="fa-solid fa-star"></i>
                  </span>

                  {isOwner && (
                    <div className={style.ratingWrapper}>
                      <span
                        className={style.ratingEdit}
                        onClick={() =>
                          setOpenMenuId(openMenuId === r._id ? null : r._id)
                        }
                      >
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </span>

                      {openMenuId === r._id && (
                        <div className={style.ratingMenu}>
                          <p
                            className={style.menuDelete}
                            onClick={() => deleteReview(r._id)}
                          >
                            <span>Remove</span>
                            <span>
                              <i className="fa-regular fa-trash-can"></i>
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </span>
              </div>

              <p className={style.comment}>{r.comment}</p>

              <span className={style.username}>
                {r.user?.username
                  ? r.user.username.charAt(0).toUpperCase() +
                    r.user.username.slice(1)
                  : "Anonymous"}
                <i className="fa-solid fa-circle-check"></i>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
