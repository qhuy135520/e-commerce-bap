import React from "react";
import { Button, ConfigProvider, Space, Table, Tooltip, Modal, Input, Select, InputNumber } from "antd";
import { useUser } from "@/hooks/authentication/useUser";
import * as AMUS from "@/components/ui/admin/AdminManagerUser.styled";
import { Formik, Form, ErrorMessage } from "formik";

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
      <span style={{ fontWeight: 600, color: "blue" }}>{Number(balance || 0).toLocaleString("vi-VN")} ₫</span>
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
          style={{ width: 300 }}
        />
      </AMUS.ButtonPosition>

      <Table
        rowKey="id"
        columns={columns(handleDeleteConfirm, handleUpdateConfirm)}
        dataSource={filteredUsers}
        loading={loading}
        pagination={{ pageSize: 10 }}
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

      {/* Modal cập nhật */}
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
            <Form id="updateUserForm" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {/* Tên người dùng */}
              <label>Tên người dùng</label>
              <Input name="name" value={values.name} onChange={handleChange} placeholder="Nhập tên người dùng" />
              <ErrorMessage name="name" component="div" style={{ color: "red", fontSize: 12 }} />

              {/* Vai trò */}
              <label>Vai trò</label>
              <Select value={values.role} onChange={(val) => setFieldValue("role", val)} style={{ width: "100%" }}>
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="customer">Customer</Select.Option>
              </Select>
              <ErrorMessage name="role" component="div" style={{ color: "red", fontSize: 12 }} />

              {/* Trạng thái */}
              <label>Trạng thái</label>
              <Select value={values.status} onChange={(val) => setFieldValue("status", val)} style={{ width: "100%" }}>
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="inactive">Inactive</Select.Option>
              </Select>
              <ErrorMessage name="status" component="div" style={{ color: "red", fontSize: 12 }} />

              {/* Số dư */}
              <label>Số dư (VNĐ)</label>
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                value={values.moneyBalance}
                onChange={(val) => setFieldValue("moneyBalance", val)}
              />
              <ErrorMessage name="moneyBalance" component="div" style={{ color: "red", fontSize: 12 }} />
            </Form>
          )}
        </Formik>
      </Modal>
    </ConfigProvider>
  );
}
