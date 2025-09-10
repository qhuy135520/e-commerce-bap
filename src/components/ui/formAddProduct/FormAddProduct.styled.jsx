import styled from "styled-components";

export const ChooseImage = styled.div`
  margin-top: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const PositonButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const OptionImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & input {
    width: fit-content;
    margin-right: 0.4rem;
  }
`;
