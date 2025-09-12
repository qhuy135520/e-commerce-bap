import styled from "styled-components";

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1.6rem 1rem;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  font-size: 2rem;
  font-weight: 600;
`;

export const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.6rem;

  p {
    margin: 0;
    font-size: 1.4rem;
    color: var(--color-grey-600);
  }
`;

export const Brand = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--color-grey-600);
`;

export const Description = styled.p`
  text-align: justify;
  font-size: 1.6rem;
  line-height: 1.7;
  color: var(--color-grey-800);
  margin: 0.6rem 0;
`;

export const Price = styled.div`
  font-size: 3rem;
  color: #ff4d4f;
  font-weight: 700;
`;

export const Stock = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

export const Quantity = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  span {
    font-weight: 600;
    font-size: 1.6rem;
  }

  button {
    font-weight: 600;
    font-size: 1.6rem;
  }
`;

export const Button = styled.div`
  display: flex;
  gap: 1.6rem;

  button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    font-weight: 600;
    font-size: 1.6rem;
    height: 52px;
    border-radius: 10px;
  }
`;

export const Param = styled.div`
  margin-top: 1rem;
  font-size: 1.5rem;
  color: var(--color-grey-700);
  padding: 1rem;
  border-left: 4px solid var(--color-grey-300);
  background-color: var(--color-grey-100);
  border-radius: 8px;
`;
