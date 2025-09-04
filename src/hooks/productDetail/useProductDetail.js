import { useState } from 'react'

export function useProductDetail() {
  const [value, setValue] = useState(1)

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  }

  const images = [
    'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llm05p5nrfbjcc.webp',
    'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llm05p5nq0r39c.webp',
    'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llm05p5nom6n41.webp',
    'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llm05p5nu8gf2a.webp',
    'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llm05p5nzuq72a.webp',
  ]

  const [mainImage, setMainImage] = useState(images[0])

  return { settings, images, mainImage, setMainImage, value, setValue }
}
