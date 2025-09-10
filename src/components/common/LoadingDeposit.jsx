import { Spin } from "antd";
import styled from "styled-components";

const FlexStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

function LoadingDeposit({ isLoading, children }) {
  if (isLoading) {
    return (
      <FlexStyled>
        <Spin />
      </FlexStyled>
    );
  }

  return children;
}

export default LoadingDeposit;
