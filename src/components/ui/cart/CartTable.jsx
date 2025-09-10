import { useMemo } from "react";
import { Button, Space, Table, Avatar } from "antd";
import { Formik, Form } from "formik";

import { CartTableStyled as CTS, Loading } from "@/components";

import useCart from "@/hooks/cart/useCart";

import { formatCurrency } from "@/utils/helpers";
import i18n from "@/configs/i18n/i18n";
import NoImage from "@/assets/images/NoImage/noimage.jpg";

export default function CartTable({ onMountSubmitRef }) {
  const {
    initialValues,
    selectedRowKeys,
    setSelectedRowKeys,
    cartTableWithVendors,
    totalQuantity,
    totalPrice,
    handleDeleteCartItem,
    handleResetCart,
    cart,
    error,
    isLoading,
    handleUpdateCartSelect,
    t,
  } = useCart();

  const columns = useMemo(
    () => [
      {
        title: t("cart.product"),
        dataIndex: "product",
        render: (_, record) =>
          record.isVendorRow ? (
            <strong>{record.vendorName}</strong>
          ) : (
            <Space>
              <Avatar shape="square" size={100} src={record.productImage || NoImage} />
              {record.product}
            </Space>
          ),
      },
      {
        title: t("cart.unitPrice"),
        dataIndex: "unitPrice",
        render: (value, record) => (record.isVendorRow ? null : formatCurrency(value)),
      },
      {
        title: t("cart.quantity"),
        dataIndex: "quantity",
        render: (_, record) =>
          record.isVendorRow ? null : (
            <Space>
              <CTS.InputQuantity name={record.key} min={1} />
            </Space>
          ),
      },
      {
        title: t("cart.totalPrice"),
        dataIndex: "totalPrice",
        render: (value, record) => (record.isVendorRow ? null : formatCurrency(value)),
      },
      {
        title: t("cart.actions"),
        render: (record) =>
          record.isVendorRow ? null : (
            <Button danger onClick={() => handleDeleteCartItem(record.key)}>
              {t("cart.delete")}
            </Button>
          ),
      },
    ],
    [i18n.language]
  );

  return (
    <Loading isLoading={isLoading} error={error}>
      <CTS.CartWrapper>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(values) => handleUpdateCartSelect({ values, type: "updateQuantity" })}
        >
          {({ submitForm, values }) => {
            if (onMountSubmitRef) {
              onMountSubmitRef.current = submitForm;
            }

            return (
              <Form>
                <Table
                  rowSelection={{
                    type: "checkbox",
                    selectedRowKeys,
                    onChange: setSelectedRowKeys,
                    getCheckboxProps: (record) => ({ disabled: record.isVendorRow }),
                  }}
                  columns={columns}
                  dataSource={cartTableWithVendors}
                  pagination={false}
                />

                <CTS.CardCartTable title={t("cart.totalSummary")}>
                  <div>
                    <p>
                      <strong>{t("cart.totalQuantity")}:</strong> {totalQuantity}
                    </p>
                    <p>
                      <strong>{t("cart.totalAmount")}:</strong> {formatCurrency(totalPrice)}
                    </p>
                  </div>
                  <CTS.ButtonWrapper>
                    <CTS.ButtonCart onClick={handleResetCart} disabled={!cart.length}>
                      {t("cart.resetCart")}
                    </CTS.ButtonCart>
                    <CTS.ButtonCart
                      onClick={() => handleUpdateCartSelect({ values, type: "buy" })}
                      disabled={!totalQuantity}
                    >
                      {t("cart.buy")}
                    </CTS.ButtonCart>
                  </CTS.ButtonWrapper>
                </CTS.CardCartTable>
              </Form>
            );
          }}
        </Formik>
      </CTS.CartWrapper>
    </Loading>
  );
}
