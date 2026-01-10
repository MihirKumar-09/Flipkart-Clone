import style from "./PayNow.module.css";
export default function PayNow({ onPay, isPaying, disabled }) {
  return (
    <div className={style.payNow}>
      <button type="button" onClick={onPay} disabled={isPaying || disabled}>
        {isPaying ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
