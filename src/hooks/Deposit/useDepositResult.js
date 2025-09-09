import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { processDepositResult } from "@/stores/deposit/deposit.thunk";
import { resetDepositResult } from "@/stores/deposit/deposit.slice";

export function useDepositResult() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const responseCode = query.get("vnp_ResponseCode");
  const txnRef = query.get("vnp_TxnRef");
  const amount = query.get("vnp_Amount");

  const {
    resultLoading: loading,
    resultMessage: message,
    transactionStatus,
    txnRef: storedTxnRef,
    amount: storedAmount,
    responseCode: storedResponseCode,
  } = useSelector((state) => state.deposit);

  useEffect(() => {
    dispatch(processDepositResult({ responseCode, txnRef, amount }));
    return () => dispatch(resetDepositResult());
  }, [dispatch, responseCode, txnRef, amount]);

  const handleBackToDeposit = () => navigate("/deposit");
  const handleGoHome = () => navigate("/");

  return {
    loading,
    message,
    transactionStatus,
    txnRef: storedTxnRef,
    amount: storedAmount,
    responseCode: storedResponseCode,
    handleBackToDeposit,
    handleGoHome,
  };
}
