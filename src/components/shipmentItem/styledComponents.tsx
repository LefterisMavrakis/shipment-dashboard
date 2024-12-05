import styled from "styled-components";
import { Card } from "../shared/styledCommon";

export const ShipmentCard = styled(Card)`
  background-color: #f2f4f5;

  &:hover {
    background-color: #e6e8e9;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
