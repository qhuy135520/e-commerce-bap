import styled from "styled-components";
import { Select } from "antd";

export const Container = styled.div`
  padding: 32px 0;
`;

export const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SelectSort = styled(Select)`
  width: 200px;
  margin-bottom: 16px;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
`;

export const RandomProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-top: 24px;
`;

export const ProductItem = styled.div`
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  margin-bottom: 8px;
`;
