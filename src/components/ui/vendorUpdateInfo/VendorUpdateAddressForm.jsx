import React from "react";
import { Button, Spin, Typography } from "antd";
import { FaMapMarkerAlt } from "react-icons/fa";

import { DividerTitle, OrderStyled as OS, OrderAddressCart, OrderEditAddressDefault, OrderEditAddressForm } from "@/components";

import useAddress from "@/hooks/address/useAddress";
import useOrder from "@/hooks/order/useOrder";

const { Text } = Typography;

export default function VendorUpdateAddressForm() {
  const { isEditting, handleSetEditting, validateSchema, handleCancel } = useOrder();
  const { addressDefault, isLoading } = useAddress();

  return (
    <Spin spinning={isLoading}>
      <DividerTitle title={"Cập nhật địa chỉ"} />
      <OS.Section>
        <OS.FlexRow>
          <OS.AddressTitle level={3}>
            <FaMapMarkerAlt /> Địa chỉ vendor
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
