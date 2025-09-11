import { Button, Card } from "antd";
import { InputNumber } from "formik-antd";
import styled from "styled-components";

export const CartWrapper = styled.div`
  padding: 20px;
  background: var(--color-grey-50);

  .ant-table {
    border-radius: var(--border-radius-md);
    border: 1px solid var(--color-grey-200);
    overflow: hidden;
    color: var(--color-grey-800);
    background: var(--color-grey-0);
  }

  .ant-table-thead > tr > th {
    background-color: var(--color-grey-100);
    color: var(--color-grey-900);
    font-weight: 600;
    text-align: center;
    font-size: 14px;
    border-bottom: 1px solid var(--color-grey-200);
    padding: 12px;
  }

  .ant-table-tbody > tr > td {
    background-color: var(--color-grey-0);
    color: var(--color-grey-800);
    font-size: 14px;
    vertical-align: middle;
    padding: 14px;
  }

  .ant-table-tbody > tr:hover > td {
    background-color: var(--color-grey-100) !important;
  }

  /* Vendor row (Shop name) */
  .ant-table-row.vendor-row td {
    background-color: var(--color-blue-50);
    font-weight: 600;
    font-size: 15px;
    color: var(--color-blue-700);
  }
`;

export const CardCartTable = styled(Card)`
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-grey-200);
  margin-top: 20px;
  overflow: hidden;

  .ant-card-head {
    background: var(--color-grey-100);
    color: var(--color-grey-900);
    font-size: 16px;
    font-weight: 600;
    padding: 12px 20px;
    border-bottom: 1px solid var(--color-grey-200);
  }

  .ant-card-body {
    padding: 20px;
    background: var(--color-grey-0);
    color: var(--color-grey-800);
  }

  p {
    margin: 8px 0;
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    color: var(--color-grey-800);
  }

  p strong {
    font-weight: 600;
    color: var(--color-grey-900);
  }

  p:last-of-type {
    font-size: 17px;
    font-weight: bold;
    color: var(--color-red-700);
    border-top: 1px dashed var(--color-grey-300);
    padding-top: 10px;
    margin-top: 10px;
  }
`;

export const InputQuantity = styled(InputNumber)`
  width: 90px;
  border-radius: var(--border-radius-sm) !important;
  border: 1px solid var(--color-grey-300);
  background: var(--color-grey-0);
  display: flex;
  align-items: center;
  font-weight: 600;

  .ant-input-number-input-wrap {
    flex: 1;
  }

  .ant-input-number-input {
    text-align: center;
    color: var(--color-grey-900);
    background: var(--color-grey-0);
  }

  .ant-input-number-handler-wrap {
    width: 28px;
    border-left: 1px solid var(--color-grey-300);
    display: flex;
    flex-direction: column;

    .ant-input-number-handler {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: var(--color-grey-600);
      transition: all 0.2s ease;
    }

    .ant-input-number-handler-up {
      border-bottom: 1px solid var(--color-grey-300);
      background: var(--color-grey-100);
      border-top-right-radius: var(--border-radius-sm);

      &:hover {
        background: var(--color-blue-50);
        color: var(--color-blue-600);
      }
    }

    .ant-input-number-handler-down {
      background: var(--color-grey-100);
      border-bottom-right-radius: var(--border-radius-sm);

      &:hover {
        background: var(--color-red-50);
        color: var(--color-red-600);
      }
    }
  }

  &:hover {
    border-color: var(--color-blue-500);
  }

  &:focus-within {
    border-color: var(--color-blue-600);
    box-shadow: 0 0 0 2px var(--color-blue-100);
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const ButtonCart = styled(Button)`
  min-width: 150px;
  padding: 12px 22px;
  font-size: 15px;
  font-weight: 600;
  border-radius: var(--border-radius-md);
  height: 46px;
  border: none;
  transition: all 0.25s ease;
  box-shadow: var(--shadow-sm);

  &.reset-btn {
    background: var(--color-grey-0);
    color: var(--color-blue-600);
    border: 1px solid var(--color-blue-500);

    &:hover {
      background: var(--color-blue-50);
      color: var(--color-blue-700);
      border-color: var(--color-blue-600);
    }
  }

  &.buy-btn {
    background: var(--color-red-600);
    color: var(--color-grey-0);
    font-weight: 700;
    box-shadow: 0 4px 12px var(--shadow-red);

    &:hover {
      background: var(--color-red-700);
      transform: translateY(-2px);
      box-shadow: 0 6px 16px var(--shadow-red-strong);
    }
  }

  &:disabled {
    background: var(--color-grey-300) !important;
    color: var(--color-grey-600) !important;
    border: none;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;
