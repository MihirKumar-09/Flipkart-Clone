import { useEffect } from "react";
import style from "./Total.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function TotalMoney() {
  const navigate = useNavigate();
  const buyNowProduct = useSelector((state) => state.buyNow.product);

  useEffect(() => {
    if (!buyNowProduct) {
      navigate("/", { replace: true });
    }
  }, [buyNowProduct, navigate]);

  if (!buyNowProduct) return null;

  const price = buyNowProduct.price;
  const platformFee = 7;
  const totalAmount = price + platformFee;

  return (
    <div className={style.totalPrice}>
      <h2>PRICE DETAILS</h2>
      <hr />

      <div className={style.line}>
        <p>Price (1 item)</p>
        <p>₹{price.toLocaleString("en-IN")}</p>
      </div>

      <div className={style.line}>
        <p>Platform Fee</p>
        <p>₹{platformFee}</p>
      </div>

      <hr />

      <div className={style.totalLine}>
        <h3>Total Amount</h3>
        <h3>₹{totalAmount.toLocaleString("en-IN")}</h3>
      </div>
    </div>
  );
}
