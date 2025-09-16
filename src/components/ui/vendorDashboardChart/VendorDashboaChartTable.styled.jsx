import styled from "styled-components";

export const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: var(--color-grey-200);
  border-radius: 20px;
`;

export const PieChartContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  flex-wrap: wrap;
  width: 100%;
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: var(--color-grey-200);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const PieChartWrapper = styled.div`
  /* flex: 1; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  max-width: 350px;
`;

export const LineChartContainer = styled.div`
  margin-top: 2.5rem;
  width: 100%;
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ChartTitle = styled.h3`
  text-align: center;
  color: blue;
`;

export const InfoProductWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-weight: 700;
  align-items: center;
`;

export const ChartCircleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;
