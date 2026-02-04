import style from "./Rating.module.css";
export default function Rating() {
  return (
    <div className={style.rating}>
      <h6>Rate your experience </h6>
      <div className={style.starContainer}>
        <div>
          <i class="fa-solid fa-bag-shopping"></i>
          <span>Rate the product</span>
        </div>
        <div className={style.star}>Star</div>
      </div>
    </div>
  );
}
