import React from "react";
import { Button, ConfigProvider, InputNumber, Rate, Space } from "antd";
import { FaCartPlus } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";

import { HeadingStyled, ProductInfoStyled as PIS } from "@/components";

import { formatCurrency } from "@/utils/helpers";

export default function ProductInfo({ productDetail, quantity, onQuantity, onIncrease, onDecrease }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            paddingBlock: 20,
            paddingInline: 20,
          },
          Rate: {
            starBg: "var(--color-grey-300)",
          },
        },
        token: {
          borderRadius: 4,
        },
      }}
    >
      <PIS.ProductInfo>
        <PIS.Title>
          <HeadingStyled as="h2">{productDetail.name} </HeadingStyled>
          <PIS.Rating>
            3.2 &nbsp;
            <Rate defaultValue={3.5} allowHalf disabled />
            <p>Đã bán {productDetail.total_sold}</p>
          </PIS.Rating>
        </PIS.Title>
        <PIS.Brand>{productDetail.brandName}</PIS.Brand>
        <PIS.Description>{productDetail.description}</PIS.Description>
        <PIS.Price>{formatCurrency(productDetail.price)}</PIS.Price>
        <PIS.Quantity>
          <span> Số lượng:</span>
          <Space>
            <Button onClick={onDecrease}>-</Button>
            <InputNumber min={1} max={10} value={quantity} onChange={onQuantity} controls={false} />
            <Button onClick={onIncrease}>+</Button>
          </Space>
        </PIS.Quantity>
        <PIS.Button>
          <Button size="large" variant="outlined" color="red">
            <FaCartPlus />
            Thêm vào giỏ hàng
          </Button>
          <Button size="large" color="red" variant="solid">
            <MdOutlinePayments /> Mua ngay
          </Button>
        </PIS.Button>
        <p>{productDetail.param}</p>
      </PIS.ProductInfo>
    </ConfigProvider>
  );
}
