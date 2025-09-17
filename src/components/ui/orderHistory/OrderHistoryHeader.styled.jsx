import { Flex, Breadcrumb, Button } from "antd";
import styled from "styled-components";

export const FlexOrderHeader = styled(Flex)`
  padding: 20px 0;
  border-bottom: 1px solid var(--color-grey-200);
  margin-bottom: 20px;

  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;

export const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const HistoryIconWrapper = styled.div`
  color: var(--color-brand-600);
  font-size: 28px;
`;

export const OrderBreadcrumb = styled(Breadcrumb)`
  margin-top: 4px;
  font-size: 13px;
  color: var(--color-grey-500);
`;

export const BackButton = styled(Button)`
  border-radius: 6px;
  border-color: var(--color-grey-300);
  color: var(--color-grey-700);

  &:hover {
    color: var(--color-grey-900);
    border-color: var(--color-grey-400);
  }
`;
