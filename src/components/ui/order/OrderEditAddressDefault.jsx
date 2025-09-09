import React from "react";
import { Form } from "formik-antd";
import { Radio, Button, Space, Popover, Divider } from "antd";
import { Formik } from "formik";

import { OrderStyled as OS } from "@/components";

import useAddress from "@/hooks/address/useAddress";

export default function OrderEditAddressDefault({ onCancel }) {
  const { address, addressDefault, handleSetDefaultAddress, handleDeleteAddress } = useAddress();

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
              <Radio.Group
                name="addressId"
                value={values.addressId}
                onChange={(e) => setFieldValue("addressId", e.target.value)}
              >
                <Space direction="vertical">
                  {address.map((addr) => (
                    <OS.CardRadioLabel
                      key={addr.id}
                      selected={values.addressId === addr.id}
                      onClick={() => setFieldValue("addressId", addr.id)}
                    >
                      <Radio value={addr.id} />
                      <OS.CardHeader>{addr.name}</OS.CardHeader>
                      <OS.CardBody>{addr.fullAddress}</OS.CardBody>
                      <OS.CardBody>Số điện thoại: {addr.phone}</OS.CardBody>

                      {handleDeleteAddress && (
                        <Popover
                          content={
                            <div>
                              <Button type="primary" danger size="small" onClick={() => handleDeleteAddress(addr)}>
                                Xóa
                              </Button>
                              <Button size="small">Hủy</Button>
                            </div>
                          }
                          title="Xác nhận xóa?"
                          trigger="click"
                          placement="topRight"
                        >
                          <OS.DeleteButton type="text" danger size="small">
                            Xóa
                          </OS.DeleteButton>
                        </Popover>
                      )}
                    </OS.CardRadioLabel>
                  ))}
                </Space>
              </Radio.Group>
            </Form.Item>
            <Button htmlType="submit" type="default" onClick={onCancel}>
              Hủy
            </Button>
            <Divider type="vertical" />
            <Button htmlType="submit" type="primary">
              Cập nhật địa chỉ
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
