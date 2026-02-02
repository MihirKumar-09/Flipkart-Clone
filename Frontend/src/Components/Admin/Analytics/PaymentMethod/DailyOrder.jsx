import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

import { Bar } from "react-chartjs-2";
export default function PaymentMethodChart({ data }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  const cod = data.find((d) => d.method === "COD")?.totalOrders || 0;
  const online = data.find((d) => d.method === "ONLINE")?.totalOrders || 0;

  const chartData = {
    labels: ["COD", "ONLINE"],
    datasets: [
      {
        label: "Total Orders",
        data: [cod, online],
        backgroundColor: ["#f59e0b", "#22c55e"],
        borderRadius: 6,
        barThickness: 50,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
