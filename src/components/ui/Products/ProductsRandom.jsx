import React from 'react'
import { Card } from 'antd'

import useProducts from '@/hooks/products/useProducts'

import * as Styled from '@/components/ui/products/ProductsList.styled'
import noimage from '@/assets/images/noImage/noimage.jpg'
import Title from 'antd/es/typography/Title'

export default function ProductsRandom() {
  const { randomProducts, handleNavigate, t } = useProducts()

  return (
    <>
      <Title level={2}>{t('productSuggest.title')}</Title>
      <Styled.RandomProductGrid>
        {randomProducts.map((product) => (
          <Styled.ProductItem
            onClick={() => handleNavigate(product.id)}
            key={product.id}
          >
            <Card>
              <Styled.ProductImage
                src={product.image || noimage}
                alt={product.name}
              />
              <p>{product.name}</p>
              <p>${product.price}</p>
              <p>
                {t('productCard.sold')}: {product.total_sold}
              </p>
            </Card>
          </Styled.ProductItem>
        ))}
      </Styled.RandomProductGrid>
    </>
  )
}
