import style from "./Details.module.css";
import { useNavigate, useLocation } from "react-router-dom";
export default function Details() {
  const navigate = useNavigate();
  const { state: product } = useLocation();
  return (
    <div className={style.detailsContainer}>
      <h3>{product.name}</h3>
      <p className={style.price}>
        Current Price : &#x20B9;{product.price.toLocaleString("en-IN")}
      </p>
      <div className={style.setprice}>
        <p>Target Price:</p>
        <input type="numer" placeholder="Enter the price" />
      </div>
      <div className={style.autoBuy}>
        <label className={style.checkContainer}>
          <input type="checkbox" />
          <span className={style.checkmark}></span>
          <p>Auto-Buy at Target Price</p>
        </label>
      </div>
    </div>
  );
}
