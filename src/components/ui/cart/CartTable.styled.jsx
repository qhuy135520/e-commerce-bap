import { Button, Card } from "antd";
import { InputNumber } from "formik-antd";
import styled from "styled-components";

export const CartWrapper = styled.div`
  padding: 16px;
  .ant-table-thead > tr > th {
    background-color: var(--color-grey-300);
    color: var(--color-grey-900);
    font-weight: bold;
    text-align: left;
  }

  .ant-table-tbody > tr > td {
    background-color: var(--color-grey-50);
    color: var(--color-grey-800);
  }

  .ant-table-tbody > tr:hover > td {
    background-color: var(--color-grey-200) !important;
  }

  .ant-table-tbody > tr.ant-table-row-selected > td {
    background-color: var(--color-grey-200) !important;
    color: var(--color-grey-900);
  }

  strong {
    font-size: 16px;
  }

  .quantity-input {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .quantity-input .ant-input-number {
    text-align: center;
  }
`;

export const CardCartTable = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  margin-top: 16px;
  overflow: hidden;

  .ant-card-head {
    background: var(--color-blue-4);
    color: #ffffff;
    font-size: 18px;
    font-weight: 600;
    padding: 12px 24px;
    border-bottom: none;
    text-align: center;
  }

  .ant-card-body {
    padding: 20px;
    background: var(--color-grey-100);
  }

  p {
    margin: 8px 0;
    font-size: 16px;
    color: var(--color-grey-800);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  p strong {
    color: var(--color-grey-800);
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

export const InputQuantity = styled(InputNumber)`
  width: 80px;
`;

export const ButtonWrapper = styled.div`
  text-align: right;
`;

export const ButtonCartSubmit = styled.button`
  /* display: none; */
`;

export const ButtonCart = styled(Button)`
  width: fit-content;
  margin-top: 16px;
  margin-left: 20px;
  padding: 10px;
  font-size: 16px;
  font-weight: 600;
  background: var(--color-blue-5);
  border: none;
  border-radius: 8px;
  color: #fff;
  height: 48px;

  &:hover {
    background: var(--color-blue-8);
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
