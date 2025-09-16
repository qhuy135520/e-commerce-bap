import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

export const TableContainer = styled.div`
  max-height: 700px;
  overflow-y: auto;
  margin-bottom: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

export const Tr = styled.tr`
  height: 50px;
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  &:hover {
    background-color: #f1f1f1;
  }
`;

export const Th = styled.th`
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
  background-color: #e5e7eb;
  color: #333;
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:nth-child(1) {
    width: 50px;
  }
  &:nth-child(2) {
    width: 200px;
  }
  &:nth-child(3) {
    width: 200px;
  }
  &:nth-child(4) {
    width: 120px;
  }
  &:nth-child(5) {
    width: 100px;
  }
  &:nth-child(6) {
    width: 100px;
  }
  &:nth-child(7) {
    width: 150px;
  }
`;

export const Td = styled.td`
  border: 1px solid #ddd;
  padding: 12px;
  color: #333;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:nth-child(1) {
    width: 50px;
  }
  &:nth-child(2) {
    width: 200px;
  }
  &:nth-child(3) {
    width: 200px;
  }
  &:nth-child(4) {
    width: 120px;
  }
  &:nth-child(5) {
    width: 100px;
  }
  &:nth-child(6) {
    width: 100px;
  }
  &:nth-child(7) {
    width: 150px;
  }
`;

export const Summary = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #555;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
`;

export const SearchWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
`;

export const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
`;

export const FilterSearch = styled.div`
  display: flex;
  gap: 16px;
`;

export const Summaries = styled.div`
  display: flex;
  gap: 16px;
`;
