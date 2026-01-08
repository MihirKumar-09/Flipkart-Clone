import style from "./Success.module.css";
import Lottie from "lottie-react";
import done from "../../../assets/Order Success/done.json";
import box from "../../../assets/Order Success/box.json";
import { useNavigate } from "react-router-dom";
export default function Success() {
  const navigation = useNavigate();
  return (
    <div className={style.orderSuccess}>
      <Lottie animationData={done} loop={false} className={style.done} />

      <h4>Order Successfully Placed!</h4>
      <p>
        Thank you fro your purchase! Your order has been successfully placed and
      </p>
      <p>
        is being processed. A confirmation email has been sent to you with a
      </p>
      <p>order details.</p>
      <Lottie animationData={box} loop={true} className={style.box} />
      <button
        onClick={() => navigation("/")}
        className={style.continueShopping}
      >
        Continue Shopping
      </button>
    </div>
  );
}
