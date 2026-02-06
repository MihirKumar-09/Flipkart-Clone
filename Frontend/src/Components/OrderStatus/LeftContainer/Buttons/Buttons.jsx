import { useState } from "react";
import style from "./Buttons.module.css";

export default function Buttons({ order }) {
  const [loading, setLoading] = useState(false);

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
      {order.status !== "CANCELLED" && (
        <button
          className={style.cancel}
          onClick={handleCancel}
          disabled={
            loading ||
            order.status === "CANCELLED" ||
            order.status === "DELIVERED"
          }
        >
          {loading ? "Cancelling..." : "Cancel"}
        </button>
      )}

      <button className={style.help}>Help</button>
    </div>
  );
}
