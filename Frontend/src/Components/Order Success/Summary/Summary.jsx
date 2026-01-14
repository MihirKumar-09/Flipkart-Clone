import style from "./Summary.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import online from "../../../assets/Order Success/online.png";
import cod from "../../../assets/Order Success/cod.png";

export default function Summary() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // lock direct access
  if (!state) return null;

  const { orderId, paymentMethod, totalAmount } = state;

  return (
    <div className={style.Summary}>
      <h4>Summary</h4>
      <hr />

      <div className={style.line}>
        <p>Payment Status:</p>
        <span className={style.success}>SUCCESS</span>
      </div>

      <hr />

      <div className={style.line}>
        <p>Payment Method:</p>
        <span>
          <img
            src={paymentMethod === "ONLINE" ? online : cod}
            alt={paymentMethod}
            className={style.image}
          />
          {paymentMethod}
        </span>
      </div>

      <hr />

      <div className={style.line}>
        <p>Order ID:</p>
        <span>{orderId}</span>
      </div>

      <hr />

      <div className={style.line}>
        <p>Total Paid:</p>
        <span>₹{totalAmount}</span>
      </div>

      <hr />

      <button onClick={() => navigate("/")}>Continue Shopping</button>
    </div>
  );
}
