import style from "./Payment.module.css";
import NavBar from "../../Components/Layout/AuthNavbar";
import PaymentOptions from "./PaymentOptions/Option";
import PriceDetails from "./PriceDetails/PriceDetails";
import PayNow from "./PayNow Button/PayNow";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("ONLINE");
  const [isPaying, setIsPaying] = useState(false);
  const navigate = useNavigate();

  const handlePay = () => {
    setIsPaying(true);

    setTimeout(() => {
      setIsPaying(false);
      navigate("/order-success", {
        state: {
          paymentMethod,
          status: "SUCCESS",
          transactionId: "TXN" + Date.now(),
        },
      });
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
          <PayNow isPaying={isPaying} onPay={handlePay} />
        </div>
        <div className={style.rightSection}>
          <PriceDetails />
        </div>
      </div>
    </div>
  );
}
