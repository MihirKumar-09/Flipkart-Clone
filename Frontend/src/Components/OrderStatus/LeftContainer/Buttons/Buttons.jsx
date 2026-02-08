import { useState } from "react";
import style from "./Buttons.module.css";

export default function Buttons({ order }) {
  const RETURN_WINDOW_DAYS = 7;

  const [orderState, setOrderState] = useState(order);
  const [loading, setLoading] = useState(false);
  const [returnLoading, setReturnLoading] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const [reason, setReason] = useState("");

  // Check if return is allowed
  const isReturnAllowed = (order) => {
    if (order.status !== "DELIVERED") return false;
    if (!order.deliveredAt) return false;

    const deliveredDate = new Date(order.deliveredAt);
    const today = new Date();
    const diffInDays =
      (today.getTime() - deliveredDate.getTime()) / (1000 * 60 * 60 * 24);

    console.log("Delivered At:", deliveredDate);
    console.log("Today:", today);
    console.log("Diff in days:", diffInDays);
    console.log("RETURN_WINDOW_DAYS:", RETURN_WINDOW_DAYS);

    return diffInDays <= RETURN_WINDOW_DAYS;
  };

  const handleCancel = async () => {
    if (orderState.status === "CANCELLED" || orderState.status === "DELIVERED")
      return;

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:8080/order/${orderState._id}/cancel`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );

      if (!res.ok) return;

      const updatedOrder = await res.json();
      setOrderState(updatedOrder);
      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReturn = async () => {
    if (!reason || returnLoading) return;

    try {
      setReturnLoading(true);

      const res = await fetch(
        `http://localhost:8080/order/${orderState._id}/return`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reason }),
        },
      );

      if (!res.ok) return;

      const updatedOrder = await res.json();
      setOrderState(updatedOrder);
      window.location.reload();
      setShowReturn(false);
      setReason("");
    } catch (err) {
      console.error(err.message);
    } finally {
      setReturnLoading(false);
    }
  };

  // Handle cancel return ;
  const handleCancelReturn = async () => {
    if (orderState.status !== "RETURN_REQUESTED" || returnLoading) return;

    try {
      setReturnLoading(true);

      const res = await fetch(
        `http://localhost:8080/order/${orderState._id}/cancel-return`,
        {
          method: "PATCH",
          credentials: "include",
        },
      );

      if (!res.ok) {
        console.error("Failed to cancel return");
        return;
      }

      const updatedOrder = await res.json();
      setOrderState(updatedOrder);
      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setReturnLoading(false);
    }
  };

  const returnAllowed = isReturnAllowed(orderState);

  return (
    <div className={style.buttons}>
      {orderState.status === "PLACED" && (
        <button
          className={style.cancel}
          onClick={handleCancel}
          disabled={loading}
        >
          {loading ? "Cancelling..." : "Cancel"}
        </button>
      )}

      {orderState.status === "DELIVERED" && returnAllowed && (
        <div>
          <button className={style.cancel} onClick={() => setShowReturn(true)}>
            Return
          </button>

          {showReturn && (
            <div className={style.overlay}>
              <div className={style.returnReasonContainer}>
                <h3 className={style.title}>Return item</h3>
                <p className={style.subtitle}>
                  Why are you returning this product?
                </p>

                <div className={style.returnReason}>
                  {[
                    { value: "DAMAGE", label: "Damaged product received" },
                    { value: "WRONG", label: "Wrong item received" },
                    { value: "NO_NEEDED", label: "No longer needed" },
                    { value: "MISSING", label: "Missing product" },
                  ].map((r) => (
                    <label key={r.value}>
                      <input
                        type="radio"
                        name="reason"
                        value={r.value}
                        checked={reason === r.value}
                        onChange={(e) => setReason(e.target.value)}
                      />
                      <span>{r.label}</span>
                    </label>
                  ))}
                </div>

                <div className={style.btn}>
                  <button
                    className={style.cancel}
                    onClick={() => {
                      setShowReturn(false);
                      setReason("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className={style.confirm}
                    onClick={handleConfirmReturn}
                    disabled={returnLoading}
                  >
                    {returnLoading ? "Submitting..." : "Confirm Return"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {orderState.status === "RETURN_REQUESTED" && (
        <button
          onClick={handleCancelReturn}
          className={style.cancel}
          disabled={returnLoading}
        >
          {returnLoading ? "Cancelling Return..." : "Cancel Return"}
        </button>
      )}

      <button className={style.help}>Help</button>
    </div>
  );
}
