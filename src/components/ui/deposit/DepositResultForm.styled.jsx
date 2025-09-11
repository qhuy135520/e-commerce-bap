import styled from "styled-components";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

export const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(to right, #e0f7fa, #e0f2f1);
`;

export const StyledCard = styled(Card)`
  width: 600px;
  text-align: center;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  background: #ffffff;
  .ant-card-body {
    padding: 0;
  }
`;

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const StyledTitle = styled(Title)`
  color: ${({ $status }) => ($status === "success" ? "#52c41a" : "#ff4d4f")};
  margin: 0 !important;
`;

export const StyledMessage = styled.div`
  margin: 20px 0;
  color: ${({ $status }) => ($status === "success" ? "#52c41a" : "#ff4d4f")};
  font-weight: 500;
`;

export const StyledInfo = styled.div`
  text-align: left;
  margin-bottom: 30px;
  font-size: 16px;
`;

export const StyledText = styled(Text)`
  display: inline-block;
  color: ${({ $status }) => ($status === "success" ? "#52c41a" : "#ff4d4f")};
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;
