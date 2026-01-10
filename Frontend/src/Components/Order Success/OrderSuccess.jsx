import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import style from "./OrderSuccess.module.css";
import Success from "./Success/Success";
import Summary from "./Summary/Summary";

export default function OrderSuccess() {
  const order = useSelector((state) => state.order.currentOrder);

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={style.orderSuccess}>
      <div className={style.leftSection}>
        <Success />
      </div>
      <div className={style.rightSection}>
        <Summary />
      </div>
    </div>
  );
}
