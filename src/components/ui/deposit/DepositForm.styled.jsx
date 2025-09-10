import styled from "styled-components";
import { Card, Typography, InputNumber } from "antd";

const { Title, Text } = Typography;

export const StyledContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
  padding: 20px;
`;

export const StyledCard = styled(Card)`
  width: 400px;
  border-radius: 16px;
  padding: 30px;
  .ant-card-body {
    padding: 0;
  }
`;

export const StyledTitle = styled(Title)`
  text-align: center;
  margin-bottom: 30px;
`;

export const StyledText = styled(Text)`
  display: block;
  text-align: center;
  margin-top: 16px;
`;

export const StyledAlert = styled(Text)`
  margin-bottom: 20px;
`;

export const StyledInputNumber = styled(InputNumber)`
  width: 100%;
`;
