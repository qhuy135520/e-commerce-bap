import { Typography, Button } from "antd";
import { FaMapMarkerAlt } from "react-icons/fa";

import OrderEditAddressForm from "@/components/ui/order/OrderEditAddressForm";
import OrderItem from "@/pages/privatePages/order/OrderItem";

import useOrder from "@/hooks/order/useOrder";

import * as Styled from "@/pages/privatePages/order/Order.styled";
const { Text } = Typography;

export default function OrderDetail() {
  const { isEditing, setIsEditing, address, setAddress, orders, grandTotal, validateSchema, t, handleSubmitAddress } =
    useOrder();

  return (
    <Styled.Wrapper>
      <Styled.Section>
        <Styled.FlexRow>
          <Styled.AddressTitle level={3}>
            <FaMapMarkerAlt /> {t("order.orderDetails.address")}
          </Styled.AddressTitle>
        </Styled.FlexRow>

        {!isEditing ? (
          <>
            <Text strong>
              {address.name} ( {address.phone} )
            </Text>
            <br />
            <Text>{address.detail}</Text>
            <Button type="link" onClick={() => setIsEditing(true)}>
              {t("order.change")}
            </Button>
          </>
        ) : (
          <OrderEditAddressForm
            address={address}
            setAddress={setAddress}
            setIsEditing={setIsEditing}
            validateSchema={validateSchema}
            onSubmit={handleSubmitAddress}
            t={t}
          />
        )}
      </Styled.Section>

      {orders.map((order, idx) => (
        <OrderItem key={idx} order={order} t={t} />
      ))}

      {/* Tổng thanh toán */}
      <Styled.Section>
        <Styled.FlexRow>
          <Text strong>{t("order.grandTotal")}:</Text>
          <Styled.GrandTotalText>{grandTotal.toLocaleString()}₫</Styled.GrandTotalText>
        </Styled.FlexRow>

        <Styled.StyledButton type="primary" size="middle">
          {t("order.pay")}
        </Styled.StyledButton>
      </Styled.Section>
    </Styled.Wrapper>
  );
}
