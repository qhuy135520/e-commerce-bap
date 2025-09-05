import { Row } from 'antd'
import React from 'react'
import { CiShop } from 'react-icons/ci'

import Heading from '@/components/ui/Heading'

import * as S from '@/components/ui/infoVendor/InfoVendor.styled'

export default function InfoVendor() {
  return (
    <S.StyleInfoVendor>
      <Row gutter={[0, 12]}>
        <S.StyleCol sm={24} lg={8}>
          <S.StyleFlex>
            <Heading as='h3'>Apple FlagShip Store</Heading>
            <S.StyleButton size='medium' color='blue' variant='outlined'>
              <CiShop size='20' /> Xem Shop
            </S.StyleButton>
          </S.StyleFlex>
        </S.StyleCol>
        <S.StyleCol sm={24} lg={16}>
          <S.StyleGrid>
            <S.GridItem>
              <strong>4.8/5</strong>
              <p>Tham gia</p>
            </S.GridItem>
            <S.GridItem>
              <strong>120</strong>
              <p>Sản phẩm</p>
            </S.GridItem>
            <S.GridItem>
              <strong>3.5k</strong>
              <p>Lượt bán</p>
            </S.GridItem>
          </S.StyleGrid>
        </S.StyleCol>
      </Row>
    </S.StyleInfoVendor>
  )
}
