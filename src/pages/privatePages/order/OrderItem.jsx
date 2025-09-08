import { Divider, Typography } from "antd";

import OrderProductCard from "@/pages/privatePages/order/OrderProductCard";

import useOrder from "@/hooks/order/useOrder";

import * as Styled from "@/pages/privatePages/order/Order.styled";

const { Text } = Typography;

export default function OrderItem({ order, t }) {
  const { getOrderTotals } = useOrder();
  const { totalProducts, finalTotal } = getOrderTotals(order);

  return (
    <Styled.Section>
      <Styled.FlexRow>
        <Styled.ShopName>{order.shop.name}</Styled.ShopName>
      </Styled.FlexRow>
      <Divider />

      {order.products.map((p) => (
        <OrderProductCard key={p.id} product={p} />
      ))}

      <Divider />
      <Styled.FlexRow>
        <Text>{t("order.shipping")}:</Text>
        <Text strong>
          {order.shippingMethod} | {order.shippingFee.toLocaleString()}₫
        </Text>
      </Styled.FlexRow>

      <Divider />
      <Styled.FlexRow>
        <Text>{t("order.subtotal")}:</Text>
        <Text>{totalProducts.toLocaleString()}₫</Text>
      </Styled.FlexRow>
      <Styled.FlexRow>
        <Text>{t("order.shippingFee")}:</Text>
        <Text>{order.shippingFee.toLocaleString()}₫</Text>
      </Styled.FlexRow>
      <Styled.FlexRow>
        <Text strong>{t("order.total")}:</Text>
        <Styled.TotalText>{finalTotal.toLocaleString()}₫</Styled.TotalText>
      </Styled.FlexRow>
    </Styled.Section>
  );
}
