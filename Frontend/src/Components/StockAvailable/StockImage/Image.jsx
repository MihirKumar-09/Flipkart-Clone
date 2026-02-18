import style from "./Image.module.css";
import { useLocation } from "react-router-dom";
export default function Image({ product }) {
  return (
    <div className={style.imageContainer}>
      <img src={product.image[0].url} alt={product.name} />
    </div>
  );
}
