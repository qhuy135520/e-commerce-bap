import { Button, Col } from "antd";
import styled from "styled-components";

export const InfoVendor = styled.section`
  margin-top: 1.4rem;
  padding: 1.8rem 2rem;
  width: 100%;
  background-color: var(--color-grey-50);
  border-radius: 1rem;
`;
export const ColInfo = styled(Col)`
  width: 100%;
`;
export const FlexInfo = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const ButtonInfo = styled(Button)``;
export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.2rem;
`;
export const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.6rem;
  padding: 1rem;

  p {
    margin: 0;
    font-size: 1.4rem;
    color: var(--color-grey-600);
  }

  strong {
    font-size: 1.6rem;
    color: var(--color-grey-900);
  }
`;
