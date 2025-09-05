import { Button, Col } from 'antd'
import styled from 'styled-components'

export const StyleInfoVendor = styled.section`
  margin-top: 1.4rem;
  padding: 1.8rem 2rem;
  width: 100%;
  background-color: var(--color-grey-50);
  border-radius: 1rem;
`
export const StyleCol = styled(Col)`
  width: 100%;
`
export const StyleFlex = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`

export const StyleButton = styled(Button)``
export const StyleGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.2rem;
`
export const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.6rem;
  padding: 1rem;

  p {
    margin: 0;
    font-size: 1.4rem;
    color: var(--color-grey-600);
  }

  strong {
    font-size: 1.6rem;
    color: var(--color-grey-900);
  }
`