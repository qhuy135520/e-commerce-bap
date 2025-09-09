import { Button, Input } from "antd";
import styled from "styled-components";

export const OrderWrapper = styled.div`
  margin: 1.2rem 0;
  padding: 1.2rem 2.4rem;
  background-color: var(--color-grey-50);
  border-radius: 1rem;
`;

export const OrderTitleHeader = styled.div`
  width: 100%;
  padding: 1.2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const OrderVendor = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

export const StatusOrder = styled.div`
  color: red;
  font-weight: 600;
`;

export const OrderContent = styled.div`
  padding: 1.2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const Image = styled.img`
  width: 8rem;
  height: 8rem;
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ItemInfo = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
  justify-content: space-between;
`;

export const Price = styled.span`
  font-size: 1.6rem;
  color: red;
  font-weight: 600;
`;

export const ActionButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 1rem;
  margin-right: auto;

  & p {
    margin: 1rem 0;
  }
`;

export const VendorName = styled.div`
  font-weight: 700;
`;

export const PriceTotal = styled.span`
  font-size: 2rem;
  color: red;
  font-weight: 600;
  align-self: center;
`;

export const ItemLeft = styled.div`
  display: flex;
  gap: 2rem;
`;

export const VendorWrapper = styled.div`
  margin-top: 1rem;
`;

export const ProductRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
`;

export const TextArea = styled(Input.TextArea)`
  margin-top: 1rem;
`;

export const SubmitButton = styled(Button)`
  margin-top: 1rem;
  width: 100%;
`;
