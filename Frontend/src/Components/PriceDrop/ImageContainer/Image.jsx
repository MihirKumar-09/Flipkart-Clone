import { useLocation, useNavigate } from "react-router-dom";
import style from "./style.module.css";
export default function ImageContainer() {
  const { state: product } = useLocation();
  const navigate = useNavigate();

  if (!product) {
    navigate("/");
    return null;
  }
  return (
    <div className={style.image}>
      <img src={product.image[0].url} alt={product.name} />
    </div>
  );
}
