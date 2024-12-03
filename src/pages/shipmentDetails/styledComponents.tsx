import styled from "styled-components";
import { Card } from "../../components/shared/styledCommon";
import Flex from "../../components/shared/styledFlex";

export const StyledCard = styled(Card)`
  @media (max-width: 900px) {
    flex-direction: row;
  }

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

export const StyledFlex = styled(Flex)`
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
