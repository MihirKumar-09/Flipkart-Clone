import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import style from "./Payment.module.css";
import NavBar from "../../Components/Layout/AuthNavbar";
import PaymentOptions from "./PaymentOptions/Option";
import PriceDetails from "./PriceDetails/PriceDetails";
import PayNow from "./PayNow Button/PayNow";
import { clearCart } from "../../features/cart/cartSlice";

export default function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addressId = localStorage.getItem("selectedAddressId");

  const [paymentMethod, setPaymentMethod] = useState("ONLINE");
  const [isPaying, setIsPaying] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [checkoutType, setCheckoutType] = useState(null);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/api/auth/check", {
          withCredentials: true,
        });
      } catch {
        navigate("/login");
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("checkoutData"));
    if (!addressId) {
      navigate("/buy-now");
      return;
    }

    if (!stored || !stored.items || stored.items.length === 0) {
      navigate("/");
      return;
    }

    setCheckoutItems(stored.items);
    setCheckoutType(stored.type);
  }, [navigate, addressId]);

  const totalPrice = checkoutItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
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
          cartItems: checkoutItems,
          addressId,
          totalPrice,
          payment: paymentMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Order failed");

      if (checkoutType === "CART") {
        dispatch(clearCart());
      }

      localStorage.removeItem("checkoutData");

      navigate("/order-success", {
        replace: true,
        state: {
          orderId: data.order.orderId,
          paymentMethod: data.order.paymentMethod,
          totalAmount: data.order.totalPrice,
        },
      });
    } catch (err) {
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
          <PriceDetails items={checkoutItems} />
        </div>
      </div>
    </div>
  );
}
