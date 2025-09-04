import styled from 'styled-components'

export const SlideWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 20px;
  background: #364d79;
`

export const ProductCard = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
`

export const ProductImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
`

export const ProductName = styled.h4`
  margin: 10px 0;
  font-size: 14px;
  color: #333;
`
