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
  const user = useSelector((state) => state.auth.user);
  if (!user) {
    alert("User not logged in");
    return null;
  }
  // ⬆️ MUST exist (logged-in user)

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePay = async () => {
    if (!paymentMethod || cartItems.length === 0) return;

    setIsPaying(true);

    try {
      const response = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          orderId: "ORD" + Date.now(),
          transactionId: "TXN" + Date.now(),
          products: cartItems.map((item) => ({
            product: item._id,
            quantity: item.quantity,
            price: item.price,
          })),
          paymentMethod,
          totalAmount: totalPrice,
        }),
      });

      if (!response.ok) {
        throw new Error("Order failed");
      }

      const savedOrder = await response.json();

      dispatch(placeOrder(savedOrder));
      dispatch(clearCart());

      navigate("/order-success");
    } catch (err) {
      console.error(err);
      alert("Payment failed");
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
            disabled={!paymentMethod || cartItems.length === 0}
          />
        </div>

        <div className={style.rightSection}>
          <PriceDetails />
        </div>
      </div>
    </div>
  );
}
