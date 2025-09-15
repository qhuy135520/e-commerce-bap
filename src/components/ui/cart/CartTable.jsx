import { useMemo } from "react";
import { Button, Space, Table, Avatar } from "antd";
import { Formik, Form } from "formik";

import { CartTableStyled as CTS, EmptyCommon, InputQuantity, Loading } from "@/components";

import useCart from "@/hooks/cart/useCart";

import { formatCurrency } from "@/utils/helpers";
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
                    record.isVendorRow ? null : <InputQuantity name={record.key} min={1} max={record.productStock} />,
                },
                {
                  title: t("cart.totalPrice"),
                  dataIndex: "totalPrice",
                  render: (_, record) => {
                    if (record.isVendorRow) return null;

                    const qty = values?.[record.key] ?? record.quantity ?? 0;
                    return formatCurrency(qty * record.unitPrice);
                  },
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
              [t, values]
            );

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
                  locale={{
                    emptyText: (
                      <EmptyCommon
                        link={"/"}
                        description={"Chưa có sản phẩm trong giỏ hàng"}
                        buttonText="Quay lại chọn sản phẩm"
                      />
                    ),
                  }}
                />

                {(() => {
                  let qty = 0;
                  let price = 0;

                  cartTableWithVendors.forEach((item) => {
                    if (!item.isVendorRow && selectedRowKeys.includes(item.key)) {
                      const currentQty = values?.[item.key] ?? item.quantity ?? 0;
                      qty += currentQty;
                      price += currentQty * item.unitPrice;
                    }
                  });

                  return (
                    <CTS.CardCartTable title={t("cart.totalSummary")}>
                      <div>
                        <p>
                          <strong>{t("cart.totalQuantity")}:</strong> {qty}
                        </p>
                        <p>
                          <strong>{t("cart.totalAmount")}:</strong> {formatCurrency(price)}
                        </p>
                      </div>
                      <CTS.ButtonWrapper>
                        <CTS.ButtonCart onClick={handleResetCart} disabled={!cart.length}>
                          {t("cart.resetCart")}
                        </CTS.ButtonCart>
                        <CTS.ButtonCart
                          type="primary"
                          onClick={() => handleUpdateCartSelect({ values, type: "buy" })}
                          disabled={!qty}
                        >
                          {t("cart.buy")}
                        </CTS.ButtonCart>
                      </CTS.ButtonWrapper>
                    </CTS.CardCartTable>
                  );
                })()}
              </Form>
            );
          }}
        </Formik>
      </CTS.CartWrapper>
    </Loading>
  );
}
