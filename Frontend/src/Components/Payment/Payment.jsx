import style from "./Payment.module.css";
import NavBar from "../../Components/Layout/AuthNavbar";
import PaymentOptions from "./PaymentOptions/Option";
import PriceDetails from "./PriceDetails/PriceDetails";
import PayNow from "./PayNow Button/PayNow";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../features/cart/cartSlice";
import { placeOrder } from "../../features/order/orderSlice";

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("ONLINE");
  const [isPaying, setIsPaying] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // 🔹 Read user immediately at top-level (not inside useEffect)
  const user = (() => {
    try {
      const u = localStorage.getItem("user");
      if (u) return JSON.parse(u);
      return null;
    } catch (e) {
      return null;
    }
  })();

  // 🔹 If user not found, redirect immediately
  if (!user || !user._id) {
    navigate("/login"); // ✅ safe now because read is sync
    return null; // prevent render
  }

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const handlePay = async () => {
    if (!user || !user._id) return;
    if (!paymentMethod || cartItems.length === 0) return;

    setIsPaying(true);
    try {
      const payload = {
        userId: user._id,
        orderId: "ORD" + Date.now(),
        transactionId: "TXN" + Date.now(),
        products: cartItems.map((item) => ({
          product: item._id,
          quantity: Number(item.quantity),
          price: Number(item.price),
        })),
        paymentMethod,
        totalAmount: totalPrice,
      };

      const response = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errMsg = await response.json();
        throw new Error(errMsg?.message || "Order failed");
      }

      const savedOrder = await response.json();
      dispatch(placeOrder(savedOrder));
      dispatch(clearCart());
      navigate("/order-success");
    } catch (err) {
      console.error(err);
      alert("Payment failed: " + err.message);
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
          <PayNow
            isPaying={isPaying}
            onPay={handlePay}
            disabled={
              !paymentMethod || cartItems.length === 0 || !user || !user._id
            }
          />
        </div>
        <div className={style.rightSection}>
          <PriceDetails />
        </div>
      </div>
    </div>
  );
}
