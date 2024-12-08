import { format } from "date-fns";
import { useNavigate } from "react-router";
import Typography from "@mui/material/Typography";
import { Company } from "../../api/types/types";
import iconElectronics from "../../assets/svg/electronic.svg";
import iconSemiFinished from "../../assets/svg/semi_finished.svg";
import { Card, GradientIconBox, StyledFlexBox } from "../shared/styledCommon";
import Flex from "../shared/styledFlex";
import { StyledFlexBoxWithBorder } from "../shared/styledCommon";
import { AppButton } from "../shared/styledCommon";
import EastIcon from "@mui/icons-material/East";
import DetailRow from "../detailRow/DetailRow";

type CompanyItemProps = Company;

const COMPANY_TYPE_ICONS_MAP: Record<string, React.ReactElement> = {
  SEMI_FINISHED_PRODUCTS: (
    <GradientIconBox>
      <img src={iconSemiFinished} alt="" />
    </GradientIconBox>
  ),
  ELECTRICS_ELECTRONICS: (
    <GradientIconBox>
      <img src={iconElectronics} alt="" />
    </GradientIconBox>
  ),
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
      <Card $flexDirection="column" data-testid="company-item">
        <StyledFlexBoxWithBorder
          $spacingSize="8px"
          $alignItems="center"
          $justifyContent="space-between"
        >
          <Flex $spacingSize="12px" $alignItems="center">
            {COMPANY_TYPE_ICONS_MAP[businessType]}

            <Typography variant="h6" style={{ fontWeight: "800" }}>
              {name}
            </Typography>
          </Flex>

          <AppButton
            onClick={navigateToShipmentsModal}
            variant="contained"
            data-testid="shipments-button"
          >
            <Flex $spacingSize="8px" $alignItems="center">
              <Typography variant="body2" style={{ fontWeight: "700" }}>
                Shipments
              </Typography>
              <EastIcon />
            </Flex>
          </AppButton>
        </StyledFlexBoxWithBorder>

        <StyledFlexBox $flexDirection="column" $spacingSize="8px">
          <DetailRow label={"Address"} value={companyAddress} />
          <DetailRow
            label={"Incorporation country"}
            value={countryOfIncorporation}
          />
          <DetailRow label={"Registration number"} value={registrationNumber} />
          <DetailRow label={"Verified at"} value={verifiedAt} />
          <DetailRow label={"Created at"} value={createdDate} />
        </StyledFlexBox>
      </Card>
    </>
  );
};

export default CompanyItem;
