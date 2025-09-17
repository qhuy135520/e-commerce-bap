import React from "react";
import { Button, Spin, Typography } from "antd";
import { FaMapMarkerAlt } from "react-icons/fa";

import {
  DividerTitle,
  OrderStyled as OS,
  OrderAddressCart,
  OrderEditAddressDefault,
  OrderEditAddressForm,
} from "@/components";

import useAddress from "@/hooks/address/useAddress";
import useOrder from "@/hooks/order/useOrder";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

export default function VendorUpdateAddressForm() {
  const { isEditting, handleSetEditting, validateSchema, handleCancel } = useOrder();
  const { addressDefault, isLoading } = useAddress();
  const { t } = useTranslation(["vendor"]);

  return (
    <Spin spinning={isLoading}>
      <DividerTitle title={t("title.titleUpdateAddress")} />
      <OS.Section>
        {!isEditting &&
          (addressDefault ? (
            <>
              <OrderAddressCart addressDefault={addressDefault} onSetEditting={handleSetEditting} />
            </>
          ) : (
            <OS.EmptyAddressCardWrapper>
              <FaMapMarkerAlt size={24} />
              <Text type="secondary">Chưa có địa chỉ mặc định</Text>
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
    </Spin>
  );
}
