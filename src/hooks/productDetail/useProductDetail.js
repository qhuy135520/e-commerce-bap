import { useState } from 'react'

export function useProductDetail() {
  const [quantity, setQuantity] = useState(1)

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

  function handleIncrease() {
    setQuantity(Math.min(10, quantity + 1))
  }

  function handleDecrease() {
    setQuantity(Math.max(1, quantity - 1))
  }

  return {
    settings,
    images,
    mainImage,
    setMainImage,
    quantity,
    setQuantity,
    handleIncrease,
    handleDecrease,
  }
}
