import style from "./ProductCard.module.css";

export default function ProductCard({
  image,
  title,
  price,
  rating,
  stock,
  noBorder,
}) {
  return (
    <div className={`${style.card} ${noBorder ? style.noBorder : ""}`}>
      <img src={image} alt={title} className={style.productImg} />

      <h5 className={style.title}>{title}</h5>

      <div className={style.priceRow}>
        <span className={style.price}>₹{price.toLocaleString("en-IN")}</span>
        <span className={style.rating}>★ {rating}</span>
      </div>

      <p className={style.stock}>{stock} in stock</p>
    </div>
  );
}
