import { Button, Card } from "antd";
import styled from "styled-components";

export const CartWrapper = styled.div`
  padding: 16px;
`;

export const CardCartTable = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: linear-gradient(145deg, #ffffff, #f9f9f9);
  max-width: 100%;
  margin-top: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }

  .ant-card-head {
    background: linear-gradient(to right, #1890ff, #40c4ff);
    color: #ffffff;
    font-size: 18px;
    font-weight: 600;
    padding: 12px 24px;
    border-bottom: none;
    text-align: center;
  }

  .ant-card-body {
    padding: 20px;
    background: #ffffff;
  }

  p {
    margin: 8px 0;
    font-size: 16px;
    color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  p strong {
    color: #555;
    font-weight: 600;
  }

  p:last-of-type {
    font-size: 18px;
    font-weight: bold;
    color: #1890ff;
    border-top: 1px solid #e8e8e8;
    padding-top: 12px;
    margin-top: 12px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    margin: 16px auto;

    .ant-card-head {
      font-size: 16px;
      padding: 10px 16px;
    }

    .ant-card-body {
      padding: 16px;
    }
  }
`;

export const BuyButton = styled(Button)`
  width: fit-content;
  margin-top: 16px;
  padding: 10px;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(to right, #1890ff, #40c4ff);
  border: none;
  border-radius: 8px;
  color: #ffffff;
  height: 48px;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #40c4ff, #1890ff);
    transform: scale(1.02);
  }

  &:disabled {
    background: #d9d9d9;
    color: #999;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    height: 40px;
  }
`;
