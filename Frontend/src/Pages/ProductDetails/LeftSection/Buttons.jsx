import style from "./Buttons.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../../Context/AuthContext";

export default function Buttons({ product }) {
  const { user, setUser } = useAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item._id === product._id);

  // Load user from localStorage only
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <div className={style.Buttons}>
      {isInCart ? (
        <button onClick={() => navigate("/cart")}>
          <i className="fa-solid fa-cart-shopping"></i>
          <span>GO TO CART</span>
        </button>
      ) : (
        <button onClick={handleAddToCart}>
          <i className="fa-solid fa-cart-shopping"></i>
          <span>ADD TO CART</span>
        </button>
      )}

      <button>
        <i className="fa-solid fa-bolt-lightning"></i>
        <span>BUY NOW</span>
      </button>
    </div>
  );
}
