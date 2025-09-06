import styled from "styled-components";

export const About = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-grey-800);
  & p {
    padding: 1.8rem 0 2.8rem;
  }
  & hr {
    width: 80%;
    margin: 0.4rem 0 1.4rem;
  }
`;

export const Img = styled.img`
  width: 50%;
`;
