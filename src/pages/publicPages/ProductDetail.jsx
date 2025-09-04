import ProductImage from '@/components/ui/productDetail/ProductImage.component'
import ProductInfo from '@/components/ui/productDetail/ProductInfo.component'
import { Col, Row } from 'antd'
import React from 'react'
import styled from 'styled-components'

const StyleProductDetail = styled.div`
  padding: 1.8rem 2rem;
  width: 100%;
  background-color: var(--color-grey-50);
  border-radius: 2rem;
`

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
