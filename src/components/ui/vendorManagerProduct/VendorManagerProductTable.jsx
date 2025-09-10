import React, { useState } from "react";
import { Avatar, Button, ConfigProvider, Space, Table, Tooltip, Modal } from "antd";

import { VendorManagerProductTableStyled as VMPTS, FormAddProduct } from "@/components";
import { useAddProduct } from "@/hooks/useAddProduct/useAddProduct";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: "5%",
    render: (text) => <span>{text?.substring(0, 5)}</span>,
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
    key: "name",
    width: "10%",
    render: (text) => <b>{text}</b>,
  },
  {
    title: "Hình ảnh",
    dataIndex: "images",
    key: "images",
    width: "10%",
    render: (images) =>
      images && images.length > 0 ? (
        <Avatar shape="square" size={80} src={images[0].imageUrl} />
      ) : (
        <Avatar shape="square" size={80} icon="📷" />
      ),
  },
  {
    title: "Nhãn hiệu",
    dataIndex: "brandname",
    key: "brandname",
    width: "10%",
  },
  {
    title: "Danh mục",
    dataIndex: "categoryname",
    key: "categoryname",
    width: "10%",
  },
  {
    title: "Số lượng",
    key: "stock",
    dataIndex: "stock",
    width: "10%",
  },
  {
    title: "Mô tả",
    key: "description",
    dataIndex: "description",
    width: "15%",
    render: (text) => (
      <Tooltip title={text}>
        <span>{text && text.length > 150 ? text.substring(0, 50) + "..." : text}</span>
      </Tooltip>
    ),
  },
  {
    title: "Thông số",
    key: "param",
    dataIndex: "param",
    width: "15%",
    render: (text) => (
      <Tooltip title={text}>
        <span>{text && text.length > 150 ? text.substring(0, 50) + "..." : text}</span>
      </Tooltip>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <Button>Cập nhật</Button>
        <Button>Xóa</Button>
      </Space>
    ),
  },
];
export default function VendorManagerProductTable({ products }) {
  const { handleOk, handleCancel, showModal, isModalOpen } = useAddProduct();
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
      <VMPTS.ButtonPosition>
        <Button size="large" color="blue" variant="solid" onClick={showModal}>
          + Thêm sản phẩm
        </Button>
      </VMPTS.ButtonPosition>
      <Table columns={columns} dataSource={products} />
      <Modal title="Thêm sản phẩm mới" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <FormAddProduct onCancel={handleCancel} />
      </Modal>
    </ConfigProvider>
  );
}
