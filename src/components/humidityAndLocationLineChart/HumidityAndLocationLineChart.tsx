import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export type LineChartData = {
  time: string;
  temperature: number | null;
  humidity: number | null;
}[];

type HumidityAndLocationLineChartProps = {
  chartData: LineChartData;
};

const HumidityAndLocationLineChart = ({
  chartData,
}: HumidityAndLocationLineChartProps) => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            label={{ value: "Time", position: "insideBottomRight", offset: 0 }}
          />
          <YAxis
            label={{ value: "Value", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#0E0063"
            name="Humidity (%)"
          />

          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#f69800"
            name="Temperature (°C)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HumidityAndLocationLineChart;
