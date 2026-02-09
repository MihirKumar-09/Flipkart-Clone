import style from "./OrderStatus.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Import left container;
import LeftContainer from "./LeftContainer/Left";
// Import Right Container;
import RightContainer from "./RightContainer/Right";
// Import NavBar ;
import NavBar from "../../Components/Layout/AuthNavbar";
// Import footer ;
import Footer from "../../Components/Layout/Footer/Footer";

import axios from "axios";

// Import page navigation;
import Page from "./PageNavigation/Page";
export default function OrderStatus() {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();
  console.log("ORDER IN PARENT:", order);
  // Fetch Order from backend;
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get(`http://localhost:8080/order/${orderId}`, {
        withCredentials: true,
      });
      setOrder(res.data);
    };
    fetchOrders();
  }, [orderId]);

  // Submit review;
  const submitReview = async ({ productId, rating, comment }) => {
    const res = await fetch(
      `http://localhost:8080/api/products/${productId}/review`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ rating, comment }),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Must add comment");
    }

    return data;
  };

  if (!order) {
    return <p>Loading....</p>;
  }
  return (
    <div>
      <NavBar />
      <Page order={order} />
      <div className={style.orderStatusContainer}>
        <LeftContainer order={order} submitReview={submitReview} />
        <RightContainer order={order} />
      </div>
      <Footer />
    </div>
  );
}
