import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import dayjs from "dayjs";

import { updateCurrentUser } from "@/services/apiAuth";
import { useUser } from "@/hooks/authentication/useUser";

export function useUpdateUser() {
  const { t } = useTranslation(["auth"]);
  const queryClient = useQueryClient();
  const { user } = useUser();
  const navigate = useNavigate();

  const initialValues = {
    email: user.email || "",
    name: user.name || "",
    birthdate: user.birthdate ? dayjs(user.birthdate) : null,
    password: "",
  };
  const UpdateUserSchema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string()
          .email(t("updateUser.validation.emailInvalid"))
          .required(t("updateUser.validation.emailRequired")),
        name: Yup.string().required(t("updateUser.validation.nameRequired")),
        birthdate: Yup.date()
          .max(new Date(), t("updateUser.validation.birthdateFuture"))
          .required(t("updateUser.validation.birthdateRequired")),
        password: Yup.string().min(6, t("updateUser.validation.passwordMin")),
      }),
    [t]
  );

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: ({ newDataUserInfo, password, silent }) =>
      updateCurrentUser({ newDataUserInfo, password }).then((res) => ({ ...res, silent })),
    onSuccess: ({ user, silent }) => {
      if (!silent) toast.success(t("updateUser.toast.success"));
      queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (_, { silent }) => {
      if (!silent) toast.error(t("updateUser.toast.error"));
    },
  });
  const handleSubmit = (values) => {
    updateUser({
      password: values.password,
      newDataUserInfo: {
        name: values.name,
        birthdate:
          values.birthdate && dayjs(values.birthdate).isValid() ? dayjs(values.birthdate).format("YYYY-MM-DD") : null,
      },
    });
  };

  return {
    initialValues,
    updateUser,
    isUpdating,
    UpdateUserSchema,
    t,
    handleSubmit,
    user,
  };
}
