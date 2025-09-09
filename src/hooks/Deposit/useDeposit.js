import { useSelector, useDispatch } from "react-redux";
import { useMemo } from "react";
import * as Yup from "yup";

import { deposit } from "@/stores/deposit/deposit.thunk";
import { clearError } from "@/stores/deposit/deposit.slice";

export function useDeposit() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.deposit.loading);
  const errorMsg = useSelector((state) => state.deposit.errorMsg);

  const depositSchema = useMemo(
    () =>
      Yup.object().shape({
        amount: Yup.number()
          .required("Vui lòng nhập số tiền")
          .min(1000, "Số tiền tối thiểu là 1,000 VND")
          .max(100000000, "Số tiền tối đa là 100,000,000 VND"),
      }),
    []
  );

  const handleDeposit = async (values, formikHelpers = {}) => {
    const { resetForm } = formikHelpers;
    dispatch(clearError());
    await dispatch(deposit(values));
    resetForm?.();
  };

  return {
    handleDeposit,
    depositSchema,
    loading,
    errorMsg,
    setErrorMsg: (msg) => dispatch({ type: "payment/setError", payload: msg }),
  };
}
