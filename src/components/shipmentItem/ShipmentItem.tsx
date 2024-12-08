import { format } from "date-fns";
import { NavLink } from "react-router";
import Typography from "@mui/material/Typography";
import { Shipment } from "../../api/types/types";
import Flex from "../shared/styledFlex";
import EastIcon from "@mui/icons-material/East";
import { AppButton } from "../shared/styledCommon";
import DetailRow from "../detailRow/DetailRow";

type ShipmentItemProps = Shipment & { index: number };

const ShipmentItem = (props: ShipmentItemProps) => {
  const {
    shipmentId,
    referenceName,
    status,
    destinationName,
    departureName,
    plannedDeparture,
    plannedDestination,
    index,
  } = props;

  const plannedDepartureDate = format(new Date(plannedDeparture), "dd-MM-yyyy");
  const plannedDestinationDate = format(
    new Date(plannedDestination),
    "dd-MM-yyyy"
  );

  return (
    <Flex $flexDirection="column" $spacingSize="12px">
      <Flex
        $justifyContent="space-between"
        $alignItems="center"
        $spacingSize="8px"
      >
        <Typography
          variant="subtitle1"
          style={{ fontWeight: "800", color: "#66637A" }}
        >
          Shipment {index}
        </Typography>

        <NavLink to={`/details/${shipmentId}`}>
          <AppButton variant="contained">
            <Flex $spacingSize="8px" $alignItems="center">
              <Typography variant="body2" style={{ fontWeight: "700" }}>
                Details
              </Typography>
              <EastIcon />
            </Flex>
          </AppButton>
        </NavLink>
      </Flex>

      <Flex $flexDirection="column" $spacingSize="8px">
        <DetailRow label={"Shipment ID"} value={shipmentId} />
        <DetailRow label={"Status"} value={status} />
        <DetailRow label={"Reference name"} value={referenceName} />
        <DetailRow label={"Destination name"} value={destinationName} />
        <DetailRow
          label={"Planned destination"}
          value={plannedDestinationDate}
        />
        <DetailRow label={"Departure name"} value={departureName} />
        <DetailRow label={"Planned departure"} value={plannedDepartureDate} />
      </Flex>
    </Flex>
  );
};

export default ShipmentItem;
