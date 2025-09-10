import React, { useState } from "react";
import { Form } from "formik-antd";
import { Radio, Button, Space, Popover, Divider } from "antd";
import { Formik } from "formik";

import { OrderStyled as OS, OrderUpdateAddressModal } from "@/components";

import useAddress from "@/hooks/address/useAddress";

export default function OrderEditAddressDefault({ onCancel }) {
  const {
    address,
    addressDefault,
    handleSetDefaultAddress,
    handleDeleteAddress,
    openModal,
    setOpenModal,
    editingAddress,
    handleOpenModal,
  } = useAddress();

  const initialValues = {
    addressId: addressDefault?.id || "",
  };
  return (
    <>
      <OS.HeadingEditAddress as="h3">Đổi địa chỉ mặc định</OS.HeadingEditAddress>

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          handleSetDefaultAddress(values.addressId);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form layout="vertical">
            <Form.Item name="addressId" label="Chọn địa chỉ mặc định" required>
              <OS.RadioGroupAddress
                name="addressId"
                value={values.addressId}
                onChange={(e) => setFieldValue("addressId", e.target.value)}
              >
                <OS.AddressInfo direction="vertical">
                  {address.map((addr) => (
                    <OS.CardRadioLabel
                      key={addr.id}
                      selected={values.addressId === addr.id}
                      onClick={() => setFieldValue("addressId", addr.id)}
                    >
                      <OS.RadioAddress value={addr.id} />
                      <OS.CardHeader>{addr.name}</OS.CardHeader>
                      <OS.CardBody>{addr.fullAddress}</OS.CardBody>
                      <OS.CardBody>Số điện thoại: {addr.phone}</OS.CardBody>

                      <Popover
                        content={
                          <div>
                            <Button type="primary" danger size="small" onClick={() => handleDeleteAddress(addr)}>
                              Xóa
                            </Button>
                            <Divider type="vertical" />
                            <Button size="small">Hủy</Button>
                          </div>
                        }
                        title="Xác nhận xóa?"
                        trigger="click"
                        placement="topRight"
                      >
                        <OS.DeleteButton type="primary" danger size="small">
                          Xóa
                        </OS.DeleteButton>
                      </Popover>

                      <OS.EditAddressButton
                        type="primary"
                        size="small"
                        onClick={() => {
                          handleOpenModal(addr);
                        }}
                      >
                        Cập nhật địa chỉ
                      </OS.EditAddressButton>
                    </OS.CardRadioLabel>
                  ))}
                </OS.AddressInfo>
              </OS.RadioGroupAddress>
            </Form.Item>
            <Button htmlType="submit" type="default" onClick={onCancel}>
              Hủy
            </Button>
            <Divider type="vertical" />
          </Form>
        )}
      </Formik>
      {openModal && (
        <OrderUpdateAddressModal
          open={openModal}
          onCancel={() => setOpenModal(false)}
          address={editingAddress}
          onUpdate={handleUpdateAddress}
        />
      )}
    </>
  );
}
