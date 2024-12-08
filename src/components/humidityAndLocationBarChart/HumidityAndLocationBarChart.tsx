import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

export type BarChartData = {
  humidity: number;
  temperature: number;
}[];

type BarChartProps = {
  chartData: BarChartData;
};

const HumidityAndTemperatureBarChart = ({ chartData }: BarChartProps) => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="humidity"
            name="Humidity (%)"
            stackId="a"
            fill="#0E0063"
          />
          <Bar
            dataKey="temperature"
            name="Temperature (°C)"
            stackId="b"
            fill="#f69800"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HumidityAndTemperatureBarChart;
