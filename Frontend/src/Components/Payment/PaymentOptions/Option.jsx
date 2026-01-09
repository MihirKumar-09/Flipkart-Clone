import styles from "./Option.module.css";
export default function Option({ payment, setPayment }) {
  return (
    <form className={styles.paymentOptions}>
      <h4>Payment Options</h4>
      <hr />
      <input
        type="radio"
        id="ONLINE"
        name="payment"
        value="ONLINE"
        checked={payment === "ONLINE"}
        onChange={(e) => setPayment(e.target.value)}
        className={styles.radio}
      />
      <label htmlFor="ONLINE" className={styles.option}>
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
        id="COD"
        name="payment"
        value="COD"
        checked={payment === "COD"}
        onChange={(e) => setPayment(e.target.value)}
        className={styles.radio}
      />
      <label htmlFor="COD" className={styles.option}>
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
