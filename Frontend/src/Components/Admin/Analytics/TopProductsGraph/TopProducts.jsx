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
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Filler,
  ChartDataLabels,
);

export default function TopSellingProductsChart({ data }) {
  if (!data) return <p>No Top Selling Products</p>;

  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "Top Selling Products",
        data: data.map((item) => item.totalSold),
        backgroundColor: "#4CAF50",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    indexAxis: "x",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "bottom" },
      title: { display: false, text: "Top Selling Products" },
      datalabels: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: { display: false },
        grid: { drawTicks: false, drawBorder: false },
      },
      x: {
        beginAtZero: false,
        ticks: { display: false },
      },
    },
  };

  return (
    <div style={{ height: "350px", width: "100%" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}
