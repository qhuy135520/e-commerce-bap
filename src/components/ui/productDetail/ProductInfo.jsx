import React, { useMemo } from "react";
import { Button, ConfigProvider, InputNumber, Rate, Space } from "antd";
import { FaCartPlus } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";

import { HeadingStyled, ProductInfoStyled as PIS } from "@/components";
import { formatCurrency } from "@/utils/helpers";
import { useUser } from "@/hooks/authentication/useUser";

export default function ProductInfo({
  productDetail,
  quantity,
  onQuantity,
  onIncrease,
  onDecrease,
  handleAddProductToCart,
  isLoadingCart,
}) {
  const { user } = useUser();

  // ⭐ Tính rating trung bình
  const avgRating = useMemo(() => {
    if (!productDetail.reviews?.length) return 0;
    const sum = productDetail.reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / productDetail.reviews.length).toFixed(1);
  }, [productDetail.reviews]);

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
          borderRadius: 6,
        },
      }}
    >
      <PIS.ProductInfo>
        {/* Tên + rating */}
        <PIS.Title>
          <HeadingStyled as="h2">{productDetail.name}</HeadingStyled>
          <PIS.Rating>
            <strong>{avgRating}</strong>
            <Rate allowHalf disabled value={avgRating} />
            <p>({productDetail.reviews?.length || 0} đánh giá)</p>
            <p>Đã bán {productDetail.total_sold}</p>
          </PIS.Rating>
        </PIS.Title>

        {/* Brand */}
        <PIS.Brand>{productDetail.brandName}</PIS.Brand>

        {/* Mô tả */}
        <PIS.Description>{productDetail.description}</PIS.Description>

        {/* Giá */}
        <PIS.Price>{formatCurrency(productDetail.price)}</PIS.Price>

        {/* Stock */}
        <PIS.Stock>Còn lại: {productDetail.stock} sản phẩm</PIS.Stock>

        {/* Số lượng */}
        <PIS.Quantity>
          <span>Số lượng:</span>
          <Space>
            <Button onClick={onDecrease} disabled={quantity <= 1}>
              -
            </Button>
            <InputNumber min={1} max={productDetail.stock} value={quantity} onChange={onQuantity} controls={false} />
            <Button onClick={onIncrease} disabled={quantity >= productDetail.stock}>
              +
            </Button>
          </Space>
        </PIS.Quantity>

        {/* Nút hành động */}
        <PIS.Button>
          <Button
            size="large"
            variant="outlined"
            color="red"
            onClick={() => handleAddProductToCart(productDetail.id, quantity)}
            disabled={isLoadingCart || user?.role !== "customer"}
          >
            <FaCartPlus /> Thêm vào giỏ hàng
          </Button>
          <Button size="large" color="red" variant="solid">
            <MdOutlinePayments /> Mua ngay
          </Button>
        </PIS.Button>

        {/* Thông số param */}
        {productDetail.param && <PIS.Param>{productDetail.param}</PIS.Param>}
      </PIS.ProductInfo>
    </ConfigProvider>
  );
}
