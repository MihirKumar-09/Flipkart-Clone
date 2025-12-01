import style from "./Cart.module.css";
import NavBar from "../../Components/Layout/AuthNavbar";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import TotalPrice from "./TotalPrice";
import Footer from "./Footer";

export default function Cart() {
  const cart = useSelector((state) => state.cart.items);

  const isEmpty = !Array.isArray(cart) || cart.length === 0;

  return (
    <div className={style.cart}>
      <NavBar />
      <div className={style.section}>
        <div className={style.leftSection}>
          <CartItem />
          {!isEmpty && (
            <div className={style.bottomBar}>
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
