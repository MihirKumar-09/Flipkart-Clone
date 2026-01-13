import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import style from "./Payment.module.css";
import NavBar from "../../Components/Layout/AuthNavbar";
import PaymentOptions from "./PaymentOptions/Option";
import PriceDetails from "./PriceDetails/PriceDetails";
import PayNow from "./PayNow Button/PayNow";

export default function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const [paymentMethod, setPaymentMethod] = useState("ONLINE");
  const [isPaying, setIsPaying] = useState(false);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  // 🔥 FRONTEND-ONLY PAYMENT
  const handlePay = () => {
    setIsPaying(true);

    setTimeout(() => {
      navigate("/order-success", {
        replace: true,
        state: {
          orderId: "ORD" + Date.now(),
          paymentMethod,
          totalAmount: totalPrice,
        },
      });

      setIsPaying(false);
    }, 800);
  };

  return (
    <div>
      <NavBar />

      <div className={style.Payment}>
        <div className={style.leftSection}>
          <PaymentOptions
            payment={paymentMethod}
            setPayment={setPaymentMethod}
          />

          <PayNow
            isPaying={isPaying}
            onPay={handlePay}
            disabled={isPaying || cartItems.length === 0}
          />
        </div>

        <div className={style.rightSection}>
          <PriceDetails />
        </div>
      </div>
    </div>
  );
}
