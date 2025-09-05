import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterProducts } from '@/slices/productSlice'
import { ConfigProvider, Select } from 'antd'
import { ProductListWrapper, ProductTitle, StyledSelect } from './List.styled'
import LoadingComponent from '@/components/common/Loading.component'
import PaginatedGrid from '@/components/ui/PaginatedGrid'
import ProductCard from './Card.component'

const { Option } = Select

const ProductList = () => {
  const dispatch = useDispatch()
  const filteredProducts = useSelector(
    (state) => state.products.filteredProducts
  )
  const filterOption = useSelector((state) => state.products.filterOption)
  const status = useSelector((state) => state.products.status)
  const error = useSelector((state) => state.products.error)
  const sales = useSelector((state) => state.products.sales)

  const handleFilterChange = (value) => {
    dispatch(filterProducts(value))
  }

  return (
    <LoadingComponent
      isLoading={status === 'loading' || status === 'idle'}
      error={error}
    >
      <ConfigProvider
        theme={{
          components: {
            Select: {
              optionSelectedBg: 'var(--color-grey-200)',
              selectorBg: 'var(--color-grey-100)',
              optionActiveBg: 'var(--color-grey-100)',
            },
          },
          token: {
            colorBgContainer: 'var(--color-grey-100)',
            colorText: 'var(--color-grey-800)',
          },
        }}
      >
        <ProductListWrapper>
          <ProductTitle level={3}>Danh sách sản phẩm</ProductTitle>

          <StyledSelect
            placeholder='Sắp xếp'
            value={filterOption || undefined}
            onChange={handleFilterChange}
          >
            <Option value='sales'>Bán nhiều nhất</Option>
            <Option value='priceDesc'>Giá cao → thấp</Option>
            <Option value='priceAsc'>Giá thấp → cao</Option>
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
      </ConfigProvider>
    </LoadingComponent>
  )
}

export default ProductList

