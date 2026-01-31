import style from "./Analytics.module.css";
import SummaryCard from "./SummaryCard/SummaryCard";
import OrderStatusChart from "./OrderStatusGraph/OrderStatusGraph";
import MonthlyRevenueChart from "./MonthlyRevenue/MonthlyRevenue";
import TopSellingProductsChart from "./TopProductsGraph/TopProducts";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";
export default function Analytics() {
  const [summary, setSummary] = useState(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const user = useAuth();
  console.log("ANALYTICS RENDER USER:", user);

  // Fetch analytics data;
  useEffect(() => {
    const fetchSummary = async () => {
      const res = await axios.get(
        "http://localhost:8080/api/admin/orders/analytics",
      );
      console.log(res.data);
      setSummary(res.data);
    };
    fetchSummary();
  }, []);
  // Fetch monthly revenue;
  useEffect(() => {
    const fetchMonthlyRevenue = async () => {
      const res = await axios.get(
        "http://localhost:8080/api/admin/orders/analytics/monthly-revenue",
      );
      setMonthlyRevenue(res.data);
    };
    fetchMonthlyRevenue();
  }, []);
  // Fetch top products;
  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/admin/orders/analytics/top-products",
          {
            withCredentials: true, // <-- send MongoDB session cookie
          },
        );
        console.log("TOP PRODUCTS DATA:", res.data);
        setTopProducts(res.data);
      } catch (err) {
        console.error(
          "TOP PRODUCTS API ERROR:",
          err.response?.data || err.message,
        );
      }
    };

    fetchTopProducts();
  }, []);

  if (!summary) return <p>Loading....</p>;

  const formatINR = (amount) => {
    return "₹" + amount.toLocaleString("en-IN");
  };
  const formatNum = (amount) => {
    return amount.toLocaleString("en-IN");
  };

  const summaryData = [
    { title: "Total Orders", value: formatNum(summary.totalOrders) },
    {
      title: "Total Revenue",
      value: formatINR(summary.totalRevenue),
    },
    { title: "Total Users", value: formatNum(summary.totalUsers) },
    { title: "Cancelled Order", value: formatNum(summary.cancelledOrders) },
    { title: "Active Orders", value: formatNum(summary.activeOrders) },
  ];
  return (
    <div className={style.analyticsContainer}>
      <section className={style.summary}>
        {summaryData.map((item, index) => (
          <SummaryCard key={index} title={item.title} value={item.value} />
        ))}
      </section>
      <section className={style.chart}>
        <div className={style.doughnutGraph}>
          <OrderStatusChart summary={summary} />
        </div>

        <div className={style.doughnutGraph}>
          <TopSellingProductsChart data={topProducts} />
        </div>
        <div className={style.doughnutGraph}>
          <MonthlyRevenueChart data={monthlyRevenue} />
        </div>
      </section>
    </div>
  );
}
