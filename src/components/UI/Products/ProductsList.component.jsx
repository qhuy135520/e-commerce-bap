import React, { useEffect } from 'react'
import { Card, Select, Pagination, ConfigProvider } from 'antd'
import Title from 'antd/es/typography/Title'

import { productsThunk } from '@/stores/rootThunk'
import useProducts from '@/hooks/useProduct/useProducts'

import * as Styled from './ProductsList.styled'
import LoadingComponent from '@/components/common/Loading.component'
import noimage from '@/assets/images/noImage/noimage.jpg'

const { Option } = Select

const ProductsList = () => {
  const {
    sortedProducts,
    status,
    error,
    sort,
    page,
    pageSize,
    handleSortChange,
    handlePageChange,
    paginatedProducts,
    handleSort,
    dispatch,
    handleNavigate,
    t,
  } = useProducts()

  useEffect(() => {
    dispatch(productsThunk.fetchAllProducts())
  }, [dispatch])

  useEffect(() => {
    handleSort()
  }, [sort, dispatch])

  return (
    <ConfigProvider>
      <Styled.Container>
        <Styled.box>
          <Title level={2}>{t('productList.title')}</Title>
          <Styled.StyledSelect
            value={sort || t('productList.filter.placeholder')}
            onChange={handleSortChange}
          >
            <Option value='price-asc'>
              {t('productList.filter.priceAsc')}
            </Option>
            <Option value='price-desc'>
              {t('productList.filter.priceDesc')}
            </Option>
            <Option value='sales-asc'>
              {t('productList.filter.salesAsc')}
            </Option>
            <Option value='sales-desc'>
              {t('productList.filter.salesDesc')}
            </Option>
          </Styled.StyledSelect>
        </Styled.box>

        <LoadingComponent isLoading={status === 'loading'} error={error}>
          <Styled.ProductGrid>
            {paginatedProducts.map((product) => (
              <Styled.ProductItem
                onClick={() => handleNavigate(product.id)}
                key={product.id}
              >
                <Card>
                  <Styled.ProductImage
                    src={product.images[0]?.imageUrl || noimage}
                    alt={product.name}
                  />
                  <p>{product.name}</p>
                  <p>${product.price}</p>
                  <p>
                    {t('productCard.sold')}: {product.total_sold}
                  </p>
                </Card>
              </Styled.ProductItem>
            ))}
          </Styled.ProductGrid>
          <Pagination
            align='center'
            current={page}
            pageSize={pageSize}
            total={sortedProducts.length}
            onChange={handlePageChange}
          />
        </LoadingComponent>
      </Styled.Container>
    </ConfigProvider>
  )
}

export default ProductsList
