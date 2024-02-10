import { Pie } from "react-chartjs-2";
import "chart.js/auto";

export default function PieChart({ chartData }: any) {
  return <Pie data={chartData} />;
}
