import styled, { keyframes } from "styled-components";
import { Card, Typography, InputNumber } from "antd";

const { Title, Text } = Typography;

const floatMoney = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-300px) rotate(180deg); }
  100% { transform: translateY(0) rotate(360deg); }
`;

export const StyledContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 80px 20px;
  background: linear-gradient(135deg, #e6f0ff, #f0f7ff);
  position: relative;
  overflow: hidden;
`;

export const CircleDecor = styled.div`
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
  background: ${(props) => props.color || "#2575fc"};
  width: ${(props) => props.size || "300px"};
  height: ${(props) => props.size || "300px"};
  top: ${(props) => props.top || "0"};
  left: ${(props) => props.left || "0"};
  bottom: ${(props) => props.bottom || "auto"};
  right: ${(props) => props.right || "auto"};
`;

export const StyledCard = styled(Card)`
  width: 100%;
  max-width: 900px;
  border-radius: 24px;
  padding: 40px;
  background: #ffffffcc;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  z-index: 1;
  position: relative;
`;

export const StyledTitle = styled(Title)`
  text-align: center;
  margin-bottom: 20px;
  color: #2575fc;
`;

export const StyledText = styled(Text)`
  display: block;
  text-align: center;
  margin-top: 16px;
  color: #555;
`;

export const StyledAlert = styled(Text)`
  display: block;
  margin-bottom: 20px;
  color: #ff4d4f;
`;

export const StyledInputNumber = styled(InputNumber)`
  width: 100%;
  font-size: 18px;
  border-radius: 12px;
  padding: 10px;
  &:hover {
    border-color: #2575fc;
  }
  &:focus {
    border-color: #2575fc;
    box-shadow: 0 0 5px rgba(37, 117, 252, 0.5);
  }
`;

export const MoneyIcon = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background: url("/images/money-icon.png") no-repeat center;
  background-size: contain;
  animation: ${floatMoney} ${(props) => props.duration || "10s"} linear infinite;
`;

export const Banner = styled.div`
  width: 100%;
  margin: 20px 0;
  padding: 20px;
  background: linear-gradient(90deg, #2575fc, #6a11cb);
  color: white;
  border-radius: 16px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
`;
