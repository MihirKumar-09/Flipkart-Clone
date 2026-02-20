import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import style from "./BuyNow.module.css";
import Address from "./Address/Address";
import TotalCost from "./TotalMoney/TotalMoney";

axios.defaults.withCredentials = true;

export default function BuyNow() {
  const navigate = useNavigate();

  const [checkoutItems, setCheckoutItems] = useState([]);
  const [checkoutType, setCheckoutType] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Check login and redirect if not logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          `${process.env.VITE_BACKEND_URL}/api/auth/check`,
        );
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
    const data = localStorage.getItem("checkoutData");
    if (data) {
      const parsed = JSON.parse(data);
      setCheckoutItems(parsed.items || []);
      setCheckoutType(parsed.type || null);
    } else {
      navigate("/cart");
    }
  }, [navigate]);

  if (loading || !user) return <div>Loading...</div>;
  if (checkoutItems.length === 0) return <div>No items to checkout.</div>;

  return (
    <div className={style.buyNow}>
      <Address />
      <TotalCost items={checkoutItems} type={checkoutType} />
    </div>
  );
}
