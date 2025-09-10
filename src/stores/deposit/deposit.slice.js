import { createSlice } from "@reduxjs/toolkit";
import { deposit, processDepositResult } from "@/stores/deposit/deposit.thunk";

const paymentSlice = createSlice({
  name: "deposit",
  initialState: {
    loading: false,
    errorMsg: null,
    resultLoading: false,
    resultMessage: "",
    transactionStatus: "",
    txnRef: null,
    amount: null,
    responseCode: null,
  },
  reducers: {
    clearError: (state) => {
      state.errorMsg = null;
    },
    resetDepositResult: (state) => {
      state.resultLoading = false;
      state.resultMessage = "";
      state.transactionStatus = "";
      state.txnRef = null;
      state.amount = null;
      state.responseCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Deposit cases
      .addCase(deposit.pending, (state) => {
        state.loading = true;
        state.errorMsg = null;
      })
      .addCase(deposit.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.paymentUrl) {
          window.location.href = action.payload.paymentUrl;
        } else {
          state.errorMsg = action.payload.error || "Khởi tạo thanh toán thất bại";
        }
      })
      .addCase(deposit.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg = `Khởi tạo thanh toán thất bại: ${action.payload}`;
      })
      // Deposit Result cases
      .addCase(processDepositResult.pending, (state, action) => {
        state.resultLoading = true;
        state.resultMessage = "";
        state.transactionStatus = "";
        state.txnRef = action.meta.arg.txnRef;
        state.amount = action.meta.arg.amount;
        state.responseCode = action.meta.arg.responseCode;
      })
      .addCase(processDepositResult.fulfilled, (state, action) => {
        state.resultLoading = false;
        state.resultMessage = action.payload.message;
        state.transactionStatus = action.payload.transactionStatus;
      })
      .addCase(processDepositResult.rejected, (state, action) => {
        state.resultLoading = false;
        state.resultMessage = action.payload || "Có lỗi xảy ra khi xử lý giao dịch";
        state.transactionStatus = "error";
      });
  },
});

export const { clearError, resetDepositResult } = paymentSlice.actions;
export default paymentSlice.reducer;
