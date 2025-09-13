import React from "react";
import { FaCheck } from "react-icons/fa";
import { Button, ConfigProvider, Modal, Table, Tag } from "antd";

import useUpdateStatus from "@/hooks/order/useUpdateStatus";

import { ListProductOrder, ChangeStatus, VendorOrderOperation } from "@/components";

import { formatCurrency } from "@/utils/helpers";
import { COMMISSION } from "@/constants";

export default function VendorManagerOrderTable() {
  const { orders, selectOrder, isModalOpen, updateOrderStatus, handleCancel, openUpdateModal } = useUpdateStatus();
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderid",
      key: "orderid",
      render: (text) => <b>{text?.substring(0, 5)}</b>,
    },
    {
      title: "Tên khách hàng",
      dataIndex: "username",
      key: "username",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (value, record) => (
        <Button
          onClick={() => openUpdateModal(record)}
          type="primary"
          color={
            value === "pending" ? "yellow" : value === "shipped" ? "blue" : value === "canceled" ? "red " : "green"
          }
          variant="solid"
        >
          {value === "pending"
            ? "Chưa xử lý"
            : value === "shipped"
            ? "Đang giao"
            : value === "canceled"
            ? "Đã hủy "
            : "Đã hoàn tất"}
        </Button>
      ),
    },
    {
      title: "Tổng giá",
      dataIndex: "totalorder",
      key: "totalorder",
      render: (text) => <b>{formatCurrency(text)}</b>,
    },
    {
      title: "Tiền thực nhận",
      dataIndex: "totalorder",
      key: "totalorder",
      render: (text, record) => (
        <b>
          {formatCurrency(text * COMMISSION)}{" "}
          {record.status === "paid" ? (
            <Tag icon={<FaCheck />} color="success">
              Đã thanh toán
            </Tag>
          ) : (
            <Tag icon={<FaCheck />} color="error">
              Chưa thanh toán
            </Tag>
          )}
        </b>
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
      <VendorOrderOperation
        options={[
          { value: "all", label: "Tất cả" },
          { value: "pending", label: "Chờ xử lý" },
          { value: "shipped", label: "Đang giao" },
          { value: "completed", label: "Hoàn thành" },
          { value: "paid", label: "Đã thanh toán" },
        ]}
      />

      <Table
        columns={columns}
        dataSource={orders}
        rowKey="orderid"
        expandable={{
          expandedRowRender: (record) => <ListProductOrder products={record.products} />,
        }}
      />
      <Modal
        title="Xác nhận đổi trạng thái"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        zIndex={4000}
      >
        <ChangeStatus selectOrder={selectOrder} updateOrderStatus={updateOrderStatus} />
      </Modal>
    </ConfigProvider>
  );
}
