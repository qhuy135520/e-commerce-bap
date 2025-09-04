import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts, fetchProductSales } from '@/slices/productSlice'

const useProductData = () => {
  const dispatch = useDispatch()
  const { filteredProducts, status, error, sales, filterOption } = useSelector(
    (state) => state.products
  )

  useEffect(() => {
    dispatch(fetchAllProducts()).then(() => dispatch(fetchProductSales()))
  }, [dispatch])

  return { filteredProducts, status, error, sales, filterOption }
}

export default useProductData
