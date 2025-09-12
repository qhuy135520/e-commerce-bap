import { Button, Col } from "antd";
import styled from "styled-components";

export const InfoVendor = styled.section`
  margin-top: 1.4rem;
  padding: 1.8rem 2rem;
  width: 100%;
  background-color: var(--color-grey-50);
  border-radius: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
`;

export const ColInfo = styled(Col)`
  width: 100%;
`;

export const FlexInfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.8rem;

  h3 {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--color-grey-900);
  }
`;

export const ButtonInfo = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 500;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
`;

export const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.6rem;
  padding: 1rem;
  background-color: var(--color-grey-100);
  transition: background 0.2s, transform 0.2s;

  &:hover {
    background-color: var(--color-grey-200);
    transform: translateY(-2px);
  }

  strong {
    font-size: 1.4rem;
    color: var(--color-grey-900);
    margin-bottom: 0.3rem;
  }

  p {
    margin: 0;
    font-size: 1rem;
    color: var(--color-grey-600);
  }
`;
