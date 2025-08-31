import styled from "styled-components";

const StyleContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
`;
export default function Container({ children }) {
  return (
    <StyleContainer>
      <div>{children}</div>
    </StyleContainer>
  );
}
