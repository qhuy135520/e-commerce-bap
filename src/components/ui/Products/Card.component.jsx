import React from 'react'

import { formatCurrency } from '@/utils/helpers'
import noImage from '@/assets/images/NoImage/noimage.jpg'

import {
  StyledCard,
  ProductImage,
  ProductPrice,
  ProductDescription,
} from './Card.styled'

const ProductCard = ({ product }) => {
  console.log(product)
  return (
    <StyledCard
      hoverable
      title={product.name}
      cover={
        <ProductImage
          alt={product.name}
          src={product.images[0]?.imageUrl || noImage}
        />
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

