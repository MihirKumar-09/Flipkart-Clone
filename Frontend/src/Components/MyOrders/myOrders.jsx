import style from "./myOrders.module.css";
import Navbar from "../Layout/AuthNavbar";
import Footer from "../../Components/Layout/Footer/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
        console.error("Error fetching orders:", error.message);
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
                          order.status === "Delivered"
                            ? style.delivered
                            : style.cancelled
                        }
                      >
                        ● {order.status}
                      </span>
                      <p className={style.subText}>
                        {order.status === "Delivered"
                          ? "Your item has been delivered"
                          : order.status === "Pending"
                            ? "Your order is on pending"
                            : "Your order was cancelled"}
                      </p>
                    </div>
                  </div>
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
