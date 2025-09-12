import styled from "styled-components";
import { Input, Button } from "antd";

/**
 * OrderHistoryTable.styled.js
 * Exports used by OrderHistoryTable component via `OrderHistoryTableStyled as OHTS`
 */

/* Card wrapper */
export const OrderWrapper = styled.div`
  margin: 1.6rem 0;
  padding: 1.6rem 2.4rem;
  background: var(--color-white, #fff);
  border: 1px solid var(--color-grey-200);
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.18s ease, transform 0.12s ease;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 0.75rem;
  }
`;

/* Header: status + date (space-between) */
export const OrderTitleHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  & > span,
  & > p {
    margin: 0;
  }
`;

/* Thin divider replacing <hr/> */
export const DividerLine = styled.div`
  height: 1px;
  background: var(--color-grey-200);
  margin: 1.2rem 0;
  width: 100%;
`;

/* Vendor block (you said you'll refactor OrderVendor later; keep container styles) */
export const OrderVendor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.4rem;
`;

/* Old StatusOrder kept if needed elsewhere */
export const StatusOrder = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  color: ${({ $status }) => ($status === "completed" ? "var(--color-green-600)" : "var(--color-orange-600)")};
`;

/* Order content area (rows of products, each vendor group, etc.) */
export const OrderContent = styled.div`
  padding: 0.6rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

/* Product image */
export const Image = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 0.6rem;
  object-fit: cover;

  @media (max-width: 480px) {
    width: 6.4rem;
    height: 6.4rem;
  }
`;

/* Generic info containers */
export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ItemInfo = styled.div`
  width: 100%;
  display: flex;
  gap: 1.6rem;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

/* Price label for each item */
export const Price = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-600);
  font-weight: 700;
`;

/* Action row: total price + button */
export const ActionButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;

  .price {
    font-size: 1.4rem;
    color: var(--color-grey-700);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: stretch;

    .price {
      width: 100%;
      margin-bottom: 0.5rem;
    }

    .ant-btn {
      width: 100%;
    }
  }
`;

/* Vendor name block */
export const VendorName = styled.div`
  font-weight: 700;
`;

/* Total price highlight */
export const PriceTotal = styled.span`
  font-size: 1.8rem;
  color: var(--color-red-600);
  font-weight: 800;
`;

/* Left side grouping for product row */
export const ItemLeft = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;

/* Wrapper for each vendor group */
export const VendorWrapper = styled.div`
  margin-top: 0.6rem;
`;

/* One product row inside vendor */
export const ProductRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.6rem 0;

  &:not(:last-child) {
    border-bottom: 1px dashed var(--color-grey-100);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.6rem;
  }
`;

/* Text area and submit button styling (if used in order notes) */
export const TextArea = styled(Input.TextArea)`
  margin-top: 1rem;
  border-radius: 8px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 1rem;
  width: 100%;
`;

/* small helpers */
export const SmallMuted = styled.span`
  font-size: 1.2rem;
  color: var(--color-grey-500);
`;

export const VendorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
`;
