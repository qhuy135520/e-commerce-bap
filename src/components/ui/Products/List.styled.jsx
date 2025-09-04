import styled from 'styled-components'
import { Select, Typography } from 'antd'

const { Title } = Typography

export const ProductListWrapper = styled.div`
  padding: 20px 0;
`

export const ProductTitle = styled(Title)`
  margin-bottom: 24px;
`

export const ErrorText = styled(Typography.Text)`
  display: block;
  text-align: center;
  margin-bottom: 16px;
`

export const StyledSelect = styled(Select)`
  width: 150px;
  margin-bottom: 20px;
`

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`
