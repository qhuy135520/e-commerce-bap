import { Typography, Button, Modal, Radio, Alert } from "antd";
import { FaMapMarkerAlt } from "react-icons/fa";

import OrderEditAddressForm from "@/components/ui/order/OrderEditAddressForm";
import OrderItem from "@/pages/privatePages/order/OrderItem";

import useOrder from "@/hooks/order/useOrder";

import { formatCurrency } from "@/utils/helpers";

import * as Styled from "@/pages/privatePages/order/Order.styled";

const { Text } = Typography;

export default function OrderDetail() {
  const {
    isEditing,
    setIsEditing,
    address,
    setAddress,
    orders,
    grandTotal,
    validateSchema,
    t,
    handleSubmitAddress,
    isModalOpen,
    setIsModalOpen,
    handlePayClick,
    handlePlaceOrder,
    vnpayBalance,
    isInsufficientBalance,
  } = useOrder();

  return (
    <Styled.Wrapper>
      {/* Địa chỉ */}
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

      {/* Danh sách đơn */}
      {orders.map((order, idx) => (
        <OrderItem key={idx} order={order} t={t} />
      ))}

      <Styled.Section>
        <Styled.FlexRow>
          <Text strong>{t("order.grandTotal")}:</Text>
          <Styled.GrandTotalText>{grandTotal.toLocaleString()}₫</Styled.GrandTotalText>
        </Styled.FlexRow>

        <Styled.StyledButton type="primary" size="middle" onClick={handlePayClick}>
          {t("order.pay")}
        </Styled.StyledButton>
      </Styled.Section>

      <Modal
        title={<Styled.ModalTitle>{t("order.confirmPayment")}</Styled.ModalTitle>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Styled.PaymentMethodWrapper>
          <Text strong>{t("order.paymentMethod")}:</Text>
          <Styled.PaymentMethodWrapper>
            <Text>{t("order.paymentMethods.vnpay")}</Text>
            <Styled.BalanceText type="secondary">
              {t("order.balance")}: <strong>{formatCurrency(vnpayBalance)}</strong>
            </Styled.BalanceText>
          </Styled.PaymentMethodWrapper>
        </Styled.PaymentMethodWrapper>

        <Styled.PaymentDetailWrapper>
          <Text strong>
            {t("order.paymentDetail")}: {formatCurrency(grandTotal)}
          </Text>
        </Styled.PaymentDetailWrapper>

        {isInsufficientBalance && (
          <Styled.AlertWrapper>
            <Alert message={t("order.insufficientBalance")} type="error" showIcon />
          </Styled.AlertWrapper>
        )}

        <Styled.PlaceOrderButton type="primary" onClick={handlePlaceOrder} disabled={isInsufficientBalance}>
          {t("order.placeOrder")}
        </Styled.PlaceOrderButton>
      </Modal>
    </Styled.Wrapper>
  );
}
