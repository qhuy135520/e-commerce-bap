import React from 'react'
import { Button, ConfigProvider, InputNumber, Rate, Space } from 'antd'
import { FaCartPlus } from 'react-icons/fa'
import { MdOutlinePayments } from 'react-icons/md'

import { useProductDetail } from '@/hooks/productDetail/useProductDetail'

import Heading from '@/components/ui/Heading'
import {
  StyleProductInfo,
  StyleTitle,
  StyleRating,
  StyleBrand,
  StyleDescription,
  StylePrice,
  StyleQuantity,
  StyleButton,
} from './ProductInfo.styled'

export default function ProductInfo() {
  const { quantity, setQuantity, handleIncrease, handleDecrease } = useProductDetail()
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
      <StyleProductInfo>
        <StyleTitle>
          <Heading as='h2'>Điện thoại Apple iPhone 15 Plus 128GB </Heading>
          <StyleRating>
            3.2 &nbsp;
            <Rate defaultValue={3.5} allowHalf disabled />
            <p>2.1k Đánh giá</p>
          </StyleRating>
        </StyleTitle>
        <StyleBrand>Iphone</StyleBrand>
        <StyleDescription>
          An iPhone is a line of smartphones designed and sold by Apple Inc.,
          known for its iOS operating system, a multitouch touchscreen
          interface, and an integrated mobile computing experience
        </StyleDescription>
        <StylePrice>19.840.000 VND</StylePrice>
        <StyleQuantity>
          <span> Số lượng:</span>
          <Space>
            <Button onClick={handleDecrease}>-</Button>
            <InputNumber
              min={1}
              max={10}
              value={quantity}
              onChange={setQuantity}
              controls={false}
            />
            <Button onClick={handleIncrease}>+</Button>
          </Space>
        </StyleQuantity>
        <StyleButton>
          <Button size='large' variant='outlined' color='red'>
            <FaCartPlus />
            Thêm vào giỏ hàng
          </Button>
          <Button size='large' color='red' variant='solid'>
            <MdOutlinePayments /> Mua ngay
          </Button>
        </StyleButton>
      </StyleProductInfo>
    </ConfigProvider>
  )
}
