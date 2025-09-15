import React from "react";
import { useTranslation } from "react-i18next";
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

import useVendorManager from "@/hooks/vendor/useVendorManager";

import { VendorDashboardChartTableStyled as VDCTS } from "@/components";

const COLORS = ["#FFBB28", "#0088FE", "#00e93a", "#FF8042", "#A020F0"];

export default function VendorDashboardChartTable() {
  const { t } = useTranslation("vendor");
  const { products, pieOrder, piePayment, productSalestData, lineOrderData, productEmptyStock } = useVendorManager();

  return (
    <VDCTS.DashboardContainer>
      <VDCTS.PieChartContainer>
        <VDCTS.InfoProductWrapper>
          <div>
            {t("chart.totalProducts")} : {products.length}
          </div>
          <div>
            {t("chart.outOfStock")} : {productEmptyStock.length}
          </div>
        </VDCTS.InfoProductWrapper>

        <VDCTS.PieChartWrapper>
          <VDCTS.ChartTitle>{t("chart.pieOrder.title")}</VDCTS.ChartTitle>
          <PieChart width={350} height={350}>
            <Pie data={pieOrder} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
              {pieOrder.map((entry, index) => (
                <Cell key={`cell-order-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </VDCTS.PieChartWrapper>

        <VDCTS.PieChartWrapper>
          <VDCTS.ChartTitle>{t("chart.piePayment.title")}</VDCTS.ChartTitle>
          <PieChart width={350} height={350}>
            <Pie data={piePayment} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
              {piePayment.map((entry, index) => (
                <Cell key={`cell-payment-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </VDCTS.PieChartWrapper>

        <div>
          <VDCTS.ChartTitle>{t("chart.barTopProducts.title")}</VDCTS.ChartTitle>
          <BarChart width={1000} height={300} data={productSalestData}>
            <XAxis dataKey="name" tick={{ fontSize: 14 }} interval={0} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name={t("chart.barTopProducts.value")} fill="#8884d8">
              <LabelList dataKey="value" position="top" />
            </Bar>
          </BarChart>
        </div>

        <div>
          <VDCTS.ChartTitle>{t("chart.lineOrdersOverTime.title")}</VDCTS.ChartTitle>
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
            <Line type="monotone" dataKey="orders" stroke="#8884d8" name={t("chart.lineOrdersOverTime.orders")} />
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" name={t("chart.lineOrdersOverTime.revenue")} />
          </LineChart>
        </div>
      </VDCTS.PieChartContainer>
    </VDCTS.DashboardContainer>
  );
}
