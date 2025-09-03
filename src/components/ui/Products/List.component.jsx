import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterProducts } from '@/slices/productSlice'
import { Select } from 'antd'
import { ProductListWrapper, ProductTitle, StyledSelect } from './List.styled'
import LoadingComponent from '@/components/common/Loading.component'
import PaginatedGrid from '@/components/ui/PaginatedGrid'
import ProductCard from './Card.component'

const { Option } = Select

const ProductList = () => {
  const dispatch = useDispatch()
  const { filteredProducts, filterOption, status, error, sales } = useSelector(
    (state) => ({
      filteredProducts: state.products.filteredProducts,
      filterOption: state.products.filterOption,
      status: state.products.status,
      error: state.products.error,
      sales: state.products.sales,
    })
  )

  const handleFilterChange = (value) => {
    dispatch(filterProducts(value))
  }

  return (
    <LoadingComponent
      isLoading={status === 'loading' || status === 'idle'}
      error={error}
    >
      <ProductListWrapper>
        <ProductTitle level={3}>Danh sách sản phẩm</ProductTitle>

        <StyledSelect
          placeholder="Sắp xếp"
          value={filterOption || undefined}
          onChange={handleFilterChange}
        >
          <Option value="sales">Bán nhiều nhất</Option>
          <Option value="priceDesc">Giá cao → thấp</Option>
          <Option value="priceAsc">Giá thấp → cao</Option>
        </StyledSelect>

        {status === 'succeeded' && (
          <PaginatedGrid
            items={filteredProducts}
            columns={5}
            pageSize={20}
            renderItem={(product) => (
              <ProductCard
                key={product.id}
                product={product}
                sold={sales?.[product.id] || 0}
              />
            )}
          />
        )}
      </ProductListWrapper>
    </LoadingComponent>
  )
}

export default ProductList
