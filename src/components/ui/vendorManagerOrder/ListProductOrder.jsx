import { Avatar, ConfigProvider, Table } from "antd";
import { formatCurrency } from "@/utils/helpers";

export default function ListProductOrder({ products }) {
  
  const productColumns = [
    {
      title: "Sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Hình ảnh",
      dataIndex: "productImg",
      key: "productImg",
      render: (value) =>
        value ? <Avatar shape="square" size={80} src={value} /> : <Avatar shape="square" size={80} icon="📷" />,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (value) => formatCurrency(value),
    },
    {
      title: "Thành tiền",
      key: "totalPrice",
      render: (_, p) => formatCurrency(p.quantity * p.price),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "var(--color-grey-700)",
            headerColor: "var(--color-grey-50)",
            rowHoverBg: "var(--color-grey-500)",
            borderRadiusLG: 0,
          },
        },
        token: {
          colorBgContainer: "var(--color-grey-600)",
          colorText: "var(--color-grey-50)",
        },
      }}
    >
      <Table
        columns={productColumns}
        dataSource={products}
        pagination={false}
        rowKey={(p) => p.productId}
        size="small"
      />
    </ConfigProvider>
  );
}
