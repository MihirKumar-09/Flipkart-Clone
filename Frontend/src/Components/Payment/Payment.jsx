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

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePay = () => {
    // HARD GUARDS (important)
    if (!paymentMethod) return;
    if (cartItems.length === 0) return;

    setIsPaying(true);

    setTimeout(() => {
      const orderData = {
        orderId: "ORD" + Date.now(),
        transactionId: "TXN" + Date.now(),
        items: cartItems,
        totalAmount: totalPrice,
        paymentMethod,
        status: "SUCCESS",
        createdAt: new Date().toISOString(),
      };

      dispatch(placeOrder(orderData)); // ✅ persist order
      dispatch(clearCart()); // ✅ clear cart

      setIsPaying(false);
      navigate("/order-success");
    }, 2000);
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
