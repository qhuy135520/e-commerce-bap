import React from "react";
import { useTranslation } from "react-i18next";
import { Button, ConfigProvider, Space, Table, Tooltip, Modal, Select } from "antd";

import useProductAdmin from "@/hooks/products/useProductAdmin";

import { AdminManagerUserStyled as AMOD } from "@/components";

import { formatNumberCurrency } from "@/utils/helpers";

export default function AdminManagerProductTable({ products, loading }) {
  const { t } = useTranslation(["admin"]);
  const {
    filteredProducts,
    modal,
    searchInput,
    setSearchInput,
    handleSearch,
    statusFilter,
    setStatusFilter,
    handleAction,
    handleConfirm,
    handleCancel,
  } = useProductAdmin(products);

  const columns = [
    {
      title: t("product.id"),
      dataIndex: "id",
      key: "id",
      width: "10%",
      render: (text) => <span>{text?.substring(0, 6)}</span>,
    },
    { title: t("product.name"), dataIndex: "name", key: "name", width: "25%", render: (text) => <b>{text}</b> },
    {
      title: t("product.price"),
      dataIndex: "price",
      key: "price",
      width: "15%",
      render: (price) => (
        <span style={{ fontWeight: 600, color: "blue" }}>{formatNumberCurrency(Number(price || 0))}</span>
      ),
    },
    { title: t("product.stock"), dataIndex: "stock", key: "stock", width: "10%" },
    {
      title: t("product.status"),
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (status) => (
        <Tooltip title={status ? t("product.statusApproved") : t("product.statusPending")}>
          <span>{status ? t("product.statusApproved") : t("product.statusPending")}</span>
        </Tooltip>
      ),
    },
    {
      title: t("product.actions"),
      key: "action",
      width: "25%",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type={record.status ? "default" : "primary"}
            disabled={record.status || modal.visible}
            onClick={() => !record.status && handleAction("approve", record)}
          >
            {t("product.approve")}
          </Button>
          <Button danger disabled={modal.visible} onClick={() => handleAction("delete", record)}>
            {t("product.delete")}
          </Button>
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
          placeholder={t("product.searchPlaceholder")}
          allowClear
          enterButton={t("product.search")}
          size="large"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onSearch={handleSearch}
        />
        <AMOD.SelectStyled value={statusFilter} onChange={setStatusFilter} size="large">
          <Select.Option value="all">{t("product.filterAll")}</Select.Option>
          <Select.Option value="approved">{t("product.filterApproved")}</Select.Option>
          <Select.Option value="pending">{t("product.filterPending")}</Select.Option>
        </AMOD.SelectStyled>
      </AMOD.SpaceStyled>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredProducts}
        loading={loading}
        pagination={{ pageSize: 10, showSizeChanger: false, position: ["bottomCenter"] }}
      />

      <Modal
        title={modal.type === "approve" ? t("product.modalApproveTitle") : t("product.modalDeleteTitle")}
        open={modal.visible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText={modal.type === "approve" ? t("product.modalApproveOk") : t("product.modalDeleteOk")}
        cancelText={t("product.modalCancel")}
        okButtonProps={{ danger: modal.type === "delete" }}
      >
        <p
          dangerouslySetInnerHTML={{
            __html: t("product.modalText", {
              action: modal.type === "approve" ? t("product.approve").toLowerCase() : t("product.delete").toLowerCase(),
              name: modal.product?.name || modal.product?.id,
            }),
          }}
        />
      </Modal>
    </ConfigProvider>
  );
}
