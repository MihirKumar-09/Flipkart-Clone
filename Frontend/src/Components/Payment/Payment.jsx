import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import style from "./Payment.module.css";
import NavBar from "../../Components/Layout/AuthNavbar";
import PaymentOptions from "./PaymentOptions/Option";
import PriceDetails from "./PriceDetails/PriceDetails";
import PayNow from "./PayNow Button/PayNow";
import { clearCart } from "../../features/cart/cartSlice";

export default function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const addressId = localStorage.getItem("selectedAddressId");

  const [paymentMethod, setPaymentMethod] = useState("ONLINE");
  const [isPaying, setIsPaying] = useState(false);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handlePay = async () => {
    try {
      setIsPaying(true);

      const res = await fetch("http://localhost:8080/order/place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          cartItems,
          addressId,
          totalPrice,
          payment: paymentMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Order failed");

      dispatch(clearCart());

      navigate("/order-success", {
        replace: true,
        state: {
          orderId: data.order.orderId,
          paymentMethod: data.order.paymentMethod, // ✅ FIX
          totalAmount: data.order.totalPrice,
        },
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setIsPaying(false);
    }
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
          <PayNow onPay={handlePay} disabled={isPaying} />
        </div>
        <div className={style.rightSection}>
          <PriceDetails />
        </div>
      </div>
    </div>
  );
}
