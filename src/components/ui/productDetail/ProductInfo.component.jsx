import React from 'react'
import { Button, ConfigProvider, InputNumber, Space } from 'antd'
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
  const { value, setValue } = useProductDetail()
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            paddingBlock: 20,
            paddingInline: 20,
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
            {Array.from({ length: 5 }, (_, i) => (
              <svg
                key={i}
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='#fcc419'
                width='20'
              >
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
              </svg>
            ))}
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
            <Button onClick={() => setValue(Math.max(1, value - 1))}>-</Button>
            <InputNumber
              min={1}
              max={10}
              value={value}
              onChange={setValue}
              controls={false}
            />
            <Button onClick={() => setValue(Math.min(10, value + 1))}>+</Button>
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
