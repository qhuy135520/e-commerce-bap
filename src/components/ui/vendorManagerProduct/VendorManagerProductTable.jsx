import React from "react";
import { Avatar, Button, ConfigProvider, Space, Table } from "antd";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: "5%",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
    key: "name",
    width: "15%",
    render: (text) => <b>{text}</b>,
  },
  {
    title: "Hình ảnh",
    dataIndex: "image",
    key: "image",
    width: "10%",
    render: (text) => <Avatar shape='square' size={80} src={text} />
  },
  {
    title: "Brand",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "Số lượng",
    key: "quantity",
    dataIndex: "quantity",
    width: "8%",
  },
  {
    title: "Mô tả",
    key: "description",
    dataIndex: "description",
  },
  {
    title: "Thông số",
    key: "param",
    dataIndex: "param",
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
const data = [
  {
    id: "123",
    name: "Iphone 14 Promaxx",
    image: "https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-midnight-2-600x600.jpg",
    brand: "Iphone",
    quantity: 99,
    description: "Iphone 14 siêu đẹp, thế hệ mới nhất với các tính năng nổi trội",
    param: "Màn hình 12inch, Ram 16GB, dung lượng 512GB, GTX1050Ti",
  },
];
export default function VendorManagerProductTable() {
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
        token: {
          colorBgContainer: "var(--color-grey-100)",
          colorText: "var(--color-grey-800)",
        },
      }}
    >
      <Table columns={columns} dataSource={data} />;
    </ConfigProvider>
  );
}
