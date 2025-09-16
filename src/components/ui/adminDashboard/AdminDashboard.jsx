import { useRef, useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

import { AdminDashboardStyled as ADS } from "@/components";

import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function AdminDashboard() {
  const lineChartRef = useRef(null);
  const [lineChartWidth, setLineChartWidth] = useState(700);
  const { pieUser, pieProduct, pieOrder, lineData } = useAdminDashboard();

  useEffect(() => {
    const updateWidth = () => {
      if (lineChartRef.current) {
        setLineChartWidth(lineChartRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <ADS.DashboardContainer>
      <ADS.PieChartContainer>
        <ADS.PieChartWrapper>
          <ADS.ChartTitle>Người dùng</ADS.ChartTitle>
          <PieChart width={350} height={350}>
            <Pie data={pieUser} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
              {pieUser.map((entry, index) => (
                <Cell key={`cell-1-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ADS.PieChartWrapper>

        <ADS.PieChartWrapper>
          <ADS.ChartTitle>Sản phẩm</ADS.ChartTitle>
          <PieChart width={350} height={350}>
            <Pie data={pieProduct} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
              {pieProduct.map((entry, index) => (
                <Cell key={`cell-2-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ADS.PieChartWrapper>

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
      </ADS.PieChartContainer>

      <ADS.LineChartContainer ref={lineChartRef}>
        <ADS.ChartTitle>Biểu đồ thu nhập</ADS.ChartTitle>
        <LineChart
          width={lineChartWidth}
          height={500}
          data={lineData}
          margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" interval={0} textAnchor="end" height={60} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="orderTotal" stroke="#8884d8" name="Thu nhập người bán" />
          <Line type="monotone" dataKey="adminCommission" stroke="#82ca9d" name="Hoa hồng" />
        </LineChart>
      </ADS.LineChartContainer>
    </ADS.DashboardContainer>
  );
}
