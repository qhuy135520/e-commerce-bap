import { Button, Table } from "antd";
import { useState } from "react";

import { CartTableStyled as CTS } from "@/components";

import { formatCurrency } from "@/utils/helpers";

const originalData = [
  { key: "1", product: "Laptop", unitPrice: 199000, quantity: 2, totalPrice: 398000 },
  { key: "2", product: "iPhone", unitPrice: 750000, quantity: 1, totalPrice: 750000 },
  { key: "3", product: "Tai nghe Bluetooth", unitPrice: 320000, quantity: 3, totalPrice: 960000 },
  { key: "4", product: "laptop 15 inch", unitPrice: 450000, quantity: 1, totalPrice: 450000 },
];

export default function CartTable() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "product",
    },
    {
      title: "Đơn giá",
      dataIndex: "unitPrice",
      render: (value) => formatCurrency(value),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Giá tiền",
      dataIndex: "totalPrice",
      render: (value) => formatCurrency(value),
    },
    {
      title: "Thao tác",
      render: (_, record) => <Button danger>Xóa</Button>,
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (newKeys, selectedRows) => {
      setSelectedRowKeys(newKeys);
    },
  };

  const selectedItems = originalData.filter((item) => selectedRowKeys.includes(item.key));
  const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleBuyNow = () => {
    if (totalQuantity > 0) {
    }
  };

  return (
    <CTS.CartWrapper>
      <Table rowSelection={{ type: "checkbox", ...rowSelection }} columns={columns} dataSource={originalData} />
      <CTS.CardCartTable title="Tổng hợp giỏ hàng">
        <p>
          <strong>Tổng số lượng:</strong> {totalQuantity}
        </p>
        <p>
          <strong>Tổng giá tiền:</strong> {formatCurrency(totalPrice)}
        </p>
        <CTS.BuyButton onClick={handleBuyNow} disabled={totalQuantity === 0}>
          Mua hàng
        </CTS.BuyButton>
      </CTS.CardCartTable>
    </CTS.CartWrapper>
  );
}
