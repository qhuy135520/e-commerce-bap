import { Avatar, List, Typography } from "antd";
import styled from "styled-components";

const { Text } = Typography;

export const ListItem = styled(List.Item)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: var(--color-grey-200);
  }
`;

export const HeaderListItem = styled(ListItem)`
  font-weight: bold;
  border-bottom: 1px solid #eee;
  background: var(--color-grey-100);
`;

export const ProductName = styled.div`
  flex: 1;
`;

export const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const ProductAvatar = styled(Avatar)`
  margin-right: 8px;
`;

export const QuantityText = styled(Text)`
  width: 60px;
  text-align: right;
`;

export const PriceText = styled(Text)`
  width: 90px;
  text-align: right;
`;
