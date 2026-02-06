import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import style from "./Payment.module.css";
import NavBar from "../../Components/Layout/AuthNavbar";
import PaymentOptions from "./PaymentOptions/Option";
import PriceDetails from "./PriceDetails/PriceDetails";
import PayNow from "./PayNow Button/PayNow";
import { clearCart } from "../../features/cart/cartSlice";

axios.defaults.withCredentials = true;

export default function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [checkoutType, setCheckoutType] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("ONLINE");
  const [isPaying, setIsPaying] = useState(false);

  const addressId = localStorage.getItem("selectedAddressId");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/auth/check");
        if (!res.data.user) throw new Error("Not logged in");
        setUser(res.data.user);
      } catch {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (!loading && user) {
      const stored = JSON.parse(localStorage.getItem("checkoutData"));

      if (!stored || !stored.items || stored.items.length === 0) {
        navigate("/");
        return;
      }

      if (!addressId) {
        navigate("/buy-now");
        return;
      }

      setCheckoutItems(stored.items);
      setCheckoutType(stored.type || null);
    }
  }, [loading, user, navigate, addressId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Redirecting to login...</div>;
  if (checkoutItems.length === 0) return <div>No items to checkout.</div>;

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
          payment: paymentMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Order failed");

      if (checkoutType === "CART") dispatch(clearCart());
      localStorage.removeItem("checkoutData");
      const firstOrder = data.orders[0];
      setTimeout(() => {
        setIsPaying(false);
        navigate("/order-success", {
          replace: true,
          state: {
            orderId: firstOrder.orderId,
            paymentMethod: firstOrder.paymentMethod,
            totalAmount: firstOrder.totalPrice,
          },
        });
      }, 3000);
    } catch (err) {
      setIsPaying(false);
      alert(err.message);
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
          <PayNow onPay={handlePay} isPaying={isPaying} />
        </div>
        <div className={style.rightSection}>
          <PriceDetails items={checkoutItems} />
        </div>
      </div>
    </div>
  );
}
