import style from "./Cart.module.css";
import NavBar from "../../Components/Layout/AuthNavbar";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import TotalPrice from "./TotalPrice";
import Footer from "./Footer";
import { useAuth } from "../../Context/AuthContext";
import { useBuyNow } from "../../Context/BuyNowContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const cart = useSelector((state) => state.cart.items);

  const isEmpty = !Array.isArray(cart) || cart.length === 0;
  const { user } = useAuth();
  const navigate = useNavigate();

  const { setBuyNow } = useBuyNow();

  const handlePlaceOrder = () => {
    if (!user) {
      navigate("/login");
      toast.error("You are not logged in");
      return;
    }

    if (!cart || cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // 🔐 WRITE CHECKOUT CONTEXT (CART)
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
