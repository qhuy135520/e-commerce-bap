import React, { useEffect } from "react";
import { Typography, Alert, Button } from "antd";
import { useDepositResult } from "@/hooks/deposit/useDepositResult";
import { DepositResultFormStyled as DRFS } from "@/components";
import LoadingDeposit from "@/components/common/LoadingDeposit";
import { useUser } from "@/hooks/authentication/useUser";

const { Text } = Typography;

const DepositResultPage = () => {
  const { loading, message, transactionStatus, txnRef, amount, responseCode, handleBackToDeposit, handleGoHome } =
    useDepositResult();
  const { refetch } = useUser();

  useEffect(() => {
    if (transactionStatus === "success") {
      refetch();
    }
  }, [transactionStatus, refetch]);

  return (
    <LoadingDeposit isLoading={loading}>
      <DRFS.StyledContainer>
        <DRFS.StyledCard>
          <DRFS.StyledTitle level={2} $transactionStatus={transactionStatus}>
            {transactionStatus === "success" ? "🎉 Thành Công" : "❌ Thất Bại"}
          </DRFS.StyledTitle>

          {message && <Alert type={transactionStatus === "success" ? "success" : "error"} message={message} />}

          <DRFS.StyledTextContainer>
            <Text strong>Mã giao dịch: </Text>
            <DRFS.StyledText>{txnRef || "N/A"}</DRFS.StyledText>
            <br />
            <Text strong>Số tiền: </Text>
            <DRFS.StyledText>{amount ? (parseInt(amount) / 100).toLocaleString("vi-VN") : "N/A"} VND</DRFS.StyledText>
            <br />
            <Text strong>Trạng thái: </Text>
            <DRFS.StyledText type={transactionStatus === "success" ? "success" : "danger"}>
              {transactionStatus === "success" ? "Thành công ✅" : "Thất bại ❌"}
            </DRFS.StyledText>
            <br />
            {responseCode && (
              <>
                <Text strong>Mã phản hồi: </Text>
                <DRFS.StyledText>{responseCode}</DRFS.StyledText>
              </>
            )}
          </DRFS.StyledTextContainer>

          <DRFS.StyledButtonContainer>
            <Button type="primary" onClick={handleBackToDeposit}>
              Nạp thêm tiền
            </Button>
            <Button onClick={handleGoHome}>Về trang chủ</Button>
          </DRFS.StyledButtonContainer>
        </DRFS.StyledCard>
      </DRFS.StyledContainer>
    </LoadingDeposit>
  );
};

export default DepositResultPage;
