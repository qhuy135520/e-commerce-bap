import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ProductImageStyled as PIS } from "@/components";

import { useImage } from "@/hooks/productDetail/useImage";

export default function ProductImage({ productDetail, settings }) {
  const { mainImage, images, handleChangeImg } = useImage(productDetail);

  return (
    <PIS.ImgWrapper>
      <PIS.ImgDefault src={mainImage} alt="main-img" />
      <PIS.ImgSlider>
        <Slider {...settings}>
          {images?.length
            ? imagePIS.map((img, index) => (
                <div key={index}>
                  <PIS.ImgItem
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
      </PIS.ImgSlider>
    </PIS.ImgWrapper>
  );
}
