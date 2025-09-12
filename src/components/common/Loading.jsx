import styled from "styled-components";
import { Spin } from "antd";

const Wrapper = styled.div`
  position: relative;
`;

const Overlay = styled.div`
  display: ${(props) => (props.$isLoading ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.6);
  z-index: 10;
`;

export default function Loading({ children, isLoading }) {
  return (
    <Wrapper>
      {children}
      <Overlay $isLoading={isLoading}>
        <Spin />
      </Overlay>
    </Wrapper>
  );
}
