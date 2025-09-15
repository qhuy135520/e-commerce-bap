import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { ROLE_CUSTOMER, USER_DEFAULT_BALANCE } from "@/constants";

import { signup as signupApi } from "@/services/apiAuth";

export const initialValues = {
  email: "",
  name: "",
  birthdate: "",
  password: "",
  confirmPassword: "",
};

export function useSignup() {
  const { t } = useTranslation(["auth", "common"]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  const role = searchParams.get("role");

  const signupSchema = useMemo(
    () =>
      Yup.object({
        email: Yup.string().email(t("signup.validation.emailInvalid")).required(t("signup.validation.emailRequired")),
        name: Yup.string()
          .min(2, t("signup.validation.nameMin"))
          .max(50, t("signup.validation.nameMax"))
          .required(t("signup.validation.nameRequired")),
        birthdate: Yup.date()
          .max(new Date(), t("signup.validation.birthdateFuture"))
          .required(t("signup.validation.birthdateRequired")),
        password: Yup.string()
          .min(6, t("signup.validation.passwordMin"))
          .required(t("signup.validation.passwordRequired")),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], t("signup.validation.confirmPasswordMatch"))
          .required(t("signup.validation.confirmPasswordRequired")),
      }),
    [t]
  );

  const { mutate: signup, isPending: isPendingSignup } = useMutation({
    mutationFn: ({ email, password, newUserInfo }) => signupApi(email, password, newUserInfo),
    onSuccess: (user) => {
      toast.success(t("signup.toast.success"));
      navigate("/login");
    },
  });

  const handleSubmit = async (values, { resetForm }) => {
    const role = searchParams.get("role");

    const { email, password } = values;
    const newUserInfo = {
      name: values.name,
      birthdate: values.birthdate,
      role,
      moneyBalance: USER_DEFAULT_BALANCE,
      status: role === ROLE_CUSTOMER ? "active" : "inactive",
    };

    await signup({ email, password, newUserInfo });
    resetForm();
  };

  return {
    isPendingSignup,
    handleSubmit,
    t,
    signupSchema,
    navigate,
    searchParams,
    isChecking,
    setIsChecking,
    role,
  };
}
