import React from 'react'
import noImage from '@/assets/images/NoImage/noimage.jpg'
import {
  StyledCard,
  ProductImage,
  ProductPrice,
  ProductDescription,
  SoldText,
} from './Card.styled'
import { formatCurrency } from '@/utils/helpers'
import { useTranslation } from 'react-i18next'

const ProductCard = ({ product, sold }) => {
  const { t } = useTranslation(['product'])
  return (
    <StyledCard
      hoverable
      title={product.name}
      cover={
        <ProductImage alt={product.name} src={product.image_url || noImage} />
      }
    >
      <ProductPrice>
        {t('productCard.price')}: {formatCurrency(product.price)}
      </ProductPrice>
      <ProductDescription>
        {product.description || t('productCard.noDescription')}
      </ProductDescription>

      <SoldText>Đã bán: {sold || 0}</SoldText>
    </StyledCard>
  )
}

export default ProductCard
