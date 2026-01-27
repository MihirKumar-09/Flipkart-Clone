import style from "./Orders.module.css";
import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders;
  useEffect(() => {
    fetch("http://localhost:8080/api/admin/orders", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch(() => {
        setOrders([]);
        setLoading(false);
      });
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
      <h2>Orders</h2>

      <div className={style.card}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Order ID</th>
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
                      <option value="PENDING">Pending</option>
                      <option value="SHIPPED">Shipped</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
