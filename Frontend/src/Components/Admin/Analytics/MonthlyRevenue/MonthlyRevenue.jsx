import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
);

export default function MonthlyRevenueChart({ data }) {
  if (!data || data.length === 0) return null;

  const labels = data.map((item) => `${item._id.month}/${item._id.year}`);

  const revenueData = data.map((item) => item.totalRevenue);

  const onOffRaw = [1, 1, 0, 1, 0, 1, 1];
  const onOffData = onOffRaw.map((v) => (v === 1 ? 100 : 0));

  const chartData = {
    labels,
    datasets: [
      {
        type: "bar",
        label: "Monthly Revenue (₹)",
        data: revenueData,
        backgroundColor: [
          "#FF6384",
          "#FFCE56",
          "#36A2EB",
          "#FF6384",
          "#FFCE56",
          "#4BC0C0",
          "#FF6384",
        ],
        borderColor: "transparent",
        borderWidth: 0,
        yAxisID: "y",
        order: 2,
      },
      {
        type: "line",
        label: "Status (ON/OFF)",
        data: onOffData,
        borderColor: "#2196F3",
        backgroundColor: "rgba(33, 150, 243, 0.1)",
        borderWidth: 3,
        pointRadius: 0,
        tension: 0,
        stepped: "before",
        fill: false,
        yAxisID: "y1",
        order: 1,
        barThickness: 20,
        maxBarThickness: 25,
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
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.dataset.type === "line") {
              return `Status: ${context.raw === 100 ? "ON" : "OFF"}`;
            }
            return `${context.dataset.label}: ₹${context.raw.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Revenue / Value",
        },
        beginAtZero: true,
        max: 60,
        ticks: {
          stepSize: 20,
        },
      },
      y1: {
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "ON / OFF",
        },
        min: 0,
        max: 100,
        ticks: {
          stepSize: 100,
          callback: (value) =>
            value === 100 ? "ON" : value === 0 ? "OFF" : "",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
