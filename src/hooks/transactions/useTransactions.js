import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { transactionsThunk } from "@/stores/rootThunk";
import { transactionsSelector } from "@/stores/rootSelector";
import { formatCurrency } from "@/utils/helpers";

export const useTransactions = ({ itemsPerPage = 20 } = {}) => {
  const dispatch = useDispatch();
  const transactions = useSelector(transactionsSelector.selectTransactions);
  const status = useSelector(transactionsSelector.selectTransactionsStatus);
  const error = useSelector(transactionsSelector.selectTransactionsError);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(transactionsThunk.fetchAllTransactions());
    }
  }, [status, dispatch]);

  const userDepositTotals = useMemo(() => {
    const totals = {};

    transactions.forEach((item) => {
      if (item.status === "success" && item.type === "deposit") {
        const userId = item.userInfo?.userId;

        if (userId) {
          totals[userId] = (totals[userId] || 0) + Number(item.amount || 0);
        }
      }
    });
    return totals;
  }, [transactions]);

  const filteredTransactions = transactions.filter((item) => {
    const matchesSearch =
      item.txn_ref?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.userInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || item.status === statusFilter;

    const amount = Number(item.amount || 0);
    const matchesAmount = (minAmount === null || amount >= minAmount) && (maxAmount === null || amount <= maxAmount);

    return matchesSearch && matchesStatus && matchesAmount;
  });

  const totalTransactions = filteredTransactions.length;

  const totalAmount = filteredTransactions
    .filter((item) => item.status === "success")
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredTransactions.slice(startIndex, endIndex);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleMinAmount = (value) => {
    setMinAmount(value);
    setCurrentPage(1);
  };

  const handleMaxAmount = (value) => {
    setMaxAmount(value);
    setCurrentPage(1);
  };

  return {
    transactions: currentData,
    totalTransactions,
    totalAmount: formatCurrency(totalAmount),
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
  };
};
