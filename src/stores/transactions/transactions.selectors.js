<<<<<<< HEAD
import { createSelector } from "@reduxjs/toolkit";

export const selectTransactionsStatus = (state) => state.transactions.status;
export const selectTransactionsError = (state) => state.transactions.error;
export const selectTransactions = (state) => state.transactions.data;

export const selectTransactionById = createSelector([selectTransactions, (_, userId) => userId], (data, userId) => {
  return data.filter((transaction) => transaction.user_id === userId);
});
=======
export const selectTransactionsStatus = (state) => state.transactions.status;
export const selectTransactionsError = (state) => state.transactions.error;
export const selectTransactions = (state) => state.transactions.data;
>>>>>>> d3490f9 (2025-10-09-feat: deposit history)
