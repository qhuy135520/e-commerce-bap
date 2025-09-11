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
  text-align: left;
  background-color: #e5e7eb;
  color: #333;
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
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
`;

export const Summary = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #555;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const Summaries = styled.div`
  display: flex;
  gap: 16px;
`;

export const SearchWrapper = styled.div`
  width: 300px;
  display: flex;
`;
export const StatusButton = styled.button`
  padding: 6px 12px;
  border: none;
  text-transform: capitalize;
  width: 100px;
  border-radius: 4px;
  cursor: pointer;
  background: ${(props) => (props.$active ? "#4096ff" : "#69b1ff")};
  color: white;

  &:hover {
    opacity: 0.9;
  }
`;
