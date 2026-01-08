import { useLocation, Navigate } from "react-router-dom";
import style from "./OrderSuccess.module.css";
import Success from "./Success/Success";
import Summary from "./Summary/Summary";
export default function OrderSuccess() {
  const location = useLocation();
  const state = location.state;

  // Lock
  if (!state) {
    return <Navigate to="/" replace />;
  }
  return (
    <div>
      <div className={style.orderSuccess}>
        <div className={style.leftSection}>
          <Success />
        </div>
        <div className={style.rightSection}>
          <Summary />
        </div>
      </div>
    </div>
  );
}
