import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import NavBar from "../../Components/Layout/AuthNavbar";
import CartItem from "./CartItem";
import TotalPrice from "./TotalPrice";
import Footer from "./Footer";
import style from "./Cart.module.css";

export default function Cart() {
  const cart = useSelector((state) => state.cart.items);
  const isEmpty = !Array.isArray(cart) || cart.length === 0;

  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (isEmpty) return; // no items to place order

    localStorage.setItem(
      "checkoutData",
      JSON.stringify({
        type: "CART",
        items: cart.map((item) => ({
          ...item,
          quantity: item.quantity || 1,
        })),
      }),
    );

    navigate("/buy-now");
  };

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
