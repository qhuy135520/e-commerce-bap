import React from 'react'
import { Button, ConfigProvider, InputNumber, Rate, Space } from 'antd'
import { FaCartPlus } from 'react-icons/fa'
import { MdOutlinePayments } from 'react-icons/md'

import Heading from '@/components/ui/Heading.styled'

import { formatCurrency } from '@/utils/helpers'

import * as S from './ProductInfo.styled'

export default function ProductInfo({
  productDetail,
  quantity,
  onQuantity,
  onIncrease,
  onDecrease,
}) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            paddingBlock: 20,
            paddingInline: 20,
          },
          Rate: {
            starBg: 'var(--color-grey-300)',
          },
        },
        token: {
          borderRadius: 4,
        },
      }}
    >
      <S.StyleProductInfo>
        <S.StyleTitle>
          <Heading as='h2'>{productDetail.name} </Heading>
          <S.StyleRating>
            3.2 &nbsp;
            <Rate defaultValue={3.5} allowHalf disabled />
            <p>Đã bán {productDetail.total_sold}</p>
          </S.StyleRating>
        </S.StyleTitle>
        <S.StyleBrand>{productDetail.brandName}</S.StyleBrand>
        <S.StyleDescription>{productDetail.description}</S.StyleDescription>
        <S.StylePrice>{formatCurrency(productDetail.price)}</S.StylePrice>
        <S.StyleQuantity>
          <span> Số lượng:</span>
          <Space>
            <Button onClick={onDecrease}>-</Button>
            <InputNumber
              min={1}
              max={10}
              value={quantity}
              onChange={onQuantity}
              controls={false}
            />
            <Button onClick={onIncrease}>+</Button>
          </Space>
        </S.StyleQuantity>
        <S.StyleButton>
          <Button size='large' variant='outlined' color='red'>
            <FaCartPlus />
            Thêm vào giỏ hàng
          </Button>
          <Button size='large' color='red' variant='solid'>
            <MdOutlinePayments /> Mua ngay
          </Button>
        </S.StyleButton>
        <p>{productDetail.param}</p>
      </S.StyleProductInfo>
    </ConfigProvider>
  )
}
