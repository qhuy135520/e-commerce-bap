import { Input, Pagination, Select } from "antd";

import { AdminPaymentHistoryStyled as APHS, Loading } from "@/components";

import { useTransactions } from "@/hooks/transactions/useTransactions";
import { formatCurrency } from "@/utils/helpers";

const { Search } = Input;
const { Option } = Select;

export default function AdminPaymentHistory() {
  const {
    transactions,
    totalTransactions,
    totalAmount,
    status,
    error,
    currentPage,
    itemsPerPage,
    searchTerm,
    statusFilter,
    handlePageChange,
    handleSearch,
    handleStatusFilter,
  } = useTransactions({ itemsPerPage: 20 });

  return (
    <Loading isLoading={status === "loading"} error={error}>
      <APHS.Container>
        <APHS.Title>Lịch sử giao dịch</APHS.Title>
        <APHS.HeaderContainer>
          <APHS.Summaries>
            <APHS.Summary>Tổng số giao dịch: {totalTransactions}</APHS.Summary>
            <APHS.Summary>Tổng số tiền: {totalAmount}</APHS.Summary>
          </APHS.Summaries>
          <APHS.SearchWrapper>
            <Search
              placeholder="Tìm theo ID hoặc Tên"
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              value={searchTerm}
              allowClear
              style={{ marginRight: "16px" }}
            />
            <Select
              value={statusFilter}
              onChange={handleStatusFilter}
              style={{ width: 150 }}
              placeholder="Lọc theo trạng thái"
            >
              <Option value="all">Tất cả</Option>
              <Option value="success">Thành công</Option>
              <Option value="failed">Thất bại</Option>
            </Select>
          </APHS.SearchWrapper>
        </APHS.HeaderContainer>
        <APHS.TableContainer>
          <APHS.Table>
            <thead>
              <APHS.Tr>
                <APHS.Th>#</APHS.Th>
                <APHS.Th>ID</APHS.Th>
                <APHS.Th>Họ Tên</APHS.Th>
                <APHS.Th>Số Tiền</APHS.Th>
                <APHS.Th>Trạng Thái</APHS.Th>
                <APHS.Th>Kiểu</APHS.Th>
                <APHS.Th>Thời Gian</APHS.Th>
              </APHS.Tr>
            </thead>
            <tbody>
              {transactions.map((item, index) => (
                <APHS.Tr key={item.id}>
                  <APHS.Td>{(currentPage - 1) * itemsPerPage + index + 1}</APHS.Td>
                  <APHS.Td>{item.txn_ref}</APHS.Td>
                  <APHS.Td>{item.userInfo?.name}</APHS.Td>
                  <APHS.Td>{formatCurrency(item.amount)}</APHS.Td>
                  <APHS.Td>{item.status}</APHS.Td>
                  <APHS.Td>{item.type}</APHS.Td>
                  <APHS.Td>{new Date(item.created_at).toLocaleString("vi-VN")}</APHS.Td>
                </APHS.Tr>
              ))}
              {Array.from({ length: itemsPerPage - transactions.length }).map((_, index) => (
                <APHS.Tr key={`empty-${index}`}>
                  <APHS.Td colSpan={7}>&nbsp;</APHS.Td>
                </APHS.Tr>
              ))}
            </tbody>
          </APHS.Table>
        </APHS.TableContainer>
        <Pagination
          align="center"
          current={currentPage}
          total={totalTransactions}
          pageSize={itemsPerPage}
          showSizeChanger={false}
          onChange={handlePageChange}
        />
      </APHS.Container>
    </Loading>
  );
}
