import { Row } from 'antd'
import React from 'react'
import { CiShop } from 'react-icons/ci'

import Heading from '@/components/ui/Heading.styled'

import { InfoVendorStyled as IS } from '@/components/ui/infoVendor'

export default function InfoVendor() {
  return (
    <IS.InfoVendor>
      <Row gutter={[0, 12]}>
        <IS.ColInfo sm={24} lg={8}>
          <IS.FlexInfo>
            <Heading as='h3'>Apple FlagShip Store</Heading>
            <IS.Button size='medium' color='blue' variant='outlined'>
              <CiShop size='20' /> Xem Shop
            </IS.Button>
          </IS.FlexInfo>
        </IS.ColInfo>
        <IS.ColInfo sm={24} lg={16}>
          <IS.Grid>
            <IS.GridItem>
              <strong>4.8/5</strong>
              <p>Tham gia</p>
            </IS.GridItem>
            <IS.GridItem>
              <strong>120</strong>
              <p>Sản phẩm</p>
            </IS.GridItem>
            <IS.GridItem>
              <strong>3.5k</strong>
              <p>Lượt bán</p>
            </IS.GridItem>
          </IS.Grid>
        </IS.ColInfo>
      </Row>
    </IS.InfoVendor>
  )
}
