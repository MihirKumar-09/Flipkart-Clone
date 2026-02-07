import style from "./Returns.module.css";
import { useEffect, useState } from "react";

const statusClassMap = {
  RETURN_REQUESTED: style.returnRequested,
  RETURN_APPROVED: style.returnApproved,
  RETURN_RECEIVED: style.returnReceived,
  REFUND_INITIATED: style.refundInitiated,
  REFUNDED: style.refunded,
  RETURN_REJECTED: style.returnRejected,
};

export default function Return() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchReturns();
  }, [page]);

  const fetchReturns = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:8080/api/admin/orders/returns?page=${page}&limit=20`,
        { credentials: "include" },
      );

      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();
      setOrders(data.orders || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:8080/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        throw new Error("Update failed");
      }

      const updatedOrder = await res.json();

      setOrders((prev) =>
        prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o)),
      );
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  if (loading) return <p>Loading Return Orders...</p>;

  return (
    <div className={style.container}>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Updated</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="6" align="center">
                No return orders
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order.orderId}</td>
                <td>{order.user?.username || "Guest"}</td>
                <td>₹{order.totalPrice}</td>

                <td>
                  <span
                    className={`${style.status} ${
                      statusClassMap[order.status]
                    }`}
                  >
                    {order.status.replaceAll("_", " ")}
                  </span>
                </td>

                <td>{new Date(order.updatedAt).toLocaleDateString()}</td>

                <td>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                  >
                    <option value="RETURN_REQUESTED">Return Requested</option>
                    <option value="RETURN_APPROVED">Return Approved</option>
                    <option value="RETURN_COMPLETED">Return Completed</option>
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className={style.pageNavigation}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ‹
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          ›
        </button>
      </div>
    </div>
  );
}
