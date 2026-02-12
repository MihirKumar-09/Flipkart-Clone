import style from "./Specification.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function ProductDiscription() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    const fetchProductDetails = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.log("Failed to fetch product details", err);
        setProduct(null);
      }
    };
    fetchProductDetails();
  }, [id]);
  if (!product) return <h1>Loading...</h1>;

  return (
    <div className={style.Specification}>
      <div className={style.SpecificationHead}>
        <h3>Product Discription</h3>
      </div>
      <div className={style.SpecificationBody}>
        <h5 style={{ margin: "0px" }}>{product.description}</h5>
      </div>
    </div>
  );
}
