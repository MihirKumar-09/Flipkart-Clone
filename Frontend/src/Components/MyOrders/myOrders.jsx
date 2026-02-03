import style from "./myOrders.module.css";
import Navbar from "../Layout/AuthNavbar";
import Footer from "../../Components/Layout/Footer/Footer";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
export default function MyOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:8080/order/my-orders", {
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("failed to fetch orders");
        }
        const data = await res.json();
        if (!data.orders) {
          throw new Error("Orders data missing");
        }
        setOrders(data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err.message);
      }
    };
    fetchOrders();
  }, []);
  return (
    <>
      <Navbar />

      <div className={style.mainContainer}>
        <div className={style.cardContainer}>
          {orders?.length === 0 ? (
            <div className={style.noFound}>
              <p>No orders found</p>
              <button onClick={() => navigate("/")}>
                Continue to shopping
              </button>
            </div>
          ) : (
            <div className={style.orderList}>
              {orders.map((order) =>
                order.items.map((item) => (
                  <Link
                    key={order._id}
                    to={`/order-status/${order._id}`}
                    className="link"
                  >
                    <div key={item._id} className={style.orderRow}>
                      <div className={style.imageBox}>
                        <img src={item.image} alt={item.name} />
                      </div>

                      <div className={style.details}>
                        <p className={style.title}>{item.name}</p>
                      </div>

                      <div className={style.price}>
                        ₹{item.price.toLocaleString("en-IN")}
                      </div>

                      <div className={style.status}>
                        <span
                          className={
                            order.status === "DELIVERED"
                              ? style.delivered
                              : order.status === "CANCELLED"
                                ? style.cancelled
                                : order.status === "SHIPPED"
                                  ? style.shipped
                                  : order.status === "CONFIRMED"
                                    ? style.confirmed
                                    : order.status === "PLACED"
                                      ? style.placed
                                      : style.inProgress
                          }
                        >
                          ● {order.status}
                        </span>

                        <p className={style.subText}>
                          {order.status === "PLACED"
                            ? "Your order has been placed"
                            : order.status === "CONFIRMED"
                              ? "Your order has been confirmed"
                              : order.status === "SHIPPED"
                                ? "Your item has been shipped"
                                : order.status === "DELIVERED"
                                  ? "Your item has been delivered"
                                  : order.status === "CANCELLED"
                                    ? "Your order was cancelled"
                                    : "Unknown order status"}
                        </p>
                      </div>
                    </div>
                  </Link>
                )),
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
