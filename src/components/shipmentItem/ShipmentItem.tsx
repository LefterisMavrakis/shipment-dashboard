import { format } from "date-fns";
import { NavLink } from "react-router";
import Typography from "@mui/material/Typography";
import { Shipment } from "../../api/types/types";
import Flex from "../shared/styledFlex";
import { ShipmentCard } from "./styledComponents";
import { StyledFlexBox } from "../shared/styledCommon";

type ShipmentItemProps = Shipment;

const ShipmentItem = (props: ShipmentItemProps) => {
  const {
    shipmentId,
    referenceName,
    status,
    destinationName,
    departureName,
    plannedDeparture,
    plannedDestination,
  } = props;

  const plannedDepartureDate = format(new Date(plannedDeparture), "dd-MM-yyyy");
  const plannedDestinationDate = format(
    new Date(plannedDestination),
    "dd-MM-yyyy"
  );

  return (
    <ShipmentCard>
      <NavLink to={`/details/${shipmentId}`}>
        <StyledFlexBox flexDirection="column">
          <Flex spacingSize="2px" alignItems="center" wrap>
            <Typography variant="subtitle2">Shipment ID:</Typography>
            <Typography variant="subtitle1">{shipmentId}</Typography>
          </Flex>

          <Flex spacingSize="2px" alignItems="center" wrap>
            <Typography variant="subtitle2">Status:</Typography>
            <Typography variant="subtitle1">{status}</Typography>
          </Flex>

          <Flex spacingSize="2px" alignItems="center" wrap>
            <Typography variant="subtitle2">Reference name:</Typography>
            <Typography variant="subtitle1">{referenceName}</Typography>
          </Flex>

          <Flex spacingSize="2px" alignItems="center" wrap>
            <Typography variant="subtitle2">Destination name:</Typography>
            <Typography variant="subtitle1">{destinationName}</Typography>
          </Flex>

          <Flex spacingSize="2px" alignItems="center" wrap>
            <Typography variant="subtitle2">Planned destination:</Typography>
            <Typography variant="subtitle1">
              {plannedDestinationDate}
            </Typography>
          </Flex>

          <Flex spacingSize="2px" alignItems="center" wrap>
            <Typography variant="subtitle2">Departure name:</Typography>
            <Typography variant="subtitle1">{departureName}</Typography>
          </Flex>

          <Flex spacingSize="2px" alignItems="center" wrap>
            <Typography variant="subtitle2">Planned departure:</Typography>
            <Typography variant="subtitle1">{plannedDepartureDate}</Typography>
          </Flex>
        </StyledFlexBox>
      </NavLink>
    </ShipmentCard>
  );
};

export default ShipmentItem;
