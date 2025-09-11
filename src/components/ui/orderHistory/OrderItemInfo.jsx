import React from "react";
import { Button } from "antd";

import useReview from "@/hooks/order/useReview";

import { OrderHistoryTableStyled as OHTS, ReviewModal } from "@/components";

import { formatCurrency } from "@/utils/helpers";

export default function OrderItemInfo({ vendorProduct, orderStatus }) {
  const { isModalOpen, selectedProduct, openReviewModal, closeReviewModal, handleSubmitReview, loading, t } =
    useReview();
  console.log("producttt", vendorProduct);
  return (
    <>
      {vendorProduct.map((product, index) => (
        <OHTS.ItemInfo key={index}>
          <OHTS.ItemLeft>
            <OHTS.Image src={product.productImg} alt="product-img" />
            <OHTS.InfoItem>
              <p>{product.productName}</p>
              <p>x{product.quantity}</p>
              <OHTS.Price>{formatCurrency(product.price)}</OHTS.Price>
            </OHTS.InfoItem>
            <Button
              size="middle"
              onClick={() => openReviewModal(product)}
              disabled={product.isReviewed || orderStatus !== "completed"} // chỉ enable khi completed và chưa review
            >
              {product.isReviewed ? t("order.review.reviewed") : t("order.review.review")}
            </Button>
          </OHTS.ItemLeft>
        </OHTS.ItemInfo>
      ))}
      <ReviewModal
        visible={isModalOpen}
        onCancel={closeReviewModal}
        onSubmit={handleSubmitReview}
        product={selectedProduct}
        loading={loading}
      />
    </>
  );
}
