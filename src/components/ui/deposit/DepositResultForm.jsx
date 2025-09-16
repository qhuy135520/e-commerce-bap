import React, { useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Typography, Button, Divider } from "antd";

import { DepositResultFormStyled as DRFS } from "@/components";

import LoadingDeposit from "@/components/common/LoadingDeposit";

import { useDepositResult } from "@/hooks/deposit/useDepositResult";
import { useUser } from "@/hooks/authentication/useUser";

const { Text } = Typography;

const DepositResultPage = () => {
  const { loading, message, transactionStatus, txnRef, amount, responseCode, handleBackToDeposit, handleGoHome } =
    useDepositResult();
  const { refetch } = useUser();

  useEffect(() => {
    if (transactionStatus === "success") refetch();
  }, [transactionStatus, refetch]);

  const isSuccess = transactionStatus === "success";

  return (
    <LoadingDeposit isLoading={loading}>
      <DRFS.StyledContainer>
        <DRFS.StyledCard $status={transactionStatus}>
          <DRFS.StyledHeader $status={transactionStatus}>
            {isSuccess ? (
              <>
                <FaCheckCircle color="#52c41a" size={60} />
                <DRFS.StyledTitle level={2}>🎉 Nạp tiền thành công!</DRFS.StyledTitle>
              </>
            ) : (
              <>
                <FaTimesCircle color="#ff4d4f" size={60} />
                <DRFS.StyledTitle level={2}>❌ Nạp tiền thất bại</DRFS.StyledTitle>
              </>
            )}
          </DRFS.StyledHeader>

          {message && <DRFS.StyledMessage $status={transactionStatus}>{message}</DRFS.StyledMessage>}

          <Divider />

          <DRFS.StyledInfo>
            <Text strong>Mã giao dịch: </Text>
            <DRFS.StyledText>{txnRef || "N/A"}</DRFS.StyledText>
            <br />
            <Text strong>Số tiền: </Text>
            <DRFS.StyledText>
              {amount ? parseInt(amount / 100).toLocaleString("vi-VN") + " VND" : "N/A"}
            </DRFS.StyledText>
            <br />
            <Text strong>Trạng thái: </Text>
            <DRFS.StyledText $status={transactionStatus}>{isSuccess ? "Thành công ✅" : "Thất bại ❌"}</DRFS.StyledText>
            <br />
            {responseCode && (
              <>
                <Text strong>Mã phản hồi: </Text>
                <DRFS.StyledText>{responseCode}</DRFS.StyledText>
              </>
            )}
          </DRFS.StyledInfo>

          <DRFS.StyledButtonContainer>
            <Button type="primary" size="large" onClick={handleBackToDeposit}>
              Nạp thêm tiền
            </Button>
            <Button size="large" onClick={handleGoHome}>
              Về trang chủ
            </Button>
          </DRFS.StyledButtonContainer>
        </DRFS.StyledCard>
      </DRFS.StyledContainer>
    </LoadingDeposit>
  );
};

export default DepositResultPage;
