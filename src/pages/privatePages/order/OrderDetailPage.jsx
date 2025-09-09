import { Typography, Button, Modal, Radio, Alert } from "antd";
import { FaMapMarkerAlt } from "react-icons/fa";

import { OrderItem, OrderEditAddressForm } from "@/components";

import useOrder from "@/hooks/order/useOrder";

import { formatCurrency } from "@/utils/helpers";

import { OrderStyled as OS } from "@/components";

const { Text } = Typography;

export default function OrderDetailPage() {
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
    <OS.Wrapper>
      {/* Địa chỉ */}
      <OS.Section>
        <OS.FlexRow>
          <OS.AddressTitle level={3}>
            <FaMapMarkerAlt /> {t("order.orderDetails.address")}
          </OS.AddressTitle>
        </OS.FlexRow>

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
      </OS.Section>

      {/* Danh sách đơn */}
      {orders.map((order, idx) => (
        <OrderItem key={idx} order={order} t={t} />
      ))}

      <OS.Section>
        <OS.FlexRow>
          <Text strong>{t("order.grandTotal")}:</Text>
          <OS.GrandTotalText>{grandTotal.toLocaleString()}₫</OS.GrandTotalText>
        </OS.FlexRow>

        <OS.StyledButton type="primary" size="middle" onClick={handlePayClick}>
          {t("order.pay")}
        </OS.StyledButton>
      </OS.Section>

      <Modal
        title={<OS.ModalTitle>{t("order.confirmPayment")}</OS.ModalTitle>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <OS.PaymentMethodWrapper>
          <Text strong>{t("order.paymentMethod")}:</Text>
          <OS.PaymentMethodWrapper>
            <Text>{t("order.paymentMethods.vnpay")}</Text>
            <OS.BalanceText type="secondary">
              {t("order.balance")}: <strong>{formatCurrency(vnpayBalance)}</strong>
            </OS.BalanceText>
          </OS.PaymentMethodWrapper>
        </OS.PaymentMethodWrapper>

        <OS.PaymentDetailWrapper>
          <Text strong>
            {t("order.paymentDetail")}: {formatCurrency(grandTotal)}
          </Text>
        </OS.PaymentDetailWrapper>

        {isInsufficientBalance && (
          <OS.AlertWrapper>
            <Alert message={t("order.insufficientBalance")} type="error" showIcon />
          </OS.AlertWrapper>
        )}

        <OS.PlaceOrderButton type="primary" onClick={handlePlaceOrder} disabled={isInsufficientBalance}>
          {t("order.placeOrder")}
        </OS.PlaceOrderButton>
      </Modal>
    </OS.Wrapper>
  );
}
