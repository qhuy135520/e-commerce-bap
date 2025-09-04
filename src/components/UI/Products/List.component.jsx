import React from 'react'
import { useTranslation } from 'react-i18next'
import { ConfigProvider, Select } from 'antd'
import useProductData from '@/hooks/useProduct/useProductData'
import useProductListParams from '@/hooks/useProduct/useProductListParams'
import { ProductTitle, ProductListWrapper, StyledSelect } from './List.styled'
import LoadingComponent from '@/components/common/Loading.component'
import PaginatedGrid from '@/components/ui/PaginatedGrid'
import ProductCard from './Card.component'
import { PAGE_SIZE } from '@/constants'

const { Option } = Select

const ProductList = () => {
  const { t } = useTranslation(['product'])
  const { filteredProducts, status, error, sales, filterOption } =
    useProductData()
  const { sortParam, pageParam, items, updateParams } = useProductListParams(
    filteredProducts,
    filterOption
  )

  return (
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
        <ProductTitle level={3}>{t('productList.title')}</ProductTitle>
        <StyledSelect
          placeholder={t('productList.filter.placeholder')}
          value={sortParam || undefined}
          onChange={(val) => updateParams('sort', val)}
        >
          <Option value='sales'>{t('productList.filter.sales')}</Option>
          <Option value='priceDesc'>{t('productList.filter.priceDesc')}</Option>
          <Option value='priceAsc'>{t('productList.filter.priceAsc')}</Option>
        </StyledSelect>
        <LoadingComponent
          isLoading={status === 'loading' || status === 'idle'}
          error={error}
        >
          {status === 'succeeded' && (
            <PaginatedGrid
              items={items}
              pageSize={PAGE_SIZE.PRODUCT_LIST}
              currentPage={pageParam}
              totalCount={filteredProducts.length}
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
    </ConfigProvider>
  )
}

export default React.memo(ProductList)
