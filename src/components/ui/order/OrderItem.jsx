import { Divider, Typography } from "antd";

import { OrderProductCard } from "@/components/ui/order";
import { OrderStyled as OS } from "@/components/ui/order";

import useOrder from "@/hooks/order/useOrder";

import { formatCurrency } from "@/utils/helpers";

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
      {/* <OS.FlexRow>
        <Text>{t("order.shipping")}:</Text>
        <Text strong>
          {order.shippingMethod} | {order.shippingFee.toLocaleString()}₫
        </Text>
      </OS.FlexRow> */}

      <Divider />
      <OS.FlexRow>
        <Text>{t("order.subtotal")}:</Text>
        <Text>{formatCurrency(totalProducts)}</Text>
      </OS.FlexRow>
      <OS.FlexRow>
        <Text>{t("order.shippingFee")}:</Text>
        <Text>{formatCurrency(order.shippingFee)}</Text>
      </OS.FlexRow>
      <OS.FlexRow>
        <Text strong>{t("order.total")}:</Text>
        <OS.TotalText>{formatCurrency(finalTotal)}</OS.TotalText>
      </OS.FlexRow>
    </OS.Section>
  );
}
