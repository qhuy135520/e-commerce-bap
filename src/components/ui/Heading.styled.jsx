import styled, { css } from "styled-components";

const HeadingStyled = styled.h1`
  color: var(--color-grey-900);
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      padding: 20px;
      text-align: center;

      @media (max-width: 992px) {
        font-size: 2.6rem;
      }
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2.5rem;
      font-weight: 600;
    `}
    
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}

     ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
      padding: 1rem 2rem;
    `}
    ${(props) =>
    props.as === "h5" &&
    css`
      font-size: 1.5rem;
      font-weight: 600;
      text-align: center;
      padding: 1rem 2rem;
    `}

  line-height: 1.4;
`;

export default HeadingStyled;
