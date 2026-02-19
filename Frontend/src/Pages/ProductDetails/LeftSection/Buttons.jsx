import style from "./Buttons.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import { toast } from "react-toastify";
import { useState } from "react";

export default function Buttons({ product }) {
  const { user } = useAuth();

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

    dispatch(
      addToCart({
        ...product,
        quantity: 1,
      }),
    );

    navigate("/cart");
    notify();
  };

  const handleBuyNow = () => {
    if (!user) {
      navigate("/login");
      toast.error("You are not logged in");
      return;
    }

    localStorage.setItem(
      "checkoutData",
      JSON.stringify({
        type: "BUY_NOW",
        items: [
          {
            ...product,
            quantity: 1,
          },
        ],
      }),
    );

    navigate("/buy-now");
  };

  return (
    <div className={style.Buttons}>
      {isInCart ? (
        <button onClick={() => navigate("/cart")} className={style.primaryBtn}>
          <i className="fa-solid fa-cart-shopping"></i>
          <span>GO TO CART</span>
        </button>
      ) : (
        <button
          onClick={handleAddToCart}
          disabled={!product || product.stock <= 0}
          className={`${style.primaryBtn} ${
            !product || product.stock <= 0 ? style.buyButton : ""
          }`}
        >
          <i className="fa-solid fa-cart-shopping"></i>
          <span>ADD TO CART</span>
        </button>
      )}

      <button onClick={() => setIsVisible(true)} className={style.secondaryBtn}>
        <i className="fa-solid fa-bolt-lightning"></i>
        BUY NOW
      </button>

      {/* =========NEW OPTIONS======== */}
      {isVisible && (
        <div className={style.allButton} onClick={() => setIsVisible(false)}>
          <div
            className={style.buttonContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={style.close}>
              <i
                className="fa-solid fa-xmark"
                onClick={() => setIsVisible(false)}
              ></i>
            </div>
            {/* Buy Now */}
            <button
              onClick={handleBuyNow}
              disabled={!product || product.stock <= 0}
              className={style.buyButton}
            >
              Buy Now
            </button>

            {/* Other Options */}
            <div className={style.row}>
              <button
                className={`${style.optionBtn} ${style.priceDropBtn}`}
                onClick={() => navigate("/price-drop", { state: { product } })}
              >
                Price Drop
              </button>

              {/* Disable the button when stock more then 0 */}
              <button
                className={`${style.optionBtn} ${style.stockBtn}`}
                disabled={!product || product.stock > 0}
                onClick={() =>
                  navigate("/stock-available", { state: { product } })
                }
              >
                Back In Stock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
