import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import NavBar from "../../Components/Layout/AuthNavbar";
import CartItem from "./CartItem";
import TotalPrice from "./TotalPrice";
import Footer from "./Footer";
import style from "./Cart.module.css";

axios.defaults.withCredentials = true; // SEND COOKIE EVERYWHERE

export default function Cart() {
  const cart = useSelector((state) => state.cart.items);
  const isEmpty = !Array.isArray(cart) || cart.length === 0;

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/auth/check");
        setUser(res.data.user);
      } catch {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  const handlePlaceOrder = () => {
    if (!user) return navigate("/login");
    if (!cart || cart.length === 0) return;

    localStorage.setItem(
      "checkoutData",
      JSON.stringify({
        type: "CART",
        items: cart.map((item) => ({ ...item, quantity: item.quantity || 1 })),
      }),
    );
    navigate("/buy-now");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={style.cart}>
      <NavBar />
      <div className={style.section}>
        <div className={style.leftSection}>
          <CartItem />
          {!isEmpty && (
            <div className={style.bottomBar} onClick={handlePlaceOrder}>
              <button>PLACE ORDER</button>
            </div>
          )}
        </div>
        {!isEmpty && (
          <div className={style.rightSection}>
            <TotalPrice />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
