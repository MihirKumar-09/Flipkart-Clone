import style from "./ProductDetails.module.css";
// Left
import ProductImageContainer from "./LeftSection/ProductImagesContainer.jsx";
// Right
import RightParent from "./RightSection/RightParent.jsx";

// Similar Product
import SimilarProduct from "./SimilarProducts/SimilarProduct.jsx";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  console.log("Rendered with id:", id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
        );
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.log("Faild to fetch the product", err);
      }
    };
    fetchProduct();
  }, [id]);
  if (!product) return <h1>Loading...</h1>;
  return (
    <div className={style.ProductDetails}>
      <div className={style.ProductOverview}>
        <div className={style.leftSide}>
          <ProductImageContainer product={product} />
        </div>
        <div className={style.rightSide}>
          <RightParent product={product} />
        </div>
      </div>
      <SimilarProduct />
    </div>
  );
}
