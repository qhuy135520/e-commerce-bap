import styled from "styled-components";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

export const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
`;

export const StyledCard = styled(Card)`
  width: 500px;
  text-align: center;
  .ant-card-body {
    padding: 24px;
  }
`;

export const StyledTitle = styled(Title)`
  color: ${({ $transactionStatus }) => ($transactionStatus === "success" ? "#52c41a" : "#ff4d4f")};
`;

export const StyledTextContainer = styled.div`
  text-align: left;
  margin-bottom: 20px;
`;

export const StyledText = styled(Text)`
  display: inline-block;
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;
