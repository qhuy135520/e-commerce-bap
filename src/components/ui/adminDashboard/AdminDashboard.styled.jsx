import styled from "styled-components";

export const DashboardContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  border-radius: 20px;
  margin-top: 8rem;
`;

export const PieChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const TopPiesRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

export const PieChartWrapper = styled.div`
  flex: 1;
  min-width: 250px;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LineChartContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const ChartTitle = styled.h3`
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 20px;
  font-weight: 600;
`;

export const ToggleButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

export const ToggleButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--color-primary);
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 20px;

  &:hover {
    background-color: #bae0ff;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
`;

export const InfoProductWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-weight: 700;
  align-items: center;
`;
