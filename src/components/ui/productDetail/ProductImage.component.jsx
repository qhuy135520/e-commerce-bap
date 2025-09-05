import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { useImage } from '@/hooks/productDetail/useImage'

import * as S from '@/components/ui/productDetail/ProductImage.styled'

export default function ProductImage({ productDetail, settings }) {
  const { mainImage, images, handleChangeImg } = useImage(productDetail)

  return (
    <S.StyleImgWrapper>
      <S.StyleImgDefault src={mainImage} alt='main-img' />
      <S.StyleImgSlider>
        <Slider {...settings}>
          {images?.length
            ? images.map((img, index) => (
                <div key={index}>
                  <S.StyleImgItem
                    src={img.imageUrl}
                    alt={`thumb-${index}`}
                    $active={mainImage === img.imageUrl}
                    onClick={handleChangeImg}
                    onMouseEnter={handleChangeImg}
                  />
                </div>
              ))
            : null}
        </Slider>
      </S.StyleImgSlider>
    </S.StyleImgWrapper>
  )
}
