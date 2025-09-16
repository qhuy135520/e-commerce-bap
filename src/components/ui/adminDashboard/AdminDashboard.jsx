import { useRef, useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { useTranslation } from "react-i18next";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
import { AdminDashboardStyled as ADS } from "@/components";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#ff2e2e"];

export default function AdminDashboard() {
  const { t } = useTranslation(["admin"]);
  const lineChartRef = useRef(null);
  const [lineChartWidth, setLineChartWidth] = useState(700);
  const { pieUser, pieProduct, pieOrder, lineData, toggleView, setToggleView } = useAdminDashboard();

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
        <ADS.TopPiesRow>
          <ADS.PieChartWrapper>
            <ADS.ChartTitle>{t("chart.user")}</ADS.ChartTitle>
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
            <ADS.ChartTitle>{t("chart.product")}</ADS.ChartTitle>
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
        </ADS.TopPiesRow>

        <ADS.PieChartWrapper>
          <ADS.ChartTitle>{t("chart.order")}</ADS.ChartTitle>
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
        <ADS.ChartTitle>{t("chart.income")}</ADS.ChartTitle>
        <ADS.ToggleButtons>
          <ADS.ToggleButton onClick={() => setToggleView("monthly")} active={toggleView === "monthly"}>
            {t("chart.monthly")}
          </ADS.ToggleButton>
          <ADS.ToggleButton onClick={() => setToggleView("daily")} active={toggleView === "daily"}>
            {t("chart.daily")}
          </ADS.ToggleButton>
          <ADS.ToggleButton onClick={() => setToggleView("hourly")} active={toggleView === "hourly"}>
            {t("chart.hourly")}
          </ADS.ToggleButton>
        </ADS.ToggleButtons>
        <LineChart
          width={lineChartWidth * 0.95}
          height={400}
          data={lineData}
          margin={{ top: 5, right: 20, left: 80, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            textAnchor="end"
            height={80}
            tickFormatter={(value) => (toggleView === "hourly" ? value.split(" ")[1] : value)}
            domain={["dataMin", "dataMax"]}
            ticks={toggleView === "hourly" ? lineData.map((d) => d.name) : undefined}
          />
          <YAxis
            width={100}
            domain={[0, "auto"]}
            tickFormatter={(value) => new Intl.NumberFormat("vi", { style: "currency", currency: "VND" }).format(value)}
          />
          <Tooltip
            formatter={(value, name, props) => [
              new Intl.NumberFormat("vi", { style: "currency", currency: "VND" }).format(value),
              props.dataKey === "orderTotal" ? t("chart.revenue") : t("chart.commission"),
            ]}
          />
          <Legend />
          <Line type="monotone" dataKey="adminCommission" stroke="#82ca9d" name={t("chart.commission")} />
          <Line type="monotone" dataKey="orderTotal" stroke="#8884d8" name={t("chart.revenue")} />
        </LineChart>
      </ADS.LineChartContainer>
    </ADS.DashboardContainer>
  );
}
