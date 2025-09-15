import React, { useEffect } from "react";
import { Table, ConfigProvider } from "antd";
import { PieChart, Pie, Cell, Tooltip as ReTooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { productsSelector } from "@/stores/rootSelector";
import { productsThunk } from "@/stores/rootThunk";
import useProductAdmin from "@/hooks/products/useProductAdmin";

import * as ASP from "@/pages/privatePages/admin/statistical/AdminStatistical.styled";
import { formatNumberCurrency } from "@/utils/helpers";

export default function AdminStatisticsProductPage() {
  const { t } = useTranslation(["admin"]);
  const dispatch = useDispatch();
  const productsFromStore = useSelector(productsSelector.selectAllProducts);
  const products = productsFromStore ?? [];
  const loading = useSelector((state) => state.products?.status === "loading");

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(productsThunk.getAllProducts());
    }
  }, [products, dispatch]);

  const { filteredProducts, statusData, topStock } = useProductAdmin(products);

  const columns = [
    {
      title: t("statisticProduct.productId"),
      dataIndex: "id",
      key: "id",
      width: "10%",
      render: (text) => <span>{text?.substring(0, 6)}</span>,
    },
    {
      title: t("statisticProduct.productName"),
      dataIndex: "name",
      key: "name",
      width: "30%",
      render: (text) => <b>{text || t("statisticProduct.noData")}</b>,
    },
    {
      title: t("statisticProduct.price"),
      dataIndex: "price",
      key: "price",
      width: "15%",
      render: (price) => (
        <span style={{ fontWeight: 600, color: "blue" }}>{formatNumberCurrency(Number(price || 0))}</span>
      ),
    },
    {
      title: t("statisticProduct.stock"),
      dataIndex: "stock",
      key: "stock",
      width: "15%",
    },
  ];

  const COLORS = ["#00C49F", "#ff4242"];

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
      }}
    >
      <ASP.ChartsWrapper>
        <ASP.ChartContainer>
          <h3>{t("statisticProduct.statusChartTitle")}</h3>
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
        </ASP.ChartContainer>

        <ASP.ChartContainer>
          <h3>{t("statisticProduct.topStockChartTitle")}</h3>
          <ResponsiveContainer>
            <BarChart data={topStock} layout="vertical" margin={{ left: 50, top: 20 }}>
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Bar dataKey="stock" fill="#18e4ff" />
              <ReTooltip />
            </BarChart>
          </ResponsiveContainer>
        </ASP.ChartContainer>
      </ASP.ChartsWrapper>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredProducts}
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
