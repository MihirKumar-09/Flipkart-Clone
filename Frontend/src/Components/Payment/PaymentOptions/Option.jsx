import styles from "./Option.module.css";
import { useState } from "react";
export default function Option() {
  const [payment, setPayment] = useState("online");

  return (
    <form className={styles.paymentOptions}>
      <h4>Payment Options</h4>
      <hr />
      <input
        type="radio"
        id="online"
        name="payment"
        value="online"
        checked={payment === "online"}
        onChange={(e) => setPayment(e.target.value)}
        className={styles.radio}
      />
      <label htmlFor="online" className={styles.option}>
        <div className={styles.left}>
          <span className={styles.icon}>💳</span>
          <div>
            <div className={styles.title}>Pay Online</div>
            <div className={styles.desc}>
              Credit / Debit Card, Net Banking, UPI
            </div>
          </div>
        </div>
      </label>

      <input
        type="radio"
        id="cod"
        name="payment"
        value="cod"
        checked={payment === "cod"}
        onChange={(e) => setPayment(e.target.value)}
        className={styles.radio}
      />
      <label htmlFor="cod" className={styles.option}>
        <div className={styles.left}>
          <span className={styles.icon}>📦</span>
          <div>
            <div className={styles.title}>Cash on Delivery (COD)</div>
            <div className={styles.desc}>
              Pay with cash at the time of delivery
            </div>
          </div>
        </div>
      </label>
    </form>
  );
}
