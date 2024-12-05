import styled from "styled-components";

const Flex = styled.div<{
  $spacingSize?:
    | "2px"
    | "4px"
    | "8px"
    | "12px"
    | "16px"
    | "18px"
    | "24px"
    | "32px";

  $flexDirection?: "row" | "column";
  $justifyContent?:
    | "space-around"
    | "space-between"
    | "space-evenly"
    | "center"
    | "flex-start"
    | "flex-end"
    | "initial"
    | "inherit";
  $alignItems?:
    | "stretch"
    | "center"
    | "flex-start"
    | "flex-end"
    | "baseline"
    | "initial"
    | "inherit";
  $alignSelf?:
    | "stretch"
    | "center"
    | "flex-start"
    | "flex-end"
    | "baseline"
    | "initial"
    | "inherit";
  $flex?: number | string;
  $wrap?: boolean;
  $fullwidth?: boolean;
}>`
  display: flex;

  ${({ $justifyContent }) =>
    $justifyContent &&
    `
    justify-content: ${$justifyContent};
  `}

  ${({ $flex }) =>
    $flex &&
    `
    flex: ${$flex};
  `}

   ${({ $fullwidth }) =>
    $fullwidth &&
    `
    width: 100%;
  `}


  ${({ $alignItems }) =>
    $alignItems &&
    `
    align-items: ${$alignItems};
  `}

  ${({ $alignSelf }) =>
    $alignSelf &&
    `
    align-self: ${$alignSelf};
  `}

  flex-direction: ${({ $flexDirection }) => $flexDirection ?? "row"};
  gap: ${({ $spacingSize }) => $spacingSize};

  ${({ $wrap }) =>
    $wrap &&
    `
    flex-wrap: wrap;
  `}
`;

export default Flex;
