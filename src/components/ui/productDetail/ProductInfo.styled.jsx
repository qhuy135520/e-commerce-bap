import styled from "styled-components";

export const ProductInfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 0 0.4rem;
`;

export const Title = styled.div``;

export const Description = styled.p`
  text-align: justify;
`;
export const Price = styled.div`
  font-size: 3rem;
  color: red;
  font-weight: 600;
`;
export const Rating = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;

  & p {
    margin-left: 1rem;
    font-weight: 500;
  }
`;
export const Brand = styled.div`
  font-size: 1.5rem;
  color: var(--color-grey-500);
`;

export const Quantity = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  & button {
    font-weight: 700;
    font-size: 1.8rem;
  }

  & span {
    font-weight: 700;
  }
`;
export const Button = styled.div`
  display: flex;
  gap: 2rem;
`;
