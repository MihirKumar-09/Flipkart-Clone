import { useEffectEvent } from "react";
import style from "./Orders.module.css";
import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/admin/orders", {
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error(`HTTP error! ${res.status}`);
        }
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Update the order status ;
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:8080/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      const updatedOrder = await res.json();

      setOrders((prev) =>
        prev.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order,
        ),
      );
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className={style.container}>
      <div className={style.card}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>
                <span>Order ID</span>
                <i class="fa-solid fa-arrow-down"></i>
              </th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
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
                  <td>₹{order.totalPrice}</td>

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
                      <option value="PENDING" style={{ color: "#856404" }}>
                        Pending
                      </option>
                      <option value="SHIPPED" style={{ color: "#0d47a1" }}>
                        Shipped
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
          <button>
            <i class="fa-solid fa-angle-left"></i>
          </button>
          <button>
            <i class="fa-solid fa-angle-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
