import style from "./Rating.module.css";
export default function Rating({ order }) {
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

            <div className={style.star}>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
