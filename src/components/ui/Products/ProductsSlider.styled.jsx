import styled from 'styled-components'

export const ProductSliderContainer = styled.div`
  padding: 20px;
`

export const ProductCardWrapper = styled.div`
  padding: 10px;
`

export const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`

export const ProductImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 8px;
`

export const ProductName = styled.h3`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
`

export const ProductPrice = styled.p`
  color: red;
  font-weight: bold;
  margin: 4px 0 0;
`
