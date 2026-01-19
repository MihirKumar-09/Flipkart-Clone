import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import style from "./BuyNow.module.css";
import Address from "./Address/Address";
import TotalCost from "./TotalMoney/TotalMoney";

export default function BuyNow() {
  const navigate = useNavigate();
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [checkoutType, setCheckoutType] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("checkoutData"));

    if (!stored || !stored.items || stored.items.length === 0) {
      navigate("/");
      return;
    }

    setCheckoutItems(stored.items);
    setCheckoutType(stored.type);
  }, [navigate]);

  // ⛔ Prevent rendering until data is ready
  if (checkoutItems.length === 0) return null;

  return (
    <div className={style.buyNow}>
      <Address />
      <TotalCost items={checkoutItems} type={checkoutType} />
    </div>
  );
}
