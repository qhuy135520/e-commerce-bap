// AdminStatisticsOrderPage.jsx
import React, { useEffect } from "react";
import { Table, ConfigProvider } from "antd";
import { PieChart, Pie, Cell, Tooltip as ReTooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
import { useDispatch, useSelector } from "react-redux";

import { ordersSelector } from "@/stores/rootSelector";
import { formatNumberCurrency } from "@/utils/helpers";
import { fetchAllOrdersAdmin } from "@/stores/order/orders.thunks";
import useOrderAdmin from "@/hooks/order/useOrderAdmin";

import { ChartsWrapper, ChartContainer } from "@/pages/privatePages/admin/statistical/AdminStatistical.styled";

export default function AdminStatisticsOrderPage() {
  const dispatch = useDispatch();
  const ordersFromStore = useSelector(ordersSelector.selectAllOrdersAdmin);
  const orders = ordersFromStore ?? [];
  const loading = useSelector((state) => state.orders?.status === "loading");

  useEffect(() => {
    if (!orders || orders.length === 0) {
      dispatch(fetchAllOrdersAdmin());
    }
  }, [orders, dispatch]);

  const { filteredOrders, statusData, topCustomers } = useOrderAdmin(orders);

  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "order_id",
      key: "order_id",
      width: "15%",
      render: (id) => <span>{id?.substring(0, 8)}</span>,
    },
    {
      title: "Khách hàng",
      dataIndex: "user_name",
      key: "user_name",
      width: "25%",
      render: (text, record) => text || record.userId || "N/A",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total_amount",
      key: "total_amount",
      width: "20%",
      render: (val) => <span style={{ fontWeight: 600, color: "blue" }}>{formatNumberCurrency(Number(val || 0))}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "20%",
      render: (status) => {
        const color =
          status === "completed"
            ? "green"
            : status === "pending"
            ? "orange"
            : status === "canceled" || status === "cancelled"
            ? "red"
            : "gray";
        return <span style={{ fontWeight: 600, color }}>{status}</span>;
      },
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "20%",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    },
  ];

  const COLORS = ["#00C49F", "#ffbb28", "#dae723", "#ff4242"];

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
      }}
    >
      <ChartsWrapper>
        {/* Pie Chart: trạng thái đơn hàng */}
        <ChartContainer>
          <h3>Trạng thái đơn hàng</h3>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ReTooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Bar Chart: top khách hàng */}
        <ChartContainer>
          <h3>Top 5 khách hàng nhiều đơn</h3>
          <ResponsiveContainer>
            <BarChart data={topCustomers} layout="vertical" margin={{ left: 50 }}>
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Bar dataKey="total" fill="#1890ff" />
              <ReTooltip />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </ChartsWrapper>

      {/* Bảng */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredOrders}
        loading={!!loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
          position: ["bottomCenter"],
        }}
      />
    </ConfigProvider>
  );
}
