import style from "./Total.module.css";

export default function TotalMoney({ items = [] }) {
  if (!items || items.length === 0) return null;

  const totalItems = items.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const price = items.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0,
  );

  const platformFee = 7;
  const totalAmount = price + platformFee;

  return (
    <div className={style.totalPrice}>
      <h2>PRICE DETAILS</h2>

      <div className={style.line}>
        <p>
          Price ({totalItems} item{totalItems > 1 ? "s" : ""})
        </p>
        <p>₹{price.toLocaleString("en-IN")}</p>
      </div>

      <div className={style.line}>
        <p>Platform Fee</p>
        <p>₹{platformFee}</p>
      </div>

      <hr />

      <div className={style.totalLine}>
        <h3>Total Amount</h3>
        <h3>₹{totalAmount.toLocaleString("en-IN")}</h3>
      </div>
    </div>
  );
}
