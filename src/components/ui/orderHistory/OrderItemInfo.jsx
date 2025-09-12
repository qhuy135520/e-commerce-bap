import React from "react";
import { Button } from "antd";
import useReview from "@/hooks/order/useReview";
import { OrderHistoryTableStyled as OHTS, ReviewModal } from "@/components";
import { formatCurrency } from "@/utils/helpers";
import NoImage from "@/assets/images/NoImage/noimage.jpg";

export default function OrderItemInfo({ vendorProduct, orderStatus }) {
  const { isModalOpen, selectedProduct, openReviewModal, closeReviewModal, handleSubmitReview, loading, t } =
    useReview();

  return (
    <>
      {vendorProduct.map((product) => (
        <OHTS.ProductRow key={product.orderDetailId}>
          <OHTS.ItemLeft>
            <OHTS.Image src={product.productImg || NoImage} alt={product.productName} />
            <OHTS.InfoItem>
              <strong>{product.productName}</strong>
              <OHTS.SmallMuted>Số lượng: x{product.quantity}</OHTS.SmallMuted>
              <OHTS.Price>{formatCurrency(product.price)}</OHTS.Price>
            </OHTS.InfoItem>
          </OHTS.ItemLeft>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.6rem" }}>
            <OHTS.SmallMuted>
              Thành tiền: <OHTS.Price>{formatCurrency(product.totalPrice)}</OHTS.Price>
            </OHTS.SmallMuted>
            <Button
              size="small"
              type={product.isReviewed ? "default" : "primary"}
              onClick={() => openReviewModal(product)}
              disabled={product.isReviewed || orderStatus !== "completed"}
            >
              {product.isReviewed ? t("order.review.reviewed") : t("order.review.review")}
            </Button>
          </div>
        </OHTS.ProductRow>
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
