import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import Typography from "@mui/material/Typography";
import shipmentsAPI from "../../api/api";
import { ExtendedShipment } from "../../api/types/types";
import { format } from "date-fns";
import LocationMap from "../../components/locationMap/LocationMap";
import HumidityAndTemperatureBarChart, {
  BarChartData,
} from "../../components/humidityAndLocationBarChart/HumidityAndLocationBarChart";
import HumidityAndLocationLineChart, {
  LineChartData,
} from "../../components/humidityAndLocationLineChart/HumidityAndLocationLineChart";
import {
  StyledFlexBox,
  StyledFlexBoxWithBorder,
} from "../../components/shared/styledCommon";
import Flex from "../../components/shared/styledFlex";
import { StyledCard, StyledFlex } from "./styledComponents";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const ShipmentDetails = () => {
  const [shipmentDetails, setShipmentDetails] = useState<ExtendedShipment>();
  const { shipmentId } = useParams();
  const navigate = useNavigate();

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

  const lineChartData = useMemo(() => {
    if (!shipmentDetails) {
      return [];
    }

    const data: LineChartData = [];

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

  const lastTemperature =
    shipmentDetails?.temperature[shipmentDetails?.temperature.length - 1].v ??
    0;

  const lastHumidity =
    shipmentDetails?.humidity[shipmentDetails?.humidity.length - 1].v ?? 0;

  const barChartData: BarChartData = [
    {
      name: "Humidity (%)",
      value: lastHumidity,
    },
    {
      name: "Temperature (°C)",
      value: lastTemperature,
    },
  ];

  const navigateToShipmentsModal = () => {
    navigate(`/shipments/${shipmentDetails?.partnerCompanyId}`);
  };

  useEffect(() => {
    fetchShipmentDetails();
  }, [fetchShipmentDetails]);

  return (
    <Flex
      $flexDirection="column"
      $spacingSize="24px"
      $alignItems="flex-start"
      $fullwidth
    >
      <Button onClick={navigateToShipmentsModal} variant="text">
        <ArrowBackIosIcon />
        Back to company shipments
      </Button>

      <Typography variant="h5">Shipment Details</Typography>

      <StyledFlex $spacingSize="12px" $fullwidth>
        {!!shipmentDetails && (
          <StyledCard $flexDirection="column">
            {shipmentDetails?.status === "IN PROGRESS" && (
              <Flex
                data-testid="map-section"
                $flex={1}
                $flexDirection="column"
                $spacingSize="12px"
              >
                <StyledFlexBoxWithBorder>
                  <Typography variant="h6">Shipment location</Typography>
                </StyledFlexBoxWithBorder>
                <StyledFlexBox>
                  <LocationMap
                    lat={shipmentDetails.lat}
                    lng={shipmentDetails.lng}
                    shipmentId={shipmentDetails.shipmentId}
                  />
                </StyledFlexBox>
              </Flex>
            )}

            <Flex
              data-testid="information-section"
              $flex={1}
              $flexDirection="column"
              $spacingSize="12px"
            >
              <StyledFlexBoxWithBorder>
                <Typography variant="h6">Shipment information</Typography>
              </StyledFlexBoxWithBorder>
              <StyledFlexBox $flexDirection="column">
                <Flex $spacingSize="2px" $alignItems="center" $wrap>
                  <Typography variant="subtitle2">Shipment ID:</Typography>
                  <Typography variant="subtitle1">{shipmentId}</Typography>
                </Flex>

                <Flex $spacingSize="2px" $alignItems="center" $wrap>
                  <Typography variant="subtitle2">Status:</Typography>
                  <Typography variant="subtitle1">
                    {shipmentDetails.status}
                  </Typography>
                </Flex>

                <Flex $spacingSize="2px" $alignItems="center" $wrap>
                  <Typography variant="subtitle2">Reference name:</Typography>
                  <Typography variant="subtitle1">
                    {shipmentDetails.referenceName}
                  </Typography>
                </Flex>

                <Flex $spacingSize="2px" $alignItems="center" $wrap>
                  <Typography variant="subtitle2">Destination name:</Typography>
                  <Typography variant="subtitle1">
                    {shipmentDetails.destinationName}
                  </Typography>
                </Flex>

                <Flex $spacingSize="2px" $alignItems="center" $wrap>
                  <Typography variant="subtitle2">
                    Planned destination:
                  </Typography>
                  <Typography variant="subtitle1">
                    {format(
                      new Date(shipmentDetails.plannedDestination),
                      "dd MMM yyy hh:ss a"
                    )}
                  </Typography>
                </Flex>

                <Flex $spacingSize="2px" $alignItems="center" $wrap>
                  <Typography variant="subtitle2">Departure name:</Typography>
                  <Typography variant="subtitle1">
                    {shipmentDetails.departureName}
                  </Typography>
                </Flex>

                <Flex $spacingSize="2px" $alignItems="center" $wrap>
                  <Typography variant="subtitle2">
                    Planned departure:
                  </Typography>
                  <Typography variant="subtitle1">
                    {format(
                      new Date(shipmentDetails.plannedDeparture),
                      "dd MMM yyy hh:ss a"
                    )}
                  </Typography>
                </Flex>
              </StyledFlexBox>
            </Flex>
          </StyledCard>
        )}

        {shipmentDetails?.status === "IN PROGRESS" && (
          <StyledCard
            data-testid="environmental-conditions-section"
            $flexDirection="column"
          >
            <Flex $flex={1} $flexDirection="column" $spacingSize="12px">
              <Flex $flex={1} $flexDirection="column" $spacingSize="12px">
                <StyledFlexBoxWithBorder>
                  <Typography variant="h6">
                    Current environmental conditions
                  </Typography>
                </StyledFlexBoxWithBorder>
                <StyledFlexBox>
                  <HumidityAndTemperatureBarChart chartData={barChartData} />
                </StyledFlexBox>
              </Flex>
              <StyledFlexBoxWithBorder>
                <Typography variant="h6">
                  Environmental conditions timeline
                </Typography>
              </StyledFlexBoxWithBorder>
              <StyledFlexBox>
                <HumidityAndLocationLineChart chartData={lineChartData} />
              </StyledFlexBox>
            </Flex>
          </StyledCard>
        )}
      </StyledFlex>
    </Flex>
  );
};

export default ShipmentDetails;
