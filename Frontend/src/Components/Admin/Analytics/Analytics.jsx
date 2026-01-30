import style from "./Analytics.module.css";
import SummaryCard from "./SummaryCard/SummaryCard";
import OrderStatusChart from "./OrderStatusGraph/OrderStatusGraph";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Analytics() {
  const [summary, setSummary] = useState(null);

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
    <div>
      <section className={style.summary}>
        {summaryData.map((item, index) => (
          <SummaryCard key={index} title={item.title} value={item.value} />
        ))}
      </section>
      <section className={style.chart}>
        <OrderStatusChart summary={summary} />
      </section>
    </div>
  );
}
