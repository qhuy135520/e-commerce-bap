import React from "react";
import { useTranslation } from "react-i18next";
import { Button, ConfigProvider, Space, Table, Tooltip, Modal, Select } from "antd";

import { COMMISSION } from "@/constants";
import useOrderAdmin from "@/hooks/order/useOrderAdmin";

import { AdminManagerUserStyled as AMOD } from "@/components";

import { formatCurrency, formatNumberCurrency } from "@/utils/helpers";

export default function AdminManagerOrderTable({ orders, loading }) {
  const { t } = useTranslation(["admin"]);
  const {
    filteredOrders,
    modal,
    handleAction,
    handleConfirm,
    handleCancel,
    payModal,
    openPayModal,
    closePayModal,
    handlePayVendor,
    searchInput,
    setSearchInput,
    handleSearch,
    statusFilter,
    setStatusFilter,
  } = useOrderAdmin(orders);

  const columns = [
    {
      title: t("order.orderId"),
      dataIndex: "order_id",
      key: "order_id",
      render: (id) => <span>order_{id?.slice(0, 6)}</span>,
    },
    {
      title: t("order.userName"),
      dataIndex: "user_name",
      key: "userId",
      render: (name) => <span>{name}</span>,
    },
    {
      title: t("order.totalAmount"),
      dataIndex: "total_amount",
      key: "total_amount",
      render: (amount) => (
        <span style={{ fontWeight: 600, color: "blue" }}>{formatNumberCurrency(Number(amount || 0))}</span>
      ),
    },
    {
      title: t("order.status"),
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tooltip title={t(`order.status${status.charAt(0).toUpperCase() + status.slice(1)}`)}>
          <span style={{ textTransform: "capitalize" }}>
            {t(`order.status${status.charAt(0).toUpperCase() + status.slice(1)}`)}
          </span>
        </Tooltip>
      ),
    },
    {
      title: t("order.actions"),
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            danger
            disabled={record.status !== "pending" || modal.visible}
            onClick={() => handleAction("cancel", record)}
          >
            {t("order.cancel")}
          </Button>
          {record.status === "completed" && <Button onClick={() => openPayModal(record)}>{t("order.pay")}</Button>}
        </Space>
      ),
    },
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
          Select: { optionSelectedBg: "var(--color-grey-200)", selectorBg: "var(--color-grey-100)" },
        },
        token: {
          colorTextPlaceholder: "var(--color-grey-400)",
          colorBgContainer: "var(--color-grey-100)",
          colorText: "var(--color-grey-800)",
          colorTextHeading: "var(--color-grey-800)",
          colorBgElevated: "var(--color-grey-100)",
          colorTextDisabled: "var(--color-grey-400)",
          colorOption: "var(--color-blue-800)",
        },
      }}
    >
      <AMOD.SpaceStyled>
        <AMOD.SearchInput
          placeholder={t("order.searchPlaceholder")}
          allowClear
          enterButton={t("order.pay")}
          size="large"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onSearch={handleSearch}
        />
        <AMOD.SelectStyled value={statusFilter} onChange={setStatusFilter} size="large">
          <Select.Option value="all">{t("order.filterAll")}</Select.Option>
          <Select.Option value="pending">{t("order.filterPending")}</Select.Option>
          <Select.Option value="shipped">{t("order.filterShipped")}</Select.Option>
          <Select.Option value="completed">{t("order.filterCompleted")}</Select.Option>
          <Select.Option value="canceled">{t("order.filterCanceled")}</Select.Option>
        </AMOD.SelectStyled>
      </AMOD.SpaceStyled>

      <Table
        rowKey="order_id"
        columns={columns}
        dataSource={filteredOrders}
        loading={loading}
        pagination={{ pageSize: 10, showSizeChanger: false, position: ["bottomCenter"] }}
      />

      {/* Modal hủy đơn */}
      <Modal
        title={t("order.modalCancelTitle")}
        open={modal.visible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText={t("order.modalCancelOk")}
        cancelText={t("order.modalCancelCancel")}
        okButtonProps={{ danger: modal.type === "cancel" }}
      >
        <p
          dangerouslySetInnerHTML={{
            __html: t("order.modalCancelText", { orderId: modal.order?.order_id }),
          }}
        />
      </Modal>

      {/* Modal thanh toán */}
      <Modal
        title={t("order.modalPayTitle")}
        open={payModal.visible}
        onOk={handlePayVendor}
        onCancel={closePayModal}
        okText={t("order.modalPayOk")}
        cancelText={t("order.modalPayCancel")}
      >
        <p
          dangerouslySetInnerHTML={{
            __html: t("order.modalPayText", {
              orderId: payModal.order?.order_id?.slice(0, 5),
              total: formatCurrency(payModal.order?.total_amount * COMMISSION || 0),
              vendor: payModal.order?.vendor_name,
            }),
          }}
        />
      </Modal>
    </ConfigProvider>
  );
}
