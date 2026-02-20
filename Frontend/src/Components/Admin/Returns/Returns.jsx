import style from "./Returns.module.css";
import { useEffect, useState } from "react";

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
        `${process.env.VITE_BACKEND_URL}/api/admin/orders/returns?page=${page}&limit=20`,
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
      const res = await fetch(
        `${process.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status }),
        },
      );

      if (!res.ok) throw new Error("Update failed");

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
            <th>Reason</th>
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
                <td>₹{order.totalPrice.toLocaleString("en-IN")}</td>

                {/* Status label */}
                <td>
                  <span
                    className={`${style.status} ${
                      style[order.status.toLowerCase()]
                    }`}
                  >
                    {order.status.replaceAll("_", " ")}
                  </span>
                </td>

                {/* Reason column */}
                <td>{order.returnReason?.replaceAll("_", " ") || "N/A"}</td>

                {/* Action column */}
                <td>
                  {order.status === "RETURN_REQUESTED" && (
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className={`${style.status}`}
                    >
                      <option value="RETURN_REQUESTED" disabled>
                        Return Requested
                      </option>
                      <option value="RETURN_APPROVED">Approve Return</option>
                      <option value="RETURN_REQUEST_REJECTED">
                        Request rejected
                      </option>
                    </select>
                  )}

                  {order.status === "RETURN_APPROVED" && (
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className={`${style.status}`}
                    >
                      <option value="RETURN_APPROVED" disabled>
                        Return Approved
                      </option>
                      <option value="RETURN_COMPLETED">Complete Return</option>
                    </select>
                  )}

                  {order.status === "RETURN_COMPLETED" && (
                    <span className={`${style.status}`}>Return Completed</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className={style.pageNavigation}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          <i className="fa-solid fa-angles-left"></i>
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          <i className="fa-solid fa-angles-right"></i>
        </button>
      </div>
    </div>
  );
}
