import React from "react";
import { Form, Button } from "antd";
import { useDeposit } from "@/hooks/Deposit/useDeposit";
import { DepositFormStyled as DFS } from "@/components";
import { formatNumberCurrency, parseNumberCurrency } from "@/utils/helpers";

export default function DepositForm() {
  const { handleDeposit, depositSchema, loading, errorMsg, setErrorMsg } = useDeposit();

  return (
    <DFS.StyledContainer>
      <DFS.StyledCard>
        <DFS.StyledTitle level={2}>Nạp tiền</DFS.StyledTitle>
        {errorMsg && <DFS.Alert type="error" message={errorMsg} closable onClose={() => setErrorMsg(null)} />}
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
      </DFS.StyledCard>
    </DFS.StyledContainer>
  );
}
