import React, { useState } from "react";
import { Form, Button, Table, Tabs, Tag, Select, DatePicker, Row, Col } from "antd";
import { parseISO, format, isAfter, isBefore, endOfDay } from "date-fns";
import { useTranslation } from "react-i18next";

import { DepositFormStyled as DFS } from "@/components";
import { useDeposit } from "@/hooks/deposit/useDeposit";
import { useTransactions } from "@/hooks/transactions/useTransactions";
import { formatNumberCurrency, parseNumberCurrency } from "@/utils/helpers";

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function DepositForm() {
  const { t } = useTranslation(["deposit"]);
  const { handleDeposit, depositSchema, loading, errorMsg, setErrorMsg } = useDeposit();
  const { transactionsUser } = useTransactions();

  const [activeTab, setActiveTab] = useState("deposit");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState([]);

  const filteredTransactions = (transactionsUser || [])
    .filter((t) => {
      const matchStatus = statusFilter === "all" || t.status === statusFilter;
      const matchDate =
        dateRange.length === 2
          ? isAfter(parseISO(t.created_at), dateRange[0]) && isBefore(parseISO(t.created_at), endOfDay(dateRange[1]))
          : true;
      return matchStatus && matchDate;
    })
    .sort((a, b) => parseISO(b.created_at) - parseISO(a.created_at));

  const columns = [
    {
      title: t("table.date"),
      dataIndex: "created_at",
      key: "created_at",
      sorter: (a, b) => parseISO(a.created_at) - parseISO(b.created_at),
      defaultSortOrder: "descend",
      render: (text) => format(parseISO(text), "dd/MM/yyyy HH:mm:ss"),
    },
    {
      title: t("table.amount"),
      dataIndex: "amount",
      key: "amount",
      render: (amount) => formatNumberCurrency(amount) + " VND",
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: t("table.status"),
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status === "success" ? (
          <Tag color="green">{t("status.success")}</Tag>
        ) : (
          <Tag color="red">{t("status.failed")}</Tag>
        ),
    },
    {
      title: t("table.description"),
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <DFS.StyledContainer>
      <DFS.StyledCard style={{ width: "90%", maxWidth: 1200 }}>
        <DFS.StyledTitle level={2}>{t("title")}</DFS.StyledTitle>

        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <Tabs.TabPane tab={t("tab.deposit")} key="deposit">
            {errorMsg && <DFS.StyledAlert onClose={() => setErrorMsg(null)}>{t("alert.error")}</DFS.StyledAlert>}

            <Form
              layout="vertical"
              onFinish={handleDeposit}
              requiredMark={false}
              validateTrigger="onSubmit"
              initialValues={{ amount: "" }}
            >
              <Form.Item
                label={t("form.amount")}
                name="amount"
                rules={[
                  {
                    validator: async (_, value) => {
                      try {
                        await depositSchema.validate({ amount: value });
                      } catch (error) {
                        return Promise.reject(error.message);
                      }
                    },
                  },
                ]}
              >
                <DFS.StyledInputNumber
                  placeholder={t("form.placeholder")}
                  disabled={loading}
                  min={1000}
                  max={100000000}
                  formatter={formatNumberCurrency}
                  parser={parseNumberCurrency}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading} size="large">
                  {t("form.submit")}
                </Button>
              </Form.Item>
            </Form>

            <DFS.StyledText type="secondary">{t("form.note")}</DFS.StyledText>
          </Tabs.TabPane>

          <Tabs.TabPane tab={t("tab.history")} key="history">
            <div style={{ position: "sticky", top: 0, zIndex: 1, background: "#fff", paddingBottom: 16 }}>
              <Row gutter={[16, 16]}>
                <Col>
                  <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 180 }}>
                    <Option value="all">{t("status.all")}</Option>
                    <Option value="success">{t("status.success")}</Option>
                    <Option value="failed">{t("status.failed")}</Option>
                  </Select>
                </Col>
                <Col>
                  <RangePicker
                    onChange={(dates) => setDateRange(dates ? [dates[0].toDate(), dates[1].toDate()] : [])}
                  />
                </Col>
              </Row>
            </div>

            <Table
              columns={columns}
              dataSource={filteredTransactions}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              scroll={{ x: "max-content", y: 500 }}
              style={{ marginTop: 16 }}
            />
          </Tabs.TabPane>
        </Tabs>
      </DFS.StyledCard>
    </DFS.StyledContainer>
  );
}
