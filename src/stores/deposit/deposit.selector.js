export const selectPaymentLoading = (state) => state.payment.loading;
export const selectPaymentError = (state) => state.payment.errorMsg;
export const selectDepositResultLoading = (state) => state.payment.resultLoading;
export const selectDepositResultMessage = (state) => state.payment.resultMessage;
export const selectDepositResultStatus = (state) => state.payment.transactionStatus;
export const selectDepositResultTxnRef = (state) => state.payment.txnRef;
export const selectDepositResultAmount = (state) => state.payment.amount;
export const selectDepositResultResponseCode = (state) => state.payment.responseCode;
