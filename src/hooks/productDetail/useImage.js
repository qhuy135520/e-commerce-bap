import { useEffect, useState } from 'react'

export function useImage(product) {
  const [mainImage, setMainImage] = useState(null)
  const images = product.images

  useEffect(() => {
    if (images.length) {
      setMainImage(images[0].imageUrl)
    } else {
      setMainImage(null)
    }
  }, [images])

  function handleChangeImg() {
    setMainImage(img.imageUrl)
  }

  return { mainImage, setMainImage, images, handleChangeImg }
}
