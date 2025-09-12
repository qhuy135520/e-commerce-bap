import styled from "styled-components";

export const ChartsWrapper = styled.div`
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ChartContainer = styled.div`
  flex: 1;
  height: 300px;

  h3 {
    text-align: center;
  }
`;
