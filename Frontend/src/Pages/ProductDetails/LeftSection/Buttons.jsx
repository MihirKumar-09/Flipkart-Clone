import style from "./Buttons.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import { toast } from "react-toastify";
import { useBuyNow } from "../../../Context/BuyNowContext";
import { useState } from "react";

export default function Buttons({ product }) {
  const { user } = useAuth();
  const { setBuyNow } = useBuyNow();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item._id === product._id);

  const [isVisible, setIsVisible] = useState(false);

  const notify = () => {
    toast.success("Added to cart", {
      autoClose: 2000,
      theme: "dark",
    });
  };

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    dispatch(addToCart(product));
    navigate("/cart");
    notify();
  };

  const handleBuyNow = () => {
    if (!user) {
      navigate("/login");
      toast.error("You are not logged in");
      return;
    } else {
      setBuyNow(product);
      navigate("/buy-now");
    }
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

      <button
        onClick={() => {
          setIsVisible(true);
        }}
      >
        <i className="fa-solid fa-bolt-lightning"></i>
        <span>BUY NOW</span>
      </button>

      {isVisible && (
        <div className={style.allButton}>
          <div className={style.buttonContainer}>
            <div className={style.close}>
              <i
                class="fa-solid fa-xmark"
                onClick={() => setIsVisible(false)}
              ></i>
            </div>
            <button className={style.primary} onClick={handleBuyNow}>
              Buy Now
            </button>

            <div className={style.row}>
              <button
                onClick={() => navigate("/price-drop", { state: product })}
              >
                Price Drop
              </button>
              <button>Back In Stock</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
