import style from "./TotalPrice.module.css";
import { useSelector } from "react-redux";

export default function TotalPrice() {
  const cart = useSelector((state) => state.cart.items);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const price = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const platformFee = 7;

  const totalAmount = price + platformFee;

  return (
    <div className={style.totalPrice}>
      <h2>PRICE DETAILS</h2>

      <div className={style.line}>
        <p>Price ({totalItems} items)</p>
        <p>₹{price.toLocaleString("en-IN")}</p>
      </div>

      <div className={style.line}>
        <p>Platform Fee</p>
        <p>₹{platformFee}</p>
      </div>

      <hr style={{ margin: "0px" }} />

      <div className={style.totalLine}>
        <h3>Total Amount</h3>
        <h3>₹{totalAmount.toLocaleString("en-IN")}</h3>
      </div>
    </div>
  );
}
