import React from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Button, ConfigProvider, Space, Table, Tooltip, Modal, Input, Select, InputNumber } from "antd";

import { useUser } from "@/hooks/authentication/useUser";

import { AdminManagerUserStyled as AMUS } from "@/components";

import { formatNumberCurrency } from "@/utils/helpers";

export default function AdminManagerUserTable({ users, loading }) {
  const { t } = useTranslation(["admin"]);

  const {
    searchInput,
    setSearchInput,
    handleSearch,
    filteredUsers,
    isDeleteModal,
    setIsDeleteModal,
    isUpdateModal,
    setIsUpdateModal,
    selectedUser,
    handleDeleteConfirm,
    handleDelete,
    handleUpdateConfirm,
    handleUpdate,
    initialUserValues,
    validateUser,
    handleSubmitUpdate,
  } = useUser(users);

  const columns = [
    {
      title: t("user.id"),
      dataIndex: "id",
      key: "id",
      width: "12%",
      render: (text) => <span>{text?.substring(0, 6)}</span>,
    },
    {
      title: t("user.name"),
      dataIndex: "name",
      key: "name",
      width: "20%",
      render: (text) => <b>{text || t("user.form.namePlaceholder")}</b>,
    },
    {
      title: t("user.role"),
      dataIndex: "role",
      key: "role",
      width: "12%",
      render: (role) => {
        let color = "green";
        let text = t("user.roleCustomer");

        if (role === "admin") {
          color = "red";
          text = t("user.roleAdmin");
        } else if (role === "vendor") {
          color = "blue";
          text = t("user.roleVendor");
        }

        return <span style={{ fontWeight: 600, color }}>{text}</span>;
      },
    },
    {
      title: t("user.moneyBalance"),
      dataIndex: "moneyBalance",
      key: "moneyBalance",
      width: "15%",
      render: (balance) => (
        <span style={{ fontWeight: 600, color: "blue" }}>{formatNumberCurrency(Number(balance || 0))}</span>
      ),
    },
    {
      title: t("user.status"),
      dataIndex: "status",
      key: "status",
      width: "12%",
      render: (status) => (
        <Tooltip title={status === "active" ? t("user.statusActive") : t("user.statusInactive")}>
          <span>{status === "active" ? "✅ " + t("user.statusActive") : "❌ " + t("user.statusInactive")}</span>
        </Tooltip>
      ),
    },
    {
      title: t("user.createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      width: "15%",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "—"),
    },
    {
      title: t("user.actions"),
      key: "action",
      width: "14%",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleUpdateConfirm(record)}>
            {t("user.update")}
          </Button>
          <Button danger onClick={() => handleDeleteConfirm(record)}>
            {t("user.delete")}
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
          Select: {
            optionSelectedBg: "var(--color-grey-200)",
            selectorBg: "var(--color-grey-100)",
          },
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
      {/* Search */}
      <AMUS.ButtonPosition>
        <AMUS.SearchInput
          placeholder={t("user.searchPlaceholder")}
          allowClear
          enterButton={t("user.search")}
          size="large"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onSearch={handleSearch}
        />
      </AMUS.ButtonPosition>

      {/* Table */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredUsers}
        loading={loading}
        pagination={{ pageSize: 10, showSizeChanger: false, position: ["bottomCenter"] }}
      />

      {/* Modal Delete */}
      <Modal
        title={t("user.deleteConfirmTitle")}
        open={isDeleteModal}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModal(false)}
        okText={t("user.deleteOk")}
        cancelText={t("user.deleteCancel")}
        okButtonProps={{ danger: true }}
      >
        <p
          dangerouslySetInnerHTML={{
            __html: t("user.deleteConfirmText", { name: selectedUser?.name || selectedUser?.id }),
          }}
        />
      </Modal>

      {/* Modal Update */}
      <Modal
        title={t("user.updateModalTitle")}
        open={isUpdateModal}
        onOk={() =>
          document
            .getElementById("updateUserForm")
            .dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
        }
        onCancel={() => setIsUpdateModal(false)}
        okText={t("user.updateOk")}
        cancelText={t("user.updateCancel")}
      >
        <Formik
          enableReinitialize
          initialValues={initialUserValues(selectedUser)}
          validate={validateUser}
          onSubmit={handleSubmitUpdate(handleUpdate, setIsUpdateModal)}
        >
          {({ values, handleChange, setFieldValue }) => (
            <AMUS.FormStyled id="updateUserForm">
              <label>{t("user.form.namePlaceholder")}</label>
              <Input
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder={t("user.form.namePlaceholder")}
              />
              <AMUS.ErrorMessageStyled name="name" component="div" />

              <label>{t("user.form.roleLabel")}</label>
              <AMUS.SelectFormStyled value={values.role} onChange={(val) => setFieldValue("role", val)}>
                <Select.Option value="admin">{t("user.roleAdmin")}</Select.Option>
                <Select.Option value="customer">{t("user.roleCustomer")}</Select.Option>
              </AMUS.SelectFormStyled>
              <AMUS.ErrorMessageStyled name="role" component="div" />

              <label>{t("user.form.statusLabel")}</label>
              <AMUS.SelectFormStyled value={values.status} onChange={(val) => setFieldValue("status", val)}>
                <Select.Option value="active">{t("user.statusActive")}</Select.Option>
                <Select.Option value="inactive">{t("user.statusInactive")}</Select.Option>
              </AMUS.SelectFormStyled>
              <AMUS.ErrorMessageStyled name="status" component="div" />

              <label>{t("user.form.moneyBalanceLabel")}</label>
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                value={values.moneyBalance}
                onChange={(val) => setFieldValue("moneyBalance", val)}
              />
              <AMUS.ErrorMessageStyled name="moneyBalance" component="div" />
            </AMUS.FormStyled>
          )}
        </Formik>
      </Modal>
    </ConfigProvider>
  );
}
