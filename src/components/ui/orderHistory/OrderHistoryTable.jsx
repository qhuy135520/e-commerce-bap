import { Button, Tag, Select, Space, DatePicker } from "antd";
import { format } from "date-fns";

import useOrderHistory from "@/hooks/order/useOrderHistory";
import useReview from "@/hooks/order/useReview";

import { EmptyCommon, OrderVendor, Loading, OrderHistoryTableStyled as OHTS } from "@/components";

import { formatCurrency } from "@/utils/helpers";

const { RangePicker } = DatePicker;

export default function OrderHistoryTable() {
  const {
    orders,
    isLoading,
    error,
    visibleOrders,
    canLoadMore,
    handleLoadMore,
    handleClickBuyAgain,
    filterStatus,
    setFilterStatus,
    duration,
    setDuration,
    customRange,
    setCustomRange,
  } = useOrderHistory();

  const { t } = useReview();

  if (!orders.length && !isLoading) {
    return <EmptyCommon link="/" description="Chưa có đơn hàng nào" />;
  }

  return (
    <Loading isLoading={isLoading} error={error}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <Space>
          <span>Trạng thái:</span>
          <Select
            value={filterStatus}
            onChange={setFilterStatus}
            style={{ width: 160 }}
            options={[
              { label: "Tất cả", value: "all" },
              { label: t("order.status.processing"), value: "pending" },
              { label: t("order.status.completed"), value: "completed" },
            ]}
          />
        </Space>

        <Space>
          <span>Thời gian:</span>
          <Select
            value={duration}
            onChange={(v) => {
              setDuration(v);
              setCustomRange(null);
            }}
            style={{ width: 180 }}
            options={[
              { label: "Tất cả", value: "all" },
              { label: "7 ngày gần đây", value: "7d" },
              { label: "30 ngày gần đây", value: "30d" },
              { label: "6 tháng gần đây", value: "6m" },
              { label: "1 năm gần đây", value: "1y" },
            ]}
          />
          <RangePicker
            onChange={(dates) => {
              setCustomRange(dates);
              setDuration("all");
            }}
            format="DD/MM/YYYY"
          />
        </Space>
      </div>
      {visibleOrders.length === 0 ? (
        <EmptyCommon description="Không tìm thấy đơn hàng nào phù hợp với bộ lọc" />
      ) : (
        <>
          {visibleOrders.map((order, index) => (
            <OHTS.OrderWrapper key={index}>
              <OHTS.OrderTitleHeader>
                <Tag
                  color={order.orderstatus === "completed" ? "green" : "orange"}
                  style={{ fontSize: "1.2rem", padding: "0.2rem 1rem" }}
                >
                  {order.orderstatus === "completed" ? t("order.status.completed") : t("order.status.processing")}
                </Tag>
                <span style={{ fontSize: "1.3rem", color: "var(--color-grey-600)" }}>
                  {format(new Date(order.ordercreatedat), "dd/MM/yyyy")}
                </span>
              </OHTS.OrderTitleHeader>

              <OHTS.DividerLine />

              <OrderVendor productByVendor={order.productsbyvendor} orderStatus={order.orderstatus} />

              <OHTS.DividerLine />

              <OHTS.ActionButton>
                <div className="price">
                  {t("order.totalPrice")}: <OHTS.PriceTotal>{formatCurrency(order.totalorder)}</OHTS.PriceTotal>
                </div>
                <Button type="primary" danger onClick={() => handleClickBuyAgain(order)}>
                  {t("order.buyAgain")}
                </Button>
              </OHTS.ActionButton>
            </OHTS.OrderWrapper>
          ))}

          {canLoadMore && (
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <Button onClick={handleLoadMore}>Xem thêm</Button>
            </div>
          )}
        </>
      )}
    </Loading>
  );
}
