import styled from "styled-components";
import { Card, Typography } from "antd";

const { Text } = Typography;

export const StyledCard = styled(Card)`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const ProductImage = styled.img`
  height: 200px;
  object-fit: cover;
  width: 100%;
`;

export const ProductPrice = styled(Text)`
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const ProductDescription = styled(Text)`
  display: block;
`;
