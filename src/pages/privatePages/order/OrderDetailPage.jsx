import { Typography, Button, Modal, Alert } from "antd";
import { FaMapMarkerAlt } from "react-icons/fa";

import {
  Loading,
  OrderAddressCart,
  OrderEditAddressDefault,
  OrderEditAddressForm,
  OrderItem,
  OrderStyled as OS,
} from "@/components";

import useOrder from "@/hooks/order/useOrder";

import { formatCurrency } from "@/utils/helpers";
import useAddress from "@/hooks/address/useAddress";

const { Text } = Typography;

export default function OrderDetail() {
  const {
    isEditting,
    handleSetEditting,
    orders,
    grandTotal,
    validateSchema,
    t,
    isModalOpen,
    setIsModalOpen,
    handlePayClick,
    handlePlaceOrder,
    vnpayBalance,
    isInsufficientBalance,
    handleCancel,
    isLoading,
  } = useOrder();

  const { addressDefault, isLoading: isLoadingAddress } = useAddress();

  return (
    <Loading isLoading={isLoading || isLoadingAddress}>
      <OS.Wrapper>
        <OS.Section>
          <OS.FlexRow>
            <OS.AddressTitle level={3}>
              <FaMapMarkerAlt /> {t("order.orderDetails.address")}
            </OS.AddressTitle>
          </OS.FlexRow>
          {!isEditting &&
            (addressDefault ? (
              <>
                <OrderAddressCart addressDefault={addressDefault} onSetEditting={handleSetEditting} />
              </>
            ) : (
              <OS.EmptyAddressCardWrapper>
                <FaMapMarkerAlt size={24} />
                <Text type="secondary">Chưa có địa chỉ giao hàng</Text>
                <Button type="dashed" onClick={() => handleSetEditting("addAddress")}>
                  + Thêm địa chỉ
                </Button>
              </OS.EmptyAddressCardWrapper>
            ))}
          {isEditting === "addAddress" && (
            <OrderEditAddressForm onCancel={handleCancel} validateSchema={validateSchema} />
          )}

          {isEditting === "changeAddressDefault" && <OrderEditAddressDefault onCancel={handleCancel} />}
        </OS.Section>

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
    </Loading>
  );
}
