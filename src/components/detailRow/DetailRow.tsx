import Typography from "@mui/material/Typography";
import { StyledFlex } from "./styledComponents";

type DetailRowProps = {
  label: string;
  value: string;
};

const DetailRow = ({ label, value }: DetailRowProps) => {
  return (
    <StyledFlex $spacingSize="12px" $alignItems="center" $wrap>
      <Typography variant="subtitle1">{label}:</Typography>
      <Typography variant="body1">{value}</Typography>
    </StyledFlex>
  );
};

export default DetailRow;
