import { Button } from "antd";
import { formatDate } from "date-fns";

import { Loading } from "@/components/common";
import ReviewModal from "@/components/ui/orderHistory/ReviewModal";
import { OrderVendor } from "@/components/ui/orderHistory";

import useOrderHistory from "@/hooks/order/useOrderHistory";
import useReview from "@/hooks/order/useReview";

import { formatCurrency } from "@/utils/helpers";

import * as OHTS from "@/components/ui/orderHistory/OrderHistoryTable.styled";

export default function OrderHistoryTable() {
  const { orders, isLoading } = useOrderHistory();
  const { isModalOpen, selectedProduct, openReviewModal, closeReviewModal, handleSubmitReview, loading, t } =
    useReview();

  return (
    <Loading isLoading={isLoading}>
      {orders.map((order, index) => (
        <OHTS.OrderWrapper key={index}>
          <OHTS.OrderTitleHeader>
            <OHTS.StatusOrder>
              {order.orderstatus === "completed" ? t("order.status.completed") : t("order.status.processing")}
            </OHTS.StatusOrder>
            <p>{formatDate(order.ordercreatedat, "dd/MM/yyyy")}</p>
          </OHTS.OrderTitleHeader>

          {order.productsbyvendor.map((vendor, vIdx) => (
            <OHTS.VendorWrapper key={vIdx}>
              {vendor.products.map((pro, pIdx) => (
                <OHTS.ProductRow key={pIdx}>
                  <OrderVendor productByVendor={order.productsbyvendor} />
                  <Button size="middle" onClick={() => openReviewModal(pro)} disabled={pro.isReviewed}>
                    {pro.isReviewed ? t("order.review.reviewed") : t("order.review.review")}
                  </Button>
                </OHTS.ProductRow>
              ))}
            </OHTS.VendorWrapper>
          ))}

          <hr />

          <OHTS.ActionButton>
            <p>
              {t("order.totalPrice")}: <OHTS.PriceTotal>{formatCurrency(order.totalorder)}</OHTS.PriceTotal>
            </p>
            <Button size="large" color="red" variant="solid">
              {t("order.buyAgain")}
            </Button>
          </OHTS.ActionButton>
        </OHTS.OrderWrapper>
      ))}

      <ReviewModal
        visible={isModalOpen}
        onCancel={closeReviewModal}
        onSubmit={handleSubmitReview}
        product={selectedProduct}
        loading={loading}
      />
    </Loading>
  );
}
