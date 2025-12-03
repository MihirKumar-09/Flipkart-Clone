import style from "./CartItem.module.css";
import { useSelector } from "react-redux";
import Button from "./button";
import emptycart from "../../assets/EmptyResult/emptycart.jpg";
import { useNavigate } from "react-router-dom";

export default function CartItem() {
  const cart = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  console.log("CART:", cart);

  if (cart.length === 0) {
    return (
      <div className={style.emptyWrapper}>
        <div className={style.emptyCart}>
          <img src={emptycart} alt="" />
          <h6>Your cart is empty</h6>
          <p>Add items to it now.</p>
          <button onClick={() => navigate("/")}>Shop Now</button>
        </div>
      </div>
    );
  }

  return (
    <div className={style.cartItem}>
      {cart.map((item) => (
        <>
          <div className={style.item} key={item._id}>
            <div className={style.imageDiv}>
              <img
                src={item.image?.[0]?.url || "/placeholder.png"}
                alt={item.name}
              />
            </div>
            <div className={style.itemDetails}>
              <h2>{item.name}</h2>
              <p className={style.description}>{item.description}</p>
              <p className={style.price}>
                ₹{Number(item.price || 0).toLocaleString("en-IN")}
              </p>
              <p className={style.highlights}>
                {item.highlights?.[0] || "No highlights"}
              </p>
            </div>
          </div>

          <Button item={item} />
        </>
      ))}
    </div>
  );
}
