import { Input, Pagination } from "antd";
import { AdminPaymentHistoryStyled as APHS, Loading } from "@/components";
import { useTransactions } from "@/hooks/transactions/useTransactions";

const { Search } = Input;

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
    handlePageChange,
    handleSearch,
  } = useTransactions({ itemsPerPage: 20 });

  return (
    <Loading isLoading={status === "loading"} error={error}>
      <APHS.Container>
        <APHS.Title>Transaction History</APHS.Title>
        <APHS.HeaderContainer>
          <APHS.Summaries>
            <APHS.Summary>Total Transactions: {totalTransactions}</APHS.Summary>
            <APHS.Summary>Total Amount: {totalAmount}</APHS.Summary>
          </APHS.Summaries>
          <APHS.SearchWrapper>
            <Search
              placeholder="Search by Transaction ID or Name"
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              value={searchTerm}
              allowClear
            />
          </APHS.SearchWrapper>
        </APHS.HeaderContainer>
        <APHS.TableContainer>
          <APHS.Table>
            <thead>
              <APHS.Tr>
                <APHS.Th>#</APHS.Th>
                <APHS.Th>Transaction ID</APHS.Th>
                <APHS.Th>Name</APHS.Th>
                <APHS.Th>Amount</APHS.Th>
                <APHS.Th>Status</APHS.Th>
                <APHS.Th>Type</APHS.Th>
                <APHS.Th>Created At</APHS.Th>
              </APHS.Tr>
            </thead>
            <tbody>
              {transactions.map((item, index) => (
                <APHS.Tr key={item.id}>
                  <APHS.Td>{(currentPage - 1) * itemsPerPage + index + 1}</APHS.Td>
                  <APHS.Td>{item.txn_ref}</APHS.Td>
                  <APHS.Td>{item.userInfo?.name}</APHS.Td>
                  <APHS.Td>{item.amount}</APHS.Td>
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
