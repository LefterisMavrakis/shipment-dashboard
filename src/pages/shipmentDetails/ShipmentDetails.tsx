import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import shipmentsAPI from "../../api/api";
import { ExtendedShipment } from "../../api/types/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { format } from "date-fns";

export type ChartData = {
  time: string;
  temperature: number | null;
  humidity: number | null;
}[];

const ShipmentDetails = () => {
  const [shipmentDetails, setShipmentDetails] = useState<ExtendedShipment>();
  const { shipmentId } = useParams();

  const fetchShipmentDetails = useCallback(async () => {
    if (!shipmentId) {
      return;
    }
    try {
      const result = await shipmentsAPI.getShipmentDetails(shipmentId);

      setShipmentDetails(result);
    } catch {
      console.log("Error during fetching shipment details");
    }
  }, [shipmentId]);

  const chartData = useMemo(() => {
    if (!shipmentDetails) {
      return [];
    }

    const data: ChartData = [];

    shipmentDetails.temperature.forEach((item) => {
      data.push({
        time: format(new Date(item.t), "dd/MM/yyyy hh:mm"),
        temperature: item.v,
        humidity: null,
      });
    });

    shipmentDetails.humidity.forEach((item, index) => {
      data[index].humidity = item.v;
    });

    return data;
  }, [shipmentDetails]);

  const chartHumidityData = useMemo(() => {
    if (!shipmentDetails) {
      return [];
    }

    const data: ChartData = [];

    shipmentDetails.temperature.forEach((item) => {
      data.push({
        time: format(new Date(item.t), "dd/MM/yyyy hh:mm"),
        temperature: item.v,
        humidity: null,
      });
    });

    shipmentDetails.humidity.forEach((item, index) => {
      data[index].humidity = item.v;
    });

    return data;
  }, [shipmentDetails]);

  useEffect(() => {
    fetchShipmentDetails();
  }, [fetchShipmentDetails]);

  console.log("chartData", chartData);

  return (
    <div>
      <Typography variant="h5">Shipment Details</Typography>
      {shipmentDetails?.referenceName}
      TinyBarChartHERE. Create two cards one for the barChart and one for the
      lineChart. The third widjet should be a map. First two same container and
      column. Next to them the map.
      <LineChart width={500} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          label={{ value: "Time", position: "insideBottomRight", offset: 0 }}
        />
        <YAxis label={{ value: "Value", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#8884d8"
          name="Temperature (°C)"
        />
        <Line
          type="monotone"
          dataKey="humidity"
          stroke="#82ca9d"
          name="Humidity (%)"
        />
      </LineChart>
    </div>
  );
};

export default ShipmentDetails;
