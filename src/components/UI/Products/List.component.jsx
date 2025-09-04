import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  syncWithURL,
  fetchProducts,
  fetchProductSales,
  fetchTopProducts,
  sortProductsBySales,
} from '@/slices/productSlice'
import ProductListHeader from '@/components/ui/Products/ListHeader.component'
import { ProductListWrapper } from './List.styled'
import LoadingComponent from '@/components/common/Loading.component'
import PaginatedGrid from '@/components/ui/PaginatedGrid'
import ProductCard from './Card.component'
import { PAGE_SIZE } from '@/constants'

const ProductList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const {
    filteredProducts,
    status,
    error,
    sales,
    filterOption,
    searchTerm,
    totalCount,
  } = useSelector((state) => state.products)
  const params = new URLSearchParams(location.search)
  const sortParam = params.get('sort') || ''
  const searchParam = params.get('search') || ''
  const pageParam = Number(params.get('page') || 1)

  useEffect(() => {
    dispatch(fetchTopProducts()).then(() => {
      dispatch(fetchProductSales()).then(() => {
        dispatch(sortProductsBySales())
      })
    })
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchProductSales())
  }, [dispatch])

  useEffect(() => {
    dispatch(syncWithURL({ sort: sortParam, search: searchParam }))
    dispatch(
      fetchProducts({
        sort: sortParam,
        search: searchParam,
        page: pageParam,
        pageSize: PAGE_SIZE.PRODUCT_LIST,
      })
    )
  }, [dispatch, sortParam, searchParam, pageParam])

  useEffect(() => {
    const newParams = new URLSearchParams()
    if (filterOption) newParams.set('sort', filterOption)
    if (searchTerm) newParams.set('search', searchTerm)
    if (pageParam !== 1) newParams.set('page', pageParam)
    navigate({ search: newParams.toString() }, { replace: true })
  }, [filterOption, searchTerm, pageParam, navigate])

  const updateParams = useCallback(
    (key, value) => {
      const newParams = new URLSearchParams(location.search)
      if (value) {
        newParams.set(key, value)
      } else {
        newParams.delete(key)
      }
      if (key !== 'page') newParams.set('page', '1')
      navigate({ search: newParams.toString() })
    },
    [location.search, navigate]
  )

  return (
    <ProductListWrapper>
      <ProductListHeader
        sortParam={sortParam}
        searchParam={searchParam}
        updateParams={updateParams}
      />
      <LoadingComponent
        isLoading={status === 'loading' || status === 'idle'}
        error={error}
      >
        {status === 'succeeded' && Object.keys(sales).length > 0 && (
          <PaginatedGrid
            items={filteredProducts}
            pageSize={PAGE_SIZE.PRODUCT_LIST}
            currentPage={pageParam}
            totalCount={totalCount}
            onPageChange={(page) => updateParams('page', page)}
            renderItem={(product) => (
              <ProductCard
                key={product.id}
                product={product}
                sold={sales?.[product.id] || 0}
              />
            )}
          />
        )}
      </LoadingComponent>
    </ProductListWrapper>
  )
}

export default ProductList
