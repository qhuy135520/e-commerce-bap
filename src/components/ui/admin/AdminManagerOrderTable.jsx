import React from "react";
import { Button, ConfigProvider, Space, Table, Tooltip, Modal, Select } from "antd";

import { formatNumberCurrency } from "@/utils/helpers";

import useOrderAdmin from "@/hooks/order/useOrderAdmin";

import * as AMOD from "@/components/ui/admin/AdminManagerUser.styled";

export default function AdminManagerOrderTable({ orders, loading }) {
  const {
    filteredOrders,
    modal,
    searchInput,
    setSearchInput,
    handleSearch,
    statusFilter,
    setStatusFilter,
    handleAction,
    handleConfirm,
    handleCancel,
  } = useOrderAdmin(orders);

  const columns = [
    { title: "Order ID", dataIndex: "order_id", key: "order_id", render: (id) => <span>order_{id?.slice(0, 6)}</span> },
    {
      title: "Tên người đặt",
      dataIndex: "user_name",
      key: "userId",
      render: (id) => <span>{id}</span>,
    },
    {
      title: "Tổng tiền",
      dataIndex: "total_amount",
      key: "total_amount",
      render: (amount) => (
        <span style={{ fontWeight: 600, color: "blue" }}>{formatNumberCurrency(Number(amount || 0))}</span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tooltip title={status}>
          <span style={{ textTransform: "capitalize" }}>{status}</span>
        </Tooltip>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            danger
            disabled={record.status !== "pending" || modal.visible}
            onClick={() => handleAction("cancel", record)}
          >
            Hủy
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
            rowHoverBg: "var(--color-grey-200)",
          },
        },
        token: { colorBgContainer: "var(--color-grey-100)", colorText: "var(--color-grey-800)" },
      }}
    >
      {/* Search + Filter */}
      <AMOD.SpaceStyled>
        <AMOD.SearchInput
          placeholder="Tìm theo Order ID hoặc User ID..."
          allowClear
          enterButton="Tìm"
          size="large"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onSearch={handleSearch}
        />
        <AMOD.SelectStyled value={statusFilter} onChange={setStatusFilter} size="large">
          <Select.Option disabled>Trạng thái</Select.Option>
          <Select.Option value="all">Tất cả </Select.Option>
          <Select.Option value="pending">Đang xử lí</Select.Option>
          <Select.Option value="shipped">Đang giao hàng</Select.Option>
          <Select.Option value="completed">Hoàn thành</Select.Option>
          <Select.Option value="cancelled">Đơn hủy</Select.Option>
        </AMOD.SelectStyled>
      </AMOD.SpaceStyled>

      <Table
        rowKey="order_id"
        columns={columns}
        dataSource={filteredOrders}
        loading={loading}
        pagination={{ pageSize: 10, showSizeChanger: false }}
      />

      <Modal
        title="Xác nhận hủy đơn hàng"
        open={modal.visible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText="Hủy đơn"
        cancelText="Thoát"
        okButtonProps={{ danger: modal.type === "cancel" }}
      >
        <p>
          Bạn có chắc chắn muốn hủy đơn hàng <b>{modal.order?.order_id}</b> không?
        </p>
      </Modal>
    </ConfigProvider>
  );
}
