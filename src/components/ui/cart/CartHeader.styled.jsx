import { Badge, Breadcrumb, Button, Flex } from "antd";
import styled from "styled-components";

import Title from "antd/es/skeleton/Title";

export const FlexCartHeader = styled(Flex)`
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

export const HeadingCart = styled(Title)``;

export const CartIconWrapper = styled.div`
  color: var(--color-brand-600);
  font-size: 28px;
`;

export const CartBadge = styled(Badge)`
  .ant-badge-count {
    background-color: var(--color-red-700);
    margin-left: 8px;
  }
`;

export const CartBreadcrumb = styled(Breadcrumb)`
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
