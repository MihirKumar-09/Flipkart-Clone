import style from "./ProductDetails.module.css";
import { useState, useEffect, use } from "react";
import { useParams } from "react-router-dom";
export default function ProductTitle() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    const fetchProductDetails = async () => {
      try {
        const res = await fetch(
          `${process.env.VITE_BACKEND_URL}/api/products/${id}`,
        );
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.log("Failed to fetch product details", err);
      }
    };
    fetchProductDetails();
  }, [id]);
  const category = product?.category;
  if (!product) return <h1>Loading...</h1>;
  return (
    <div className={style.ProductDetails}>
      <h6>{product.name}</h6>
      <p className={style.rating}>{product.rating} &#9733;</p>
      <h4 className={style.price}>₹{product.price.toLocaleString("en-IN")}</h4>
      <p className={style.stock}>
        <i
          className={`${
            product.stock > 0
              ? "fa-solid fa-circle-check"
              : "fa-solid fa-circle-xmark"
          } ${style.icon}`}
        />

        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
      </p>

      <div className={style.highlights}>
        <p className={style.highlightsHead}>Highlights</p>
        <div className={style.highlightsList}>
          {product.highlights?.map((item, i) => (
            <div key={i} className={style.item}>
              <span className={style.bullet}>•</span>
              <span className={style.itemText}>{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={style.discription}>
        <p className={style.discriptionHead}>Discription</p>
        <p className={style.discriptionText}>{product.description}</p>
      </div>
    </div>
  );
}
