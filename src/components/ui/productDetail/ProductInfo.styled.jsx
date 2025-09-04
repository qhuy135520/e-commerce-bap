import styled from 'styled-components'

export const StyleProductInfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 0 2rem;
`

export const StyleTitle = styled.div``

export const StyleDescription = styled.p`
  text-align: justify;
`
export const StylePrice = styled.div`
  font-size: 3rem;
  color: red;
  font-weight: 600;
`
export const StyleRating = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;

  & p {
    margin-left: 1rem;
    font-weight: 500;
  }
`
export const StyleBrand = styled.div`
  font-size: 1.5rem;
  color: var(--color-grey-500);
`

export const StyleQuantity = styled.div`
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
`
export const StyleButton = styled.div`
  display: flex;
  gap: 2rem;

  & button {
    padding: 2.4rem 2rem;
    font-size: 1.8rem;
  }
`
