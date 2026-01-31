import {
  Chart as ChartJS,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  plugins,
  scales,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  plugins,
  scales,
);

export default function LowStockChart({ data }) {
  if (!data || data.length == 0) return <p>No low stock available</p>;

  const backgroundColor = data.map((item) =>
    item.stock <= 2 ? "#f6304a" : "rgba(255, 206, 86, 0.8)",
  );

  const chartData = {
    labels: data.map((p) => p.name),
    datasets: [
      {
        label: "Stock Remaining",
        data: data.map((p) => p.stock),
        backgroundColor: backgroundColor,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `Stock: ${ctx.raw}`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
      y: {
        ticks: {
          autoSkip: false,
          callback: function (value) {
            const label = this.getLabelForValue(value);
            const maxLength = 18;

            return label.length > maxLength
              ? label.substring(0, maxLength) + "..."
              : label;
          },
        },
      },
    },
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}
