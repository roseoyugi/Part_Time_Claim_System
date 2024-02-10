import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function BarChart({ chartData }: any) {
  return <Bar data={chartData} />;
}
