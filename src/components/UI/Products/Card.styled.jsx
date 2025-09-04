import styled from 'styled-components'
import { Card, Typography } from 'antd'

const { Text } = Typography

export const StyledCard = styled(Card)`
  width: 100%;
  border-radius: 8px;
  border: 1px solid #fff;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-4px);
    border: 1px solid #fff;
    box-shadow: var(--shadow-md);
  }
`

export const ProductImage = styled.img`
  height: 200px;
  object-fit: cover;
  width: 100%;
`

export const ProductPrice = styled(Text)`
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
`

export const ProductDescription = styled(Text)`
  display: block;
`
export const SoldText = styled.p`
  font-size: 13px;
  color: #666;
`
