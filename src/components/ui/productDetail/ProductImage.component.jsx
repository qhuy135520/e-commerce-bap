import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { useProductDetail } from '@/hooks/productDetail/useProductDetail'

import {
  StyleImgWrapper,
  StyleImgDefault,
  StyleImgSlider,
  StyleImgItem,
} from '@/components/ui/productDetail/ProductImage.styled'

export default function ProductImage() {
  const { settings, images, mainImage, setMainImage } = useProductDetail()
  return (
    <StyleImgWrapper>
      <StyleImgDefault src={mainImage} alt='main-img' />
      <StyleImgSlider>
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index}>
              <StyleImgItem
                src={img}
                alt={`thumb-${index}`}
                $active={mainImage === img}
                onClick={() => setMainImage(img)}
                onMouseEnter={() => setMainImage(img)}
              />
            </div>
          ))}
        </Slider>
      </StyleImgSlider>
    </StyleImgWrapper>
  )
}
