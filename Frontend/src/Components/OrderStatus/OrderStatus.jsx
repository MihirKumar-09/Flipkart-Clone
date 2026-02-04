import style from "./OrderStatus.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Import left container;
import LeftContainer from "./LeftContainer/Left";
// Import Right Container;
import RightContainer from "./RightContainer/Right";
// Import NavBar ;
import NavBar from "../../Components/Layout/AuthNavbar";
// Import footer ;
import Footer from "../../Components/Layout/Footer/Footer";

// Import page navigation;
import Page from "./PageNavigation/Page";
export default function OrderStatus() {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();

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

  if (!order) {
    return <p>Loading....</p>;
  }
  return (
    <div>
      <NavBar />
      <Page />
      <div className={style.orderStatusContainer}>
        <LeftContainer order={order} />
        <RightContainer order={order} />
      </div>
      <Footer />
    </div>
  );
}
