import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

import { login as loginApi, signInWithGoogle } from "@/services/apiAuth";

export const initialValues = { email: "", password: "" };

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation(["auth"]);

  const loginSchema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string().email(t("login.validation.emailInvalid")).required(t("login.validation.emailRequired")),
        password: Yup.string().required(t("login.validation.passwordRequired")),
      }),
    [t]
  );

  const { mutate: login, isPending: isPendingLogin } = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      toast.success(t("login.toast.success"));
      if (user.role === "admin") {
        navigate("/dashboard-admin");
      } else {
        navigate("/");
      }
    },
    onError: () => {
      toast.error(t("login.toast.error"));
    },
  });

  const { mutate: loginWithGoogle, isPending: isPendingLoginWithGoogle } = useMutation({
    mutationFn: () => signInWithGoogle(),
    onSuccess: async () => {},
    onError: () => {
      toast.error("Provided email or password are incorrect");
    },
  });

  async function handleSubmit(values, { resetForm }) {
    const { email, password } = values;
    if (!email || !password) return;
    await login({ email, password });
    resetForm();
  }
  return {
    isPendingLogin,
    handleSubmit,
    loginWithGoogle,
    isPendingLoginWithGoogle,
    t,
    loginSchema,
  };
}
