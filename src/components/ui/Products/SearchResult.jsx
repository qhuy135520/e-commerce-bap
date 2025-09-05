import PaginatedGrid from '@/components/ui/PaginatedGrid'
import ProductCard from '@/components/ui/Products/Card.component'
import { ProductListWrapper } from '@/components/ui/Products/List.styled'
import {
  setSearchTerm,
  selectFilteredProducts,
  selectStatus,
  fetchAllProducts,
} from '@/slices/productSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

export default function SearchResult() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') || ''
  const dispatch = useDispatch()
  const products = useSelector(selectFilteredProducts)
  const status = useSelector(selectStatus)

  // ⬇️ Lấy toàn bộ products khi trang search mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllProducts())
    }
  }, [status, dispatch])

  // ⬇️ Cập nhật searchTerm khi query thay đổi
  useEffect(() => {
    dispatch(setSearchTerm(query))
  }, [query, dispatch])

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'succeeded' && !products.length)
    return <p>No results for "{query}"</p>

  return (
    <ProductListWrapper>
      {status === 'succeeded' && (
        <PaginatedGrid
          items={products}
          columns={5}
          pageSize={20}
          renderItem={(product) => (
            <ProductCard key={product.id} product={product} />
          )}
        />
      )}
    </ProductListWrapper>
  )
}
