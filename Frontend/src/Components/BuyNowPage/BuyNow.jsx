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
  if (checkoutItems.length === 0) return null;

  return (
    <div className={style.buyNow}>
      <Address />
      <TotalCost items={checkoutItems} type={checkoutType} />
    </div>
  );
}
