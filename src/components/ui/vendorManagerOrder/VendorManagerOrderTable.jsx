import React from "react";
import { Button, ConfigProvider, Modal, Table } from "antd";

import useUpdateStatus from "@/hooks/order/useUpdateStatus";

import {ListProductOrder, ChangeStatus} from "@/components";

import { formatCurrency } from "@/utils/helpers";

export default function VendorManagerOrderTable() {
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
          variant="solid"
          color={value === "pending" ? "red" : value === "shipped" ? "yellow" : "green"}
        >
          {value === "pending" ? "Đang xử lý" : value === "shipped" ? "Đang giao" : "Đã hoàn tất"}
        </Button>
      ),
    },
    {
      title: "Tổng giá",
      dataIndex: "totalorder",
      key: "totalorder",
      render: (text) => <b>{formatCurrency(text)}</b>,
    },
  ];

  const { orders, selectOrder, isModalOpen, updateOrderStatus, handleCancel, openUpdateModal } = useUpdateStatus();

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
        onOk={() => updateOrderStatus(selectOrder)}
        onCancel={handleCancel}
        zIndex={4000}
      >
        <ChangeStatus selectOrder={selectOrder} />
      </Modal>
    </ConfigProvider>
  );
}
