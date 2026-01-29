import { useEffect, useState } from "react";
import style from "./Orders.module.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:8080/api/admin/orders?page=${page}&limit=20`,
          { credentials: "include" },
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed");
        }

        setOrders(data.orders || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Fetch error:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
    if (page < 1) setPage(1);
  }, [page, totalPages]);

  // Update Status
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:8080/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      const updatedOrder = await res.json();

      setOrders((prev) =>
        prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o)),
      );
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div className={style.container}>
      <div className={style.card}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" align="center">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.orderId}</td>
                  <td>{order.user?.username || "Guest"}</td>
                  <td>₹{order.totalPrice.toLocaleString("en-IN")}</td>

                  <td>
                    <span
                      className={`${style.status} ${
                        style[order.status.toLowerCase()]
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className={style.select}
                    >
                      <option value="PLACED" style={{ color: "#0d47a1" }}>
                        Placed
                      </option>
                      <option value="SHIPPED" style={{ color: "#0d47a1" }}>
                        Shipped
                      </option>
                      <option
                        value="OUT_FOR_DELIVERY"
                        style={{ color: "green" }}
                      >
                        Out for Delivery
                      </option>
                      <option value="DELIVERED" style={{ color: "green" }}>
                        Delivered
                      </option>
                      <option value="CANCELLED" style={{ color: "red" }}>
                        Cancelled
                      </option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className={style.pageNavigation}>
          <button
            disabled={page === 1 || loading}
            onClick={() => setPage((p) => p - 1)}
          >
            <i class="fa-solid fa-angles-left"></i>
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages || loading}
            onClick={() => setPage((p) => p + 1)}
          >
            <i class="fa-solid fa-angles-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
