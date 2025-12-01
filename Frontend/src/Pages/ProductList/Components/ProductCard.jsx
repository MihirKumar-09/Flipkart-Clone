import style from "./ProductCard.module.css";
export default function ProductCard({
  image,
  name,
  description,
  price,
  rating,
  stock,
}) {
  return (
    <div className={style.card}>
      <img src={image} alt={name} />

      <h5 className={style.title}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h5>

      <p className={style.description}>{description}</p>

      <div className={style.priceRating}>
        <p className={style.price}>₹{price.toLocaleString("en-IN")}</p>
        <p className={style.rating}>★ {rating}</p>
      </div>

      <p
        className={style.stock}
        style={{ color: stock > 0 ? "#27ae60" : "#e74c3c" }}
      >
        {stock > 0 ? `${stock} in stock` : "Out of stock"}
      </p>
    </div>
  );
}
