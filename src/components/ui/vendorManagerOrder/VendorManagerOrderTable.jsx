import React from "react";
import { FaCheck } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { ConfigProvider, Modal, Table, Tag } from "antd";
import { MdCancel } from "react-icons/md";

import { COMMISSION } from "@/constants";
import useUpdateStatus from "@/hooks/order/useUpdateStatus";

import {
  ListProductOrder,
  ChangeStatus,
  VendorOrderOperation,
  VendorManagerOrderTableStyled as VMOTS,
} from "@/components";

import { formatCurrency } from "@/utils/helpers";

export default function VendorManagerOrderTable() {
  const { t } = useTranslation("vendor");
  const { orders, selectOrder, isModalOpen, updateOrderStatus, handleCancel, openUpdateModal } = useUpdateStatus();

  const columns = [
    {
      title: t("orderTable.columns.orderId"),
      dataIndex: "orderid",
      key: "orderid",
      render: (text) => <b>{text?.substring(0, 5)}</b>,
    },
    {
      title: t("orderTable.columns.customerName"),
      dataIndex: "username",
      key: "username",
      render: (text) => <b>{text}</b>,
    },
    {
      title: t("orderTable.columns.status"),
      dataIndex: "status",
      key: "status",
      render: (value, record) => (
        <VMOTS.ButtonStatus onClick={() => openUpdateModal(record)} type="primary" $status={record.status}>
          {value === "pending"
            ? t("orderTable.status.pending")
            : value === "shipped"
            ? t("orderTable.status.shipped")
            : value === "canceled"
            ? t("orderTable.status.canceled")
            : value === "completed"
            ? t("orderTable.status.completed")
            : t("orderTable.status.paid")}
        </VMOTS.ButtonStatus>
      ),
    },
    {
      title: t("orderTable.columns.total"),
      dataIndex: "totalorder",
      key: "totalorder",
      render: (text) => <b>{formatCurrency(text)}</b>,
    },
    {
      title: t("orderTable.columns.received"),
      dataIndex: "totalorder",
      key: "totalorderReceived",
      render: (text, record) => (
        <b>
          {formatCurrency(text * COMMISSION)}{" "}
          {record.status === "paid" ? (
            <Tag icon={<FaCheck />} color="success">
              {t("orderTable.tags.paid")}
            </Tag>
          ) : (
            <Tag icon={<MdCancel />} color="error">
              {t("orderTable.tags.unpaid")}
            </Tag>
          )}
        </b>
      ),
    },
  ];

  const statusOptions = [
    { value: "all", label: t("orderTable.status.all") },
    { value: "pending", label: t("orderTable.status.pending") },
    { value: "shipped", label: t("orderTable.status.shipped") },
    { value: "completed", label: t("orderTable.status.completed") },
    { value: "paid", label: t("orderTable.status.paid") },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "var(--color-grey-200)",
            headerColor: "var(--color-grey-800)",
            headerSplitColor: "var(--color-grey-500)",
            rowHoverBg: "var(--color-grey-200)",
          },
          Modal: {
            contentBg: "var(--color-grey-100)",
            headerBg: "var(--color-grey-100)",
          },
        },
        token: {
          colorBgContainer: "var(--color-grey-100)",
          colorText: "var(--color-grey-800)",
        },
      }}
    >
      <VendorOrderOperation options={statusOptions} />

      <Table
        columns={columns}
        dataSource={orders}
        rowKey="orderid"
        expandable={{
          expandedRowRender: (record) => <ListProductOrder products={record.products} />,
        }}
      />

      <Modal title={t("orderTable.modal.title")} open={isModalOpen} onCancel={handleCancel} footer={null} zIndex={4000}>
        <ChangeStatus selectOrder={selectOrder} updateOrderStatus={updateOrderStatus} />
      </Modal>
    </ConfigProvider>
  );
}
