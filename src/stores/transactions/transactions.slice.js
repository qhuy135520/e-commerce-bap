import { createSlice } from "@reduxjs/toolkit";
import { fetchAllTransactions } from "@/stores/transactions/transactions.thunks";

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: { data: [], status: "idle", error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTransactions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.slice().reverse();
      })
      .addCase(fetchAllTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default transactionsSlice.reducer;
