import { Divider, Typography } from "antd";

import { OrderProductCard } from "@/components/ui/order";

import useOrder from "@/hooks/order/useOrder";

import { OrderStyled as OS } from "@/components/ui/order";

const { Text } = Typography;

export default function OrderItem({ order, t }) {
  const { getOrderTotals } = useOrder();
  const { totalProducts, finalTotal } = getOrderTotals(order);

  return (
    <OS.Section>
      <OS.FlexRow>
        <OS.ShopName>{order.shop.name}</OS.ShopName>
      </OS.FlexRow>
      <Divider />

      {order.products.map((p) => (
        <OrderProductCard key={p.id} product={p} />
      ))}

      <Divider />
      <OS.FlexRow>
        <Text>{t("order.shipping")}:</Text>
        <Text strong>
          {order.shippingMethod} | {order.shippingFee.toLocaleString()}₫
        </Text>
      </OS.FlexRow>

      <Divider />
      <OS.FlexRow>
        <Text>{t("order.subtotal")}:</Text>
        <Text>{totalProducts.toLocaleString()}₫</Text>
      </OS.FlexRow>
      <OS.FlexRow>
        <Text>{t("order.shippingFee")}:</Text>
        <Text>{order.shippingFee.toLocaleString()}₫</Text>
      </OS.FlexRow>
      <OS.FlexRow>
        <Text strong>{t("order.total")}:</Text>
        <OS.TotalText>{finalTotal.toLocaleString()}₫</OS.TotalText>
      </OS.FlexRow>
    </OS.Section>
  );
}
