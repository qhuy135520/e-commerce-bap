import React, { useEffect } from 'react'
import Slider from 'react-slick'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllProducts, fetchProductSales } from '@/slices/productSlice'
import noimage from '@/assets/images/noImage/noimage.jpg'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './slider.styled.scss'
import { formatCurrency } from '@/utils/helpers'

const ProductSlider = () => {
  const dispatch = useDispatch()
  const { sliderProducts } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchAllProducts())
    dispatch(fetchProductSales())
  }, [dispatch])

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  }

  return (
    <div className='product-slider-container'>
      <Slider {...settings}>
        {sliderProducts.map((product) => (
          <div key={product.id} className='product-card-wrapper'>
            <div className='product-card'>
              <img
                src={product.image_url || noimage}
                alt={product.name}
                className='product-image'
              />
              <h3 className='product-name'>{product.name}</h3>
              <p className='product-price'> {formatCurrency(product.price)}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default ProductSlider
