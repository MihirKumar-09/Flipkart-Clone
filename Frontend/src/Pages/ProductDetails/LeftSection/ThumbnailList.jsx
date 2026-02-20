import style from "./ThumbnailList.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function ThumbnailList({ setSelectedImage }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  // New state for border highlight
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!id) return;
    const fetchProductDetails = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`,
        );
        const data = await res.json();
        setProduct(data);

        // Set default image;
        if (data.image && data.image.length > 0) {
          setSelectedImage(data.image[0].url);
          setActiveIndex(0);
        }
      } catch (err) {
        console.log("Failed to fetch product details", err);
      }
    };
    fetchProductDetails();
  }, [id]);
  if (!product) return <h1>Loading...</h1>;
  return (
    <div className={style.ThumbnailList}>
      {product.image?.map((image, i) => (
        <img
          src={image.url}
          alt=""
          key={image.url}
          onClick={() => {
            setSelectedImage(image.url);
            setActiveIndex(i);
          }}
          onMouseEnter={() => {
            setSelectedImage(image.url);
            setActiveIndex(i);
          }}
          className={activeIndex === i ? style.active : ""}
        />
      ))}
    </div>
  );
}
