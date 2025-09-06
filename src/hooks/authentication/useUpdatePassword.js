import { updatePassword as updatePasswordApi } from "@/services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export const initialValues = { password: "", confirmPassword: "" };

export default function useUpdatePassword() {
  const queryClient = useQueryClient();
  const { t } = useTranslation(["auth"]);
  const navigate = useNavigate();

  const { mutate: updatePassword, isPending: isUpdating } = useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: ({ user }) => {
      toast.success(t("updatePassword.toast.success"));
      queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      navigate("/");
    },
    onError: () => {
      toast.error(t("updatePassword.toast.error"));
    },
  });

  function handleSubmit(values, { resetForm }) {
    const { password } = values;
    updatePassword(password);
    resetForm();
  }

  const updatePasswordSchema = useMemo(
    () =>
      Yup.object({
        password: Yup.string()
          .min(6, t("updatePassword.validation.passwordMin"))
          .required(t("updatePassword.validation.passwordRequired")),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], t("updatePassword.validation.passwordsMustMatch"))
          .required(t("updatePassword.validation.confirmPasswordRequired")),
      }),
    [t]
  );

  return { updatePassword, isUpdating, handleSubmit, t, updatePasswordSchema };
}
