import style from "./Specification.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function Specification() {
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
  if (!product) return <h1>Loading...</h1>;

  return (
    <div className={style.Specification}>
      <div className={style.SpecificationHead}>
        <h3>Specifications</h3>
      </div>
      <div className={style.SpecificationBody}>
        <h5>Other Details</h5>
        <div className={style.SpecificationName}>
          <p>Name</p>
          <p>{product.name}</p>
        </div>
        <div className={style.SpecificationDescription}>
          <p>Description</p>
          <p>{product.description}</p>
        </div>
        <div className={style.Brand}>
          <p>Brand</p>
          <p>{product.brand}</p>
        </div>
        <div className={style.Highlights}>
          <p>Highlights</p>
          <p>{product.highlights?.[0]}</p>
        </div>
        <div className={style.Availability}>
          <p>Available</p>
          <p>{product.stock}</p>
        </div>
        <div className={style.Category}>
          <p>Category</p>
          <p>{product.category}</p>
        </div>
      </div>
    </div>
  );
}
