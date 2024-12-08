import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { format } from "date-fns";
import Typography from "@mui/material/Typography";
import WestIcon from "@mui/icons-material/West";
import shipmentsAPI from "../../api/api";
import { ExtendedShipment } from "../../api/types/types";
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
import { AppButton } from "../../components/shared/styledCommon";
import DetailRow from "../../components/detailRow/DetailRow";

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
      humidity: lastHumidity,
      temperature: lastTemperature,
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
      $spacingSize="32px"
      $alignItems="flex-start"
      $fullwidth
    >
      <Flex $spacingSize="8px" $alignItems="center">
        <WestIcon onClick={navigateToShipmentsModal} />
        <Typography variant="h5">Shipment Details</Typography>
      </Flex>

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
                <DetailRow
                  label="Shipment ID"
                  value={shipmentDetails.shipmentId}
                />
                <DetailRow label="Status" value={shipmentDetails.status} />

                <DetailRow
                  label="Reference name"
                  value={shipmentDetails.referenceName}
                />

                <DetailRow
                  label="Destination name"
                  value={shipmentDetails.destinationName}
                />

                <DetailRow
                  label="Planned destination"
                  value={format(
                    new Date(shipmentDetails.plannedDestination),
                    "dd MMM yyy hh:ss a"
                  )}
                />

                <DetailRow
                  label="Departure name"
                  value={shipmentDetails.departureName}
                />

                <DetailRow
                  label="Planned departure"
                  value={format(
                    new Date(shipmentDetails.plannedDeparture),
                    "dd MMM yyy hh:ss a"
                  )}
                />
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
