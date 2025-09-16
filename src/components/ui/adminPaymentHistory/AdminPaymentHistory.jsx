import { Input, Pagination, Select, InputNumber } from "antd";
import { AdminPaymentHistoryStyled as APHS, Loading } from "@/components";
import { useTransactions } from "@/hooks/transactions/useTransactions";
import { formatCurrency } from "@/utils/helpers";
import { FaCrown } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const { Search } = Input;
const { Option } = Select;

export default function AdminPaymentHistory() {
  const { t } = useTranslation(["admin"]);
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
    minAmount,
    maxAmount,
    userDepositTotals,
    handlePageChange,
    handleSearch,
    handleStatusFilter,
    handleMinAmount,
    handleMaxAmount,
  } = useTransactions({ itemsPerPage: 20 });

  return (
    <Loading isLoading={status === "loading"} error={error}>
      <APHS.Container>
        <APHS.Title>{t("payment.title")}</APHS.Title>
        <APHS.HeaderContainer>
          <APHS.Summaries>
            <APHS.Summary>
              {t("payment.totalTransactions")}: {totalTransactions}
            </APHS.Summary>
            <APHS.Summary>
              {" "}
              {t("payment.totalAmount")}: {totalAmount}
            </APHS.Summary>
          </APHS.Summaries>

          <APHS.FilterRow>
            <APHS.FilterSearch>
              <APHS.SearchWrapper>
                <Search
                  placeholder={t("payment.searchPlaceholder")}
                  onSearch={handleSearch}
                  onChange={(e) => handleSearch(e.target.value)}
                  value={searchTerm}
                  allowClear
                  style={{ flex: 1 }}
                />
              </APHS.SearchWrapper>
              <Select
                value={statusFilter}
                onChange={handleStatusFilter}
                style={{ width: 150 }}
                placeholder={t("payment.statusFilter")}
              >
                <Option value="all">{t("payment.all")}</Option>
                <Option value="success">{t("payment.success")}</Option>
                <Option value="failed">{t("payment.failed")}</Option>
              </Select>
            </APHS.FilterSearch>

            <div>
              <span>{t("payment.enterAmount")}: </span>
              <InputNumber
                placeholder={t("payment.minPlaceholder")}
                value={minAmount}
                onChange={handleMinAmount}
                style={{ width: 120 }}
                min={0}
              />
              --
              <InputNumber
                placeholder={t("payment.maxPlaceholder")}
                value={maxAmount}
                onChange={handleMaxAmount}
                style={{ width: 120 }}
                min={0}
              />
            </div>
          </APHS.FilterRow>
        </APHS.HeaderContainer>

        <APHS.TableContainer>
          <APHS.Table>
            <thead>
              <APHS.Tr>
                <APHS.Th>{t("payment.table.index")}</APHS.Th>
                <APHS.Th>{t("payment.table.id")}</APHS.Th>
                <APHS.Th>{t("payment.table.name")}</APHS.Th>
                <APHS.Th>{t("payment.table.amount")}</APHS.Th>
                <APHS.Th>{t("payment.table.status")}</APHS.Th>
                <APHS.Th>{t("payment.table.type")}</APHS.Th>
                <APHS.Th>{t("payment.table.time")}</APHS.Th>
              </APHS.Tr>
            </thead>
            <tbody>
              {transactions.map((item, index) => {
                const userId = item.userInfo?.userId;
                const totalDeposit = userDepositTotals[userId] || 0;
                const isVIP = totalDeposit >= 100000000;

                return (
                  <APHS.Tr key={item.id}>
                    <APHS.Td>{(currentPage - 1) * itemsPerPage + index + 1}</APHS.Td>
                    <APHS.Td>{item.txn_ref}</APHS.Td>
                    <APHS.Td>
                      {item.userInfo?.name}{" "}
                      {isVIP && (
                        <span style={{ color: "#91caff" }}>
                          <FaCrown />
                        </span>
                      )}
                    </APHS.Td>
                    <APHS.Td>{formatCurrency(item.amount)}</APHS.Td>
                    <APHS.Td>{item.status}</APHS.Td>
                    <APHS.Td>{item.type}</APHS.Td>
                    <APHS.Td>{new Date(item.created_at).toLocaleString("vi-VN")}</APHS.Td>
                  </APHS.Tr>
                );
              })}
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
