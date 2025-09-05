import LoadingComponent from '@/components/common/Loading.component'
import PaginatedGrid from '@/components/ui/PaginatedGrid'
import ProductCard from '@/components/ui/Products/Card.component'
import { ProductListWrapper } from '@/components/ui/Products/List.styled'

import useSearchProducts from '@/hooks/useProduct/useSearchProduct'

export default function SearchResult() {
  const { products, status, query } = useSearchProducts()

  if (status === 'loading') return <LoadingComponent isLoading={true} />
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
