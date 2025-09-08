import React from "react";
import { Button } from "antd";
import { formatDate } from "date-fns/format";

import { OrderHistoryTableStyled as OHTS, OrderVendor } from "@/components";

import useOrderHistory from "@/hooks/order/useOrderHistory";
import { formatCurrency } from "@/utils/helpers";

export default function OrderHistoryTable() {
  const { orders } = useOrderHistory();
  return (
    <>
      {orders.map((order, index) => (
        <OHTS.OrderWrapper key={index}>
          <OHTS.OrderTitleHeader>
            <OHTS.StatusOrder>{order.orderstatus === "completed" ? "HOÀN THÀNH" : "ĐANG XỬ LÝ"}</OHTS.StatusOrder>
            <p> {formatDate(order.ordercreatedat, "dd/MM/yyyy")}</p>
          </OHTS.OrderTitleHeader>
          <hr />
          <OrderVendor productByVendor={order.productsbyvendor} />
          <hr />
          <OHTS.ActionButton>
            <p>
              Thành tiền: <OHTS.PriceTotal>{formatCurrency(order.totalorder)}</OHTS.PriceTotal>
            </p>
            <Button size="large" color="red" variant="solid">
              Mua lại
            </Button>
          </OHTS.ActionButton>
        </OHTS.OrderWrapper>
      ))}
    </>
  );
}
