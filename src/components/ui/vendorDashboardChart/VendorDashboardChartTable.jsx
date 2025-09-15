import React from "react";
import { useRef, useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  LabelList,
} from "recharts";
import * as ADS from "@/components/ui/adminDashboard/adminDashboard.styled.jsx";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
import useVendorManager from "@/hooks/vendor/useVendorManager";

const COLORS = ["#FFBB28", "#0088FE", "#00e93a", "#FF8042", "#A020F0"];

export default function VendorDashboardChartTable() {
  const { products, pieOrder, piePayment, productSalestData, lineOrderData, productEmptyStock } = useVendorManager();

  return (
    <ADS.DashboardContainer>
      <ADS.PieChartContainer>
        <ADS.InfoProductWrapper>
          <div> Tổng số sản phẩm : {products.length}</div>
          <div>Số sản phẩm hết hàng: {productEmptyStock.length}</div>
        </ADS.InfoProductWrapper>
        <ADS.PieChartWrapper>
          <ADS.ChartTitle>Đơn hàng</ADS.ChartTitle>
          <PieChart width={350} height={350}>
            <Pie data={pieOrder} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
              {pieOrder.map((entry, index) => (
                <Cell key={`cell-3-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ADS.PieChartWrapper>
        <ADS.PieChartWrapper>
          <ADS.ChartTitle>Doanh thu</ADS.ChartTitle>
          <PieChart width={350} height={350}>
            <Pie data={piePayment} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
              {piePayment.map((entry, index) => (
                <Cell key={`cell-3-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ADS.PieChartWrapper>
        <div>
          <ADS.ChartTitle>Top 5 sản phẩm bán chạy</ADS.ChartTitle>
          <BarChart width={1000} height={300} data={productSalestData}>
            <XAxis dataKey="name" tick={{ fontSize: 14 }} interval={0} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name="Số lượng" fill="#8884d8">
              <LabelList dataKey="value" position="top" />
            </Bar>
          </BarChart>
        </div>
        <div>
          <ADS.ChartTitle>Đơn hàng theo thời gian</ADS.ChartTitle>
          <LineChart
            width={800}
            height={400}
            data={lineOrderData}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="orders" stroke="#8884d8" name="Số đơn hàng" />
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" name="Doanh thu" />
          </LineChart>
        </div>
      </ADS.PieChartContainer>
    </ADS.DashboardContainer>
  );
}
