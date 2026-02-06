import style from "./Summary.module.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function Summary() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // lock direct access
  if (!state) return null;

  const { orderId, paymentMethod, totalAmount } = state || {};
  if (!orderId || !paymentMethod || !totalAmount) {
    return <p>Invalid order summary</p>;
  }

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
          {paymentMethod === "ONLINE" ? (
            <i class="fa-solid fa-landmark"></i>
          ) : (
            <i class="fa-solid fa-money-bills"></i>
          )}
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
        <span>₹{totalAmount.toLocaleString("en-IN")}</span>
      </div>

      <hr />

      <button onClick={() => navigate("/my-orders")}>Track Order</button>
    </div>
  );
}
