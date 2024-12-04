import { format } from "date-fns";
import { useNavigate } from "react-router";
import ConstructionIcon from "@mui/icons-material/Construction";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Company } from "../../api/types/types";
import { Card, IconBox, StyledFlexBox } from "../shared/styledCommon";
import Flex from "../shared/styledFlex";
import { StyledFlexBoxWithBorder } from "./styledComponents";

type CompanyItemProps = Company;

const COMPANY_TYPE_ICONS_MAP: Record<string, React.ReactElement> = {
  SEMI_FINISHED_PRODUCTS: <ConstructionIcon />,
  ELECTRICS_ELECTRONICS: <PrecisionManufacturingIcon />,
};

const CompanyItem = (props: CompanyItemProps) => {
  const navigate = useNavigate();

  const {
    companyId,
    name,
    businessType,
    registrationNumber,
    countryOfIncorporation,
    addressCountry,
    addressStreet,
    addressStreetNumber,
    addressZipCode,
    addressCity,
    verifiedDate,
    createdAt,
  } = props;

  const navigateToShipmentsModal = () => {
    navigate(`/shipments/${companyId}`);
  };

  const companyAddress = `${addressStreet} ${addressStreetNumber}, ${addressCity} ${addressZipCode} ${addressCountry}`;
  const verifiedAt = format(new Date(verifiedDate), "dd-MM-yyyy");
  const createdDate = format(new Date(createdAt), "dd-MM-yyyy");

  return (
    <>
      <Card flexDirection="column">
        <StyledFlexBoxWithBorder
          spacingSize="8px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex spacingSize="8px" alignItems="center">
            <IconBox>{COMPANY_TYPE_ICONS_MAP[businessType]}</IconBox>
            <Typography variant="h6">{name}</Typography>
          </Flex>

          <Button onClick={navigateToShipmentsModal} variant="text">
            Shipments
          </Button>
        </StyledFlexBoxWithBorder>

        <StyledFlexBox flexDirection="column" spacingSize="2px">
          <Flex spacingSize="2px" alignItems="center" wrap>
            <Typography variant="subtitle2">Address:</Typography>
            <Typography variant="subtitle1">{companyAddress}</Typography>
          </Flex>

          <Flex spacingSize="2px" alignItems="center" wrap>
            <Typography variant="subtitle2">Incorporation country:</Typography>
            <Typography variant="subtitle1">
              {countryOfIncorporation}
            </Typography>
          </Flex>

          <Flex spacingSize="2px" alignItems="center" wrap>
            <Typography variant="subtitle2">Registration number:</Typography>
            <Typography variant="subtitle1">{registrationNumber}</Typography>
          </Flex>

          <Flex spacingSize="2px" alignItems="center" wrap>
            <Typography variant="subtitle2">Verified at:</Typography>
            <Typography variant="subtitle1">{verifiedAt}</Typography>
          </Flex>

          <Flex spacingSize="2px" alignItems="center" wrap>
            <Typography variant="subtitle2">Created at:</Typography>
            <Typography variant="subtitle1">{createdDate}</Typography>
          </Flex>
        </StyledFlexBox>
      </Card>
    </>
  );
};

export default CompanyItem;
