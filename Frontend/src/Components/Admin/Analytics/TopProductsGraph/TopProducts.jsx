import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useMemo } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function TopSellingProductsChart({ data }) {
  // ✅ HARD GUARD
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No Top Selling Products</p>;
  }

  // ✅ DEFINE COLORS (YOU PROBABLY MISSED THIS)
  const colors = [
    "#2563eb",
    "#16a34a",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
  ];

  // ✅ MEMOIZED DATA
  const chartData = useMemo(
    () => ({
      labels: data.map((item) => item.name),
      datasets: [
        {
          label: "Top Selling Products",
          data: data.map((item) => item.totalSold),
          backgroundColor: data.map((_, i) => colors[i % colors.length]),
          borderRadius: 8,
          barThickness: 40,
        },
      ],
    }),
    [data],
  );

  // ✅ MEMOIZED OPTIONS
  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        legend: { position: "bottom" },
        tooltip: {
          callbacks: {
            label: (ctx) => `Sold: ${ctx.raw}`,
          },
        },
      },
      scales: {
        x: {
          ticks: { display: false },
          grid: { display: false },
        },
        y: {
          beginAtZero: true,
          ticks: { precision: 0 },
        },
      },
    }),
    [],
  );

  return <Bar data={chartData} options={options} />;
}
