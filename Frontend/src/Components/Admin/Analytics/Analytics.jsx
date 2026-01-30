import style from "./Analytics.module.css";
import SummaryCard from "./SummaryCard/SummaryCard";
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

  const summaryData = [
    { title: "Total Orders", value: summary.totalOrders },
    { title: "Total Revenue", value: `₹${summary.totalRevenue}` },
    { title: "Total Users", value: summary.totalUsers },
    { title: "Cancelled Order", value: summary.cancelledOrders },
    { title: "Active Orders", value: summary.activeOrders },
  ];
  return (
    <div>
      <section className={style.summary}>
        {summaryData.map((item, index) => (
          <SummaryCard key={index} title={item.title} value={item.value} />
        ))}
      </section>
    </div>
  );
}
