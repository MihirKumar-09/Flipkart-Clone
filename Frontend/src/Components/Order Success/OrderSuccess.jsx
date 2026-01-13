import { useLocation, Navigate } from "react-router-dom";
import style from "./OrderSuccess.module.css";
import Success from "./Success/Success";
import Summary from "./Summary/Summary";

export default function OrderSuccess() {
  const { state } = useLocation();

  // ❌ direct access / refresh protection
  if (!state) {
    return <Navigate to="/" replace />;
  }

  const { orderId, paymentMethod, totalAmount } = state;

  return (
    <div className={style.orderSuccess}>
      <div className={style.leftSection}>
        <Success orderId={orderId} />
      </div>

      <div className={style.rightSection}>
        <Summary
          orderId={orderId}
          paymentMethod={paymentMethod}
          totalAmount={totalAmount}
        />
      </div>
    </div>
  );
}
