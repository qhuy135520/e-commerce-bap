import React from "react";
import { Button, ConfigProvider, Space, Table, Tooltip, Modal, Select } from "antd";
import { formatNumberCurrency } from "@/utils/helpers";
import useProductAdmin from "@/hooks/products/useProductAdmin";
import * as AMOD from "@/components/ui/admin/AdminManagerUser.styled";

export default function AdminManagerProductTable({ products, loading }) {
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
    { title: "ID", dataIndex: "id", key: "id", width: "10%", render: (text) => <span>{text?.substring(0, 6)}</span> },
    { title: "Tên sản phẩm", dataIndex: "name", key: "name", width: "25%", render: (text) => <b>{text}</b> },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: "15%",
      render: (price) => (
        <span style={{ fontWeight: 600, color: "blue" }}>{formatNumberCurrency(Number(price || 0))}</span>
      ),
    },
    { title: "Tồn kho", dataIndex: "stock", key: "stock", width: "10%" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (status) => (
        <Tooltip title={status ? "Đã duyệt" : "Chưa duyệt"}>
          <span>{status ? "Active" : "Pending"}</span>
        </Tooltip>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      width: "25%",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type={record.status ? "default" : "primary"}
            disabled={record.status || modal.visible}
            onClick={() => !record.status && handleAction("approve", record)}
          >
            Duyệt
          </Button>
          <Button danger disabled={modal.visible} onClick={() => handleAction("delete", record)}>
            Xóa
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
      {/* Search + Filter */}
      <AMOD.SpaceStyled>
        <AMOD.SearchInput
          placeholder="Tìm kiếm theo tên hoặc ID..."
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onSearch={handleSearch}
        />
        <AMOD.SelectStyled value={statusFilter} onChange={setStatusFilter} size="large">
          <Select.Option value="all">Tất cả</Select.Option>
          <Select.Option value="approved">Đã duyệt</Select.Option>
          <Select.Option value="pending">Chưa duyệt</Select.Option>
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
        title={modal.type === "approve" ? "Xác nhận duyệt sản phẩm" : "Xác nhận xóa sản phẩm"}
        open={modal.visible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText={modal.type === "approve" ? "Duyệt" : "Xóa"}
        cancelText="Hủy"
        okButtonProps={{ danger: modal.type === "delete" }}
      >
        <p>
          Bạn có chắc chắn muốn {modal.type === "approve" ? "duyệt" : "xóa"} sản phẩm{" "}
          <b>{modal.product?.name || modal.product?.id}</b> không?
        </p>
      </Modal>
    </ConfigProvider>
  );
}
