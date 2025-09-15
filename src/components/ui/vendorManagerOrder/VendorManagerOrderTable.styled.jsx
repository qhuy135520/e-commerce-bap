import { Button } from "antd";
import styled from "styled-components";

const statusColors = {
  pending: "orange",
  shipped: "blue",
  canceled: "red",
  completed: "green",
  paid: "gray",
};

export const ButtonFilterGroup = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1rem;
`;

export const ButtonFilter = styled(Button)`
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
`;

export const ButtonGroupStatus = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
`;

export const ButtonStatus = styled(Button)`
  background-color: ${(props) =>
    props.$status === "pending"
      ? statusColors.pending
      : props.$status === "shipped"
      ? statusColors.shipped
      : props.$status === "canceled"
      ? statusColors.canceled
      : props.$status === "completed"
      ? statusColors.completed
      : statusColors.paid};
  width: 10rem;
`;
