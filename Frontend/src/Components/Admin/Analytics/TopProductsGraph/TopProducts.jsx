import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Filler,
);

export default function TopSellingProductsChart({ data }) {
  console.log("TOP PRODUCTS DATA:", data);

  if (!data) return <p>Loading...</p>;

  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "Units Sold",
        data: data.map((item) => item.totalSold),
        backgroundColor: "#4CAF50",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { beginAtZero: true },
    },
  };

  return (
    <div style={{ height: "350px", width: "100%" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}
