import { useState } from "react";
import style from "./Buttons.module.css";

export default function Buttons({ order }) {
  const [loading, setLoading] = useState(false);
  // User to hide return button after 7 days;
  const RETURN_WINDOW_DAYS = 7;

  // Used to shoe return reason options;
  const [showReturn, setShowReturn] = useState(false);
  const [reason, setReason] = useState("");

  // Check return is allow or not ?
  const isReturnAllowed = (order) => {
    if (order.status !== "DELIVERED") return false;
    if (!order.deliveredAt) return false;

    const deliveredDate = new Date(order.deliveredAt);
    const today = new Date();

    const diffInMs = today - deliveredDate;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return diffInDays <= 7; // RETURN_WINDOW_DAYS
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

      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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

      {order.status === "DELIVERED" && isReturnAllowed(order) && (
        <button className={style.cancel} onClick={() => setShowReturn(true)}>
          Return
          {showReturn && (
            <div className={style.overlay}>
              <div className={style.returnOptions}>
                <p>Why are you returning this?</p>

                <div className={style.reasons}>
                  <label>
                    <input type="radio" name="reason" />
                    Damaged product
                  </label>
                  <label>
                    <input type="radio" name="reason" />
                    Wrong item received
                  </label>
                  <label>
                    <input type="radio" name="reason" />
                    No longer needed
                  </label>
                </div>

                <div className={style.actions}>
                  <button>Cancel</button>
                  <button>Confirm</button>
                </div>
              </div>
            </div>
          )}
        </button>
      )}

      <button className={style.help}>Help</button>
    </div>
  );
}
