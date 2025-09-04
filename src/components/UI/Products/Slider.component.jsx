import { Carousel } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import noImage from '../../../assets/images/NoImage/noimage.jpg'
import {
  fetchTopProducts,
  fetchProductSales,
  sortProductsBySales,
} from '@/slices/productSlice'
import {
  SlideWrapper,
  ProductCard,
  ProductImage,
  ProductName,
} from './Slider.styled'

const chunkArray = (arr, size) => {
  return arr.reduce((chunks, item, index) => {
    const chunkIndex = Math.floor(index / size)
    if (!chunks[chunkIndex]) {
      chunks[chunkIndex] = []
    }
    chunks[chunkIndex].push(item)
    return chunks
  }, [])
}

const Slider = () => {
  const dispatch = useDispatch()
  const { topProducts } = useSelector((state) => state.products)

  const productChunks = chunkArray(topProducts, 3)

  return (
    <Carousel autoplay>
      {productChunks.map((chunk, i) => (
        <div key={i}>
          <SlideWrapper>
            {chunk.map((product) => (
              <ProductCard key={product.id}>
                <ProductImage
                  src={product.image_url || noImage}
                  alt={product.name}
                />
                <ProductName>{product.name}</ProductName>
              </ProductCard>
            ))}
          </SlideWrapper>
        </div>
      ))}
    </Carousel>
  )
}

export default Slider
