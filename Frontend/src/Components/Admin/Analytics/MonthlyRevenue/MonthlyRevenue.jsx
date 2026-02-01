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
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  ChartDataLabels,
);

export default function MonthlyRevenueChart({ data }) {
  if (!data || data.length === 0)
    return (
      <div>
        <p>No Monthly Revenue</p>
      </div>
    );

  const labels = data.map((item) => `${item._id.month}/${item._id.year}`);

  const revenueData = data.map((item) => item.totalRevenue);

  const onOffRaw = [1, 1, 0, 1, 0, 1, 1];
  const onOffData = onOffRaw.map((v) => (v === 1 ? 100 : 0));

  const maxRevenue = Math.max(...revenueData);

  const barColors = [
    "#4BC0C0",
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#9966FF",
    "#FF9F40",
    "#2ECC71",
  ];

  const chartData = {
    labels,
    datasets: [
      {
        type: "bar",
        label: "Monthly Revenue (₹)",
        data: revenueData,
        backgroundColor: barColors.slice(0, revenueData.length),
        borderRadius: 6,
        yAxisID: "y",
        order: 2,

        datalabels: {
          anchor: "center",
          align: "center",
          color: "#000",
          font: {
            weight: "bold",
            size: 12,
          },
          formatter: (value) => `₹${value.toLocaleString("en-IN")}`,
        },
      },
      {
        type: "line",
        label: "Status (ON / OFF)",
        data: onOffData,
        borderColor: "#2196F3",
        borderWidth: 3,
        pointRadius: 0,
        stepped: true,
        fill: false,
        yAxisID: "y1",
        order: 1,
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
      datalabels: {
        clamp: true,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.dataset.type === "line") {
              return `Status: ${context.raw === 100 ? "ON" : "OFF"}`;
            }
            return `Revenue: ₹${context.raw.toLocaleString("en-IN")}`;
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
        beginAtZero: true,
        suggestedMax: maxRevenue * 1.2,
        ticks: {
          callback: (value) => `₹${value.toLocaleString("en-IN")}`,
        },
        title: {
          display: true,
          text: "Revenue",
        },
      },

      y1: {
        position: "right",
        min: 0,
        max: 100,
        ticks: {
          stepSize: 100,
          callback: (value) => (value === 100 ? "ON" : "OFF"),
        },
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "Status",
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
