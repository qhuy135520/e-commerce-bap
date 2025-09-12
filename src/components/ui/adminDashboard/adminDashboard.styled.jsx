import styled from "styled-components";

export const DashboardContainer = styled.div`
  padding: 1.5rem;
  min-height: 100vh;
`;

export const PieChartContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  width: 100%;
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const PieChartWrapper = styled.div`
  flex: 1;
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
