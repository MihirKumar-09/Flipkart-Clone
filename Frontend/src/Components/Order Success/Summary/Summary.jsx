import style from "./Summary.module.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import online from "../../../assets/Order Success/online.png";
import cod from "../../../assets/Order Success/cod.png";
export default function Summary() {
  const location = useLocation();
  const navigate = useNavigate();

  const { status, paymentMethod, transactionId } = location.state || {};
  return (
    <div className={style.Summary}>
      <h4>Summary</h4>
      <hr style={{ margin: "0px" }} />
      <div className={style.line}>
        <p>Payment Status:</p>
        <span className={style.success}>{status || "N/A"}</span>
      </div>
      <hr style={{ margin: "0px" }} />
      <div className={style.line}>
        <p>Payment Method:</p>
        <span>
          <img
            src={
              paymentMethod === "ONLINE"
                ? online
                : paymentMethod === "COD"
                ? cod
                : ""
            }
            alt="ONLINE"
            className={style.image}
          />
          {paymentMethod || "N/A"}
        </span>
      </div>
      <hr style={{ margin: "0px" }} />
      <div className={style.line}>
        <p>Transaction ID:</p>
        <span>{transactionId || "N/A"}</span>
      </div>
      <hr style={{ margin: "0px" }} />
      <button onClick={() => navigate("/")}>Continue Shopping</button>
    </div>
  );
}
