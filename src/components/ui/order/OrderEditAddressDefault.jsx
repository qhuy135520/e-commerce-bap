import React, { useState } from "react";
import { Form } from "formik-antd";
import { Radio, Button, Space, Popover, Divider } from "antd";
import { Formik } from "formik";

import { OrderStyled as OS, OrderUpdateAddressModal } from "@/components";

import useAddress from "@/hooks/address/useAddress";
import { useTranslation } from "react-i18next";

export default function OrderEditAddressDefault({ onCancel }) {
  const { t } = useTranslation(["order"]);
  const {
    address,
    addressDefault,
    handleSetDefaultAddress,
    handleDeleteAddress,
    openModal,
    setOpenModal,
    editingAddress,
    handleOpenModal,
    handleUpdateAddress,
  } = useAddress();

  const initialValues = {
    addressId: addressDefault?.id || "",
  };
  return (
    <>
      <OS.HeadingEditAddress as="h3">{t("order.editDefault.changeDefaultAddress")}</OS.HeadingEditAddress>

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          handleSetDefaultAddress(values.addressId, onCancel);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form layout="vertical">
            <Form.Item name="addressId" label={t("order.editDefault.chooseDefaultAddress")} required>
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
                      <OS.CardBody>
                        {t("order.editDefault.phoneNumber")}: {addr.phone}
                      </OS.CardBody>

                      <Popover
                        content={
                          <div>
                            <Button type="primary" danger size="small" onClick={() => handleDeleteAddress(addr)}>
                              {t("order.editDefault.delete")}
                            </Button>
                            <Divider type="vertical" />
                            <Button size="small">{t("order.editDefault.cancel")}</Button>
                          </div>
                        }
                        title="Xác nhận xóa?"
                        trigger="click"
                        placement="topRight"
                      >
                        <OS.DeleteButton type="primary" danger size="small">
                          {t("order.editDefault.delete")}
                        </OS.DeleteButton>
                      </Popover>

                      <OS.EditAddressButton
                        type="primary"
                        size="small"
                        onClick={() => {
                          handleOpenModal(addr);
                        }}
                      >
                        {t("order.editDefault.update")}
                      </OS.EditAddressButton>
                    </OS.CardRadioLabel>
                  ))}
                </OS.AddressInfo>
              </OS.RadioGroupAddress>
            </Form.Item>

            <Button type="default" onClick={onCancel}>
              {t("order.editDefault.cancel")}
            </Button>
            <Divider type="vertical" />
            <Button type="primary" htmlType="submit">
              {t("order.editDefault.updateDefault")}
            </Button>
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
