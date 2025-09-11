import { Button } from "antd";
import { formatDate } from "date-fns";

import useOrderHistory from "@/hooks/order/useOrderHistory";
import useReview from "@/hooks/order/useReview";

import { OrderHistoryTableStyled as OHTS, EmptyCommon, OrderVendor, Loading } from "@/components";

import { formatCurrency } from "@/utils/helpers";

export default function OrderHistoryTable() {
  const { orders, isLoading, error } = useOrderHistory();
  const { t } = useReview();

  if (!orders.length) return <EmptyCommon link="/" description="Chưa có đơn hàng nào" />;
  return (
    <Loading isLoading={isLoading} error={error}>
      {orders.map((order, index) => (
        <OHTS.OrderWrapper key={index}>
          <OHTS.OrderTitleHeader>
            <OHTS.StatusOrder>
              {order.orderstatus === "completed" ? t("order.status.completed") : t("order.status.processing")}
            </OHTS.StatusOrder>
            <p>{formatDate(order.ordercreatedat, "dd/MM/yyyy")}</p>
          </OHTS.OrderTitleHeader>
          <hr />
          <OrderVendor productByVendor={order.productsbyvendor} />
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
    </Loading>
  );
}
