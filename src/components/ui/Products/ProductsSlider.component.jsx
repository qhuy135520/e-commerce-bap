import React from 'react'
import { Card } from 'antd'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import useProducts from '@/hooks/useProduct/useProducts'

import { ProductItem, ProductImage } from './ProductsList.styled'
import noimage from '@/assets/images/noImage/noimage.jpg'

const ProductsSlider = () => {
  const { handleNavigate, settings, topProducts, t } = useProducts()

  return (
    <Slider {...settings}>
      {topProducts.map((product) => (
        <ProductItem
          onClick={() => handleNavigate(product.id)}
          key={product.id}
        >
          <Card>
            <ProductImage src={product.image || noimage} alt={product.name} />
            <p>{product.name}</p>
            <p>{product.price}</p>
            <p>
              {t('productCard.sold')}: {product.total_sold}
            </p>
          </Card>
        </ProductItem>
      ))}
    </Slider>
  )
}

export default ProductsSlider
