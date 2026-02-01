// chartConfig.js (or inside component file)
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
);
import { Line } from "react-chartjs-2";

export default function DailyOrderStatusChart({ data }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: "Delivered",
        data: data.map((d) => d.DELIVERED),
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.15)",
        tension: 0.4,
        pointRadius: 4,
        borderWidth: 3,
      },
      {
        label: "Cancelled",
        data: data.map((d) => d.CANCELLED),
        borderColor: "#ef4444",
        backgroundColor: "rgba(239,68,68,0.15)",
        tension: 0.4,
        pointRadius: 4,
        borderWidth: 3,
      },
      {
        label: "Placed",
        data: data.map((d) => d.PLACED),
        borderColor: "#3b82f6",
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
        grid: {
          color: "rgba(0,0,0,0.1)",
        },
      },
      x: {
        grid: {
          display: true,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
