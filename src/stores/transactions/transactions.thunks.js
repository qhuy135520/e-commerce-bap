import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTransactionsApi } from "@/services/apiTransactions";

export const fetchAllTransactions = createAsyncThunk("transactions/fetchAll", async () => {
  try {
    const data = await getTransactionsApi();
    return data;
  } catch (error) {
    throw error;
  }
});
