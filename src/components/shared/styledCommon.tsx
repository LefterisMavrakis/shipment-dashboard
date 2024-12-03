import styled from "styled-components";
import Flex from "./styledFlex";

export const Constraint = styled(Flex)`
  width: 100%;
  max-width: 1440px;
  padding: 0 20px;
  box-sizing: border-box;
  margin: 0 auto;
`;

export const Card = styled(Flex)`
  border-radius: 32px;
  box-sizing: border-box;
  width: 100%;
  background-color: #ffffff;
  min-width: 320px;
`;

export const IconBox = styled.div`
  width: 40px;
  height: 40px;
  background-color: #f2f4f5;
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

export const StyledFlexBox = styled(Flex)`
  width: 100%;
  padding: 12px 20px;
  box-sizing: border-box;
`;

export const StyledFlexBoxWithBorder = styled(StyledFlexBox)`
  border-bottom: 1px solid #f2f4f5;
`;
