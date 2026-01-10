import style from "./Summary.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import online from "../../../assets/Order Success/online.png";
import cod from "../../../assets/Order Success/cod.png";

export default function Summary() {
  const navigate = useNavigate();
  const order = useSelector((state) => state.order.currentOrder);

  if (!order) {
    return null; // OrderSuccess page is already locked
  }

  return (
    <div className={style.Summary}>
      <h4>Summary</h4>
      <hr />

      <div className={style.line}>
        <p>Payment Status:</p>
        <span className={style.success}>{order.status}</span>
      </div>

      <hr />

      <div className={style.line}>
        <p>Payment Method:</p>
        <span>
          <img
            src={order.paymentMethod === "ONLINE" ? online : cod}
            alt={order.paymentMethod}
            className={style.image}
          />
          {order.paymentMethod}
        </span>
      </div>

      <hr />

      <div className={style.line}>
        <p>Transaction ID:</p>
        <span>{order.transactionId}</span>
      </div>

      <hr />

      <button onClick={() => navigate("/")}>Continue Shopping</button>
    </div>
  );
}
