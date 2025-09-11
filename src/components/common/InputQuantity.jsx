import React from "react";
import styled from "styled-components";
import { useFormikContext } from "formik";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 140px;
  height: 40px;
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-300);

  button {
    width: 36px;
    height: 100%;
    border: none;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .decrease {
    background: var(--color-red-50);
    color: var(--color-red-700);
  }

  .decrease:hover:not(:disabled) {
    background: var(--color-red-100);
    color: var(--color-red-800);
  }

  .increase {
    background: var(--color-blue-50);
    color: var(--color-blue-700);
  }

  .increase:hover:not(:disabled) {
    background: var(--color-blue-100);
    color: var(--color-blue-800);
  }

  .value {
    flex: 1;
    text-align: center;
    font-weight: 600;
    font-size: 14px;
    color: var(--color-grey-900);
    user-select: none;
  }
`;
export default function InputQuantity({ name, min = 1, max = 100 }) {
  const { values, setFieldValue } = useFormikContext();
  const value = values[name] || min;

  const handleIncrease = () => {
    if (value < max) setFieldValue(name, value + 1);
  };

  const handleDecrease = () => {
    if (value > min) setFieldValue(name, value - 1);
  };

  return (
    <Wrapper>
      <button type="button" className="decrease" onClick={handleDecrease} disabled={value <= min}>
        -
      </button>
      <div className="value">{value}</div>
      <button type="button" className="increase" onClick={handleIncrease} disabled={value >= max}>
        +
      </button>
    </Wrapper>
  );
}
