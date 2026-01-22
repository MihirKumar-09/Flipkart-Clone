import style from "./PayNow.module.css";
export default function PayNow({ onPay, isPaying }) {
  return (
    <div className={style.payNow}>
      <button onClick={onPay} disabled={isPaying}>
        {isPaying ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
