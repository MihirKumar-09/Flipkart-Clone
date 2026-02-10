import { useState } from "react";
import style from "./Buttons.module.css";

export default function Buttons({ order, onOrderUpdate }) {
  const RETURN_WINDOW_DAYS = 7;

  const [loading, setLoading] = useState(false);
  const [returnLoading, setReturnLoading] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const [reason, setReason] = useState("");

  const isReturnAllowed = (order) => {
    if (order.status !== "DELIVERED") return false;
    if (!order.deliveredAt) return false;

    const deliveredDate = new Date(order.deliveredAt);
    const today = new Date();
    const diffInDays =
      (today.getTime() - deliveredDate.getTime()) / (1000 * 60 * 60 * 24);

    return diffInDays <= RETURN_WINDOW_DAYS;
  };

  const handleCancel = async () => {
    if (order.status === "CANCELLED" || order.status === "DELIVERED") return;

    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:8080/order/${order._id}/cancel`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );

      if (!res.ok) return;

      const updatedOrder = await res.json();
      onOrderUpdate(updatedOrder);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReturn = async () => {
    if (!reason || returnLoading) return;

    try {
      setReturnLoading(true);
      const res = await fetch(
        `http://localhost:8080/order/${order._id}/return`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reason }),
        },
      );

      if (!res.ok) return;

      const updatedOrder = await res.json();
      onOrderUpdate(updatedOrder);
      setShowReturn(false);
      setReason("");
    } finally {
      setReturnLoading(false);
    }
  };

  const handleCancelReturn = async () => {
    if (order.status !== "RETURN_REQUESTED" || returnLoading) return;

    try {
      setReturnLoading(true);
      const res = await fetch(
        `http://localhost:8080/order/${order._id}/cancel-return`,
        {
          method: "PATCH",
          credentials: "include",
        },
      );

      if (!res.ok) return;

      const updatedOrder = await res.json();
      onOrderUpdate(updatedOrder);
    } finally {
      setReturnLoading(false);
    }
  };

  const returnAllowed = isReturnAllowed(order);

  return (
    <div className={style.buttons}>
      {order.status === "PLACED" && (
        <button
          className={style.cancel}
          onClick={handleCancel}
          disabled={loading}
        >
          {loading ? "Cancelling..." : "Cancel"}
        </button>
      )}

      {order.status === "DELIVERED" && returnAllowed && (
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

      {order.status === "RETURN_REQUESTED" && (
        <button
          onClick={handleCancelReturn}
          className={style.cancel}
          disabled={returnLoading}
        >
          {returnLoading ? "Cancelling Return..." : "Cancel Return"}
        </button>
      )}
    </div>
  );
}
