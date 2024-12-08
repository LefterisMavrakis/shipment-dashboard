import styled from "styled-components";
import Flex from "../shared/styledFlex";

export const StyledFlex = styled(Flex)`
  @media (max-width: 400px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
`;
