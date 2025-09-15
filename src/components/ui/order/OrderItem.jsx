import { Divider, Typography } from "antd";
import { Formik } from "formik";

import { OrderProductCard } from "@/components/ui/order";
import { OrderStyled as OS } from "@/components/ui/order";

import useOrder from "@/hooks/order/useOrder";

import { formatCurrency } from "@/utils/helpers";
import useCart from "@/hooks/cart/useCart";

const { Text } = Typography;

export default function OrderItem({ order, t, onMountSubmitRef }) {
  const { getOrderTotals } = useOrder();
  const { totalProducts, finalTotal } = getOrderTotals(order);
  const { handleUpdateCartSelect } = useCart();
  return (
    <OS.Section>
      <OS.FlexRow>
        <OS.ShopName>{order.shop.name}</OS.ShopName>
      </OS.FlexRow>
      <Divider />

      <Formik
        enableReinitialize
        initialValues={order.products.reduce((acc, p) => {
          return { ...acc, [p.cartId]: p.quantity };
        }, {})}
        onSubmit={(values) => handleUpdateCartSelect({ values, type: "cancelOrder" })}
      >
        {({ submitForm }) => {
          if (onMountSubmitRef) {
            onMountSubmitRef(submitForm);
          }

          return (
            <>
              {order.products.map((p) => (
                <OrderProductCard key={p.id} product={p} />
              ))}
            </>
          );
        }}
      </Formik>

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
