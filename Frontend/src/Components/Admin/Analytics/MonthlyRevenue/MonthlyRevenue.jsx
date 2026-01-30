import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);
export default function MonthlyRevenueChart({ data }) {
  if (!data || data.length === 0) return null;

  const labels = data.map((item) => `${item._id.month}/${item._id.year}`);

  const revenueData = data.map((item) => item.totalRevenue);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Monthly Revenue (₹)",
        data: revenueData,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76,175,80,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Line data={chartData} options={options} />;
}
