import styled from "styled-components";

export const GridContainer = styled.div`
  width: 100%;
  display: grid;
  flex-direction: column;
  gap: 16px;
  grid-template-columns: repeat(3, minmax(280px, 1fr));

  @media (max-width: 1150px) {
    grid-template-columns: repeat(2, minmax(280px, 1fr));
  }

  @media (max-width: 767px) {
    grid-template-columns: repeat(1, minmax(280px, 1fr));
  }
`;
