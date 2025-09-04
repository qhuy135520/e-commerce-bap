import React from 'react'
import { Col, Row } from 'antd'
import ProductImage from '@/components/ui/productDetail/ProductImage.component'
import ProductInfo from '@/components/ui/productDetail/ProductInfo.component'
import { StyleProductDetail } from '@/pages/publicPages/ProductDetail/ProductDetail.styled'

export default function ProductDetail({ product }) {
  return (
    <StyleProductDetail>
      <Row gutter={[12, 12]}>
        <Col sm={12} lg={10}>
          <ProductImage />
        </Col>
        <Col sm={12} lg={14}>
          <ProductInfo />
        </Col>
      </Row>
    </StyleProductDetail>
  )
}
