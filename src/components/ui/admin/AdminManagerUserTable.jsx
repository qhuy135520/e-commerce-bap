import React from "react";
import { Button, ConfigProvider, Space, Table, Tooltip, Modal, Input, Select, InputNumber } from "antd";
import { useUser } from "@/hooks/authentication/useUser";
import * as AMUS from "@/components/ui/admin/AdminManagerUser.styled";
import { Formik, Form, ErrorMessage } from "formik";
import { formatNumberCurrency } from "@/utils/helpers";
import styled from "styled-components";

const columns = (handleDeleteConfirm, handleUpdateConfirm) => [
  { title: "ID", dataIndex: "id", key: "id", width: "12%", render: (text) => <span>{text?.substring(0, 6)}</span> },
  {
    title: "Tên người dùng",
    dataIndex: "name",
    key: "name",
    width: "20%",
    render: (text) => <b>{text || "Chưa có tên"}</b>,
  },
  {
    title: "Vai trò",
    dataIndex: "role",
    key: "role",
    width: "12%",
    render: (role) => <span style={{ fontWeight: 600, color: role === "admin" ? "red" : "green" }}>{role}</span>,
  },
  {
    title: "Số dư (VNĐ)",
    dataIndex: "moneyBalance",
    key: "moneyBalance",
    width: "15%",
    render: (balance) => (
      <span style={{ fontWeight: 600, color: "blue" }}>{formatNumberCurrency(Number(balance || 0))}</span>
    ),
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    width: "12%",
    render: (status) => (
      <Tooltip title={status === "active" ? "Hoạt động" : "Đã khóa"}>
        <span>{status === "active" ? "✅ Active" : "❌ Inactive"}</span>
      </Tooltip>
    ),
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
    width: "15%",
    render: (date) => (date ? new Date(date).toLocaleDateString("vi-VN") : "—"),
  },
  {
    title: "Action",
    key: "action",
    width: "14%",
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary" onClick={() => handleUpdateConfirm(record)}>
          Cập nhật
        </Button>
        <Button danger onClick={() => handleDeleteConfirm(record)}>
          Xóa
        </Button>
      </Space>
    ),
  },
];

const ErrorMessageStyled = styled(ErrorMessage)`
  color: red;
`;
const FormStyled = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default function AdminManagerUserTable({ users, loading }) {
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
        },
        token: { colorBgContainer: "var(--color-grey-100)", colorText: "var(--color-grey-800)" },
      }}
    >
      {/* Search */}
      <AMUS.ButtonPosition>
        <AMUS.SearchInput
          placeholder="Tìm kiếm theo tên hoặc email..."
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onSearch={handleSearch}
        />
      </AMUS.ButtonPosition>

      <Table
        rowKey="id"
        columns={columns(handleDeleteConfirm, handleUpdateConfirm)}
        dataSource={filteredUsers}
        loading={loading}
        pagination={{ pageSize: 10, showSizeChanger: false }}
      />

      {/* Modal xác nhận xóa */}
      <Modal
        title="Xác nhận xóa"
        open={isDeleteModal}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModal(false)}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
      >
        <p>
          Bạn có chắc chắn muốn xóa user <b>{selectedUser?.name || selectedUser?.id}</b> không?
        </p>
      </Modal>

      <Modal
        title="Cập nhật User"
        open={isUpdateModal}
        onOk={() =>
          document
            .getElementById("updateUserForm")
            .dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
        }
        onCancel={() => setIsUpdateModal(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Formik
          enableReinitialize
          initialValues={initialUserValues(selectedUser)}
          validate={validateUser}
          onSubmit={handleSubmitUpdate(handleUpdate, setIsUpdateModal)}
        >
          {({ values, handleChange, setFieldValue }) => (
            <FormStyled id="updateUserForm">
              <label>Tên người dùng</label>
              <Input name="name" value={values.name} onChange={handleChange} placeholder="Nhập tên người dùng" />
              <ErrorMessageStyled name="name" component="div" />

              <label>Vai trò</label>
              <AMUS.SelectFormStyled value={values.role} onChange={(val) => setFieldValue("role", val)}>
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="customer">Customer</Select.Option>
              </AMUS.SelectFormStyled>
              <ErrorMessageStyled name="role" component="div" />

              <label>Trạng thái</label>
              <AMUS.SelectFormStyled value={values.status} onChange={(val) => setFieldValue("status", val)}>
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="inactive">Inactive</Select.Option>
              </AMUS.SelectFormStyled>
              <ErrorMessageStyled name="status" component="div" />

              <label>Số dư (VNĐ)</label>
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                value={values.moneyBalance}
                onChange={(val) => setFieldValue("moneyBalance", val)}
              />
              <ErrorMessageStyled name="moneyBalance" component="div" />
            </FormStyled>
          )}
        </Formik>
      </Modal>
    </ConfigProvider>
  );
}
