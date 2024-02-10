import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function LineChart({ chartData }: any) {
  return <Line data={chartData} />;
}
