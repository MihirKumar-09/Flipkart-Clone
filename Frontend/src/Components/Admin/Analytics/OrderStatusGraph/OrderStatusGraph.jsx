import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function OrderStatusChart({ summary }) {
  if (!summary) return null;
  const delivered =
    summary.totalOrders - summary.activeOrders - summary.cancelledOrders;

  const data = {
    labels: ["Active", "Delivered", "Cancelled"],
    datasets: [
      {
        label: "Order Status",
        data: [summary.activeOrders, delivered, summary.cancelledOrders],
        backgroundColor: ["#F79A19", "#4CAF50", "#F44336"],
        borderRadius: 6,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
}
