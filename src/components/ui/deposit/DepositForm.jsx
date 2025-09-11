import React, { useState } from "react";
import { Form, Button, Table, Tabs, Tag, Select, DatePicker, Row, Col } from "antd";
import { DepositFormStyled as DFS } from "@/components";
import { formatNumberCurrency, parseNumberCurrency } from "@/utils/helpers";
import { useDeposit } from "@/hooks/deposit/useDeposit";
import { useTransactions } from "@/hooks/transactions/useTransactions";
import { parseISO, format, isAfter, isBefore, endOfDay } from "date-fns";

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function DepositForm() {
  const { handleDeposit, depositSchema, loading, errorMsg, setErrorMsg } = useDeposit();
  const { transaction } = useTransactions();

  const [activeTab, setActiveTab] = useState("deposit");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState([]);

  const filteredTransactions = (transaction || [])
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
      title: "Ngày",
      dataIndex: "created_at",
      key: "created_at",
      sorter: (a, b) => parseISO(a.created_at) - parseISO(b.created_at),
      defaultSortOrder: "descend",
      render: (text) => format(parseISO(text), "dd/MM/yyyy HH:mm:ss"),
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => formatNumberCurrency(amount) + " VND",
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status === "success" ? <Tag color="green">Thành công</Tag> : <Tag color="red">Thất bại</Tag>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <DFS.StyledContainer>
      <DFS.StyledCard style={{ width: "90%", maxWidth: 1200 }}>
        <DFS.StyledTitle level={2}>Nạp tiền VNPay</DFS.StyledTitle>

        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <Tabs.TabPane tab="Nạp tiền" key="deposit">
            {errorMsg && <DFS.StyledAlert onClose={() => setErrorMsg(null)}>{errorMsg}</DFS.StyledAlert>}

            <Form
              layout="vertical"
              onFinish={handleDeposit}
              requiredMark={false}
              validateTrigger="onSubmit"
              initialValues={{ amount: "" }}
            >
              <Form.Item
                label="Số tiền (VND)"
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
                  placeholder="Nhập số tiền"
                  disabled={loading}
                  min={1000}
                  max={100000000}
                  formatter={formatNumberCurrency}
                  parser={parseNumberCurrency}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading} size="large">
                  Thanh toán VNPay
                </Button>
              </Form.Item>
            </Form>

            <DFS.StyledText type="secondary">Bạn sẽ được chuyển hướng tới VNPay để hoàn tất thanh toán.</DFS.StyledText>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Lịch sử giao dịch" key="history">
            <div style={{ position: "sticky", top: 0, zIndex: 1, background: "#fff", paddingBottom: 16 }}>
              <Row gutter={[16, 16]}>
                <Col>
                  <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 180 }}>
                    <Option value="all">Tất cả trạng thái</Option>
                    <Option value="success">Thành công</Option>
                    <Option value="failed">Thất bại</Option>
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
