import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function OrderStatusChart({ summary }) {
  const delivered =
    summary.totalOrders - summary.activeOrders - summary.cancelledOrders;

  const data = {
    labels: ["Active", "Cancelled", "Delivered"],
    datasets: [
      {
        label: "Orders",
        data: [summary.activeOrders, summary.cancelledOrders, delivered],
        backgroundColor: ["#4CAF50", "#F44336", "#2196F3"],
        borderRadius: 6,
      },
    ],
  };
  return <Bar data={data} />;
}
