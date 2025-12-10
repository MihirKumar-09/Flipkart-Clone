import style from "./Image.module.css";
import { useLocation, useNavigate } from "react-router-dom";
export default function Image() {
  const { state: product } = useLocation();

  return (
    <div className={style.imageContainer}>
      <img src={product.image[0].url} alt={product.name} />
    </div>
  );
}
