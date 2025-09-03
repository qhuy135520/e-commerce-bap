import React from 'react'
import noImage from '@/assets/images/NoImage/noimage.jpg'
import {
  StyledCard,
  ProductImage,
  ProductPrice,
  ProductDescription,
} from './Card.styled'
import { formatCurrency } from '@/utils/helpers'

const ProductCard = ({ product }) => {
  return (
    <StyledCard
      hoverable
      title={product.name}
      cover={
        <ProductImage alt={product.name} src={product.image_url || noImage} />
      }
    >
      <ProductPrice>Giá: {formatCurrency(product.price)}</ProductPrice>
      <ProductDescription>
        {product.description || 'Không có mô tả'}
      </ProductDescription>
    </StyledCard>
  )
}

export default ProductCard
