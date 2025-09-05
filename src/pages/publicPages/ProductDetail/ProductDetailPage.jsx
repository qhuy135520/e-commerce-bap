import React from 'react'
import { useParams } from 'react-router-dom'
import { Col, Row } from 'antd'

import InfoVendor from '@/components/ui/infoVendor/InfoVendor.component'
import ProductImage from '@/components/ui/productDetail/ProductImage.component'
import ProductInfo from '@/components/ui/productDetail/ProductInfo.component'
import LoadingComponent from '@/components/common/Loading.component'

import { useProductDetail } from '@/hooks/productDetail/useProductDetail'

import * as S from '@/pages/publicPages/ProductDetail/ProductDetail.styled'

export default function ProductDetail() {
  const { id } = useParams()
  const {
    isLoadingProduct,
    settings,
    productDetail,
    quantity,
    setQuantity,
    handleIncrease,
    handleDecrease,
  } = useProductDetail(id)

  return (
    <LoadingComponent isLoading={isLoadingProduct}>
      <S.StyleProductPage>
        <S.StyleProductDetail>
          <Row gutter={[12, 12]}>
            <Col sm={12} lg={10}>
              <ProductImage productDetail={productDetail} settings={settings} />
            </Col>
            <Col sm={12} lg={14}>
              <ProductInfo
                productDetail={productDetail}
                quantity={quantity}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onQuantity={setQuantity}
              />
            </Col>
          </Row>
        </S.StyleProductDetail>
        <InfoVendor />
      </S.StyleProductPage>
    </LoadingComponent>
  )
}
