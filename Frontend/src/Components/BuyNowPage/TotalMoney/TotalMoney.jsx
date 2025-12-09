import style from "./Total.module.css";
import { useBuyNow } from "../../../Context/BuyNowContext";
import { useSelector } from "react-redux";

export default function TotalMoney() {
  const { buyNowItem, getTotal } = useBuyNow();

  // Get item from redux when we needed
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  const platformFee = 7;

  const isBuyNow = !!buyNowItem;

  const itemCount = isBuyNow
    ? buyNowItem.quantity || 1
    : cart.reduce((acc, item) => acc + item.quantity, 0);

  // Total Amount
  const subtotal = isBuyNow ? getTotal() : cartTotal;
  const totalAmount = subtotal + platformFee;

  return (
    <div className={style.totalMoney}>
      <h2>PRICE DETAILS</h2>

      <div className={style.line}>
        <div>
          <p>Price ({itemCount} )</p>
          <p>₹{subtotal.toLocaleString("en-IN")}</p>
        </div>

        <div>
          <p>Platform Fee</p>
          <p>₹{platformFee}</p>
        </div>
      </div>

      <div className={style.totalLine}>
        <h3>Total Payable</h3>
        <h3>₹{totalAmount.toLocaleString("en-IN")}</h3>
      </div>
    </div>
  );
}
