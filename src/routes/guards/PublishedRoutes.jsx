import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { Loading } from "@/components";

import { useUser } from "@/hooks/authentication/useUser";
import { useLogout } from "@/hooks/authentication/useLogout";

export default function PublishedRoutes({ children }) {
  const navigate = useNavigate();
  const { t } = useTranslation(["auth"]);
  const { logout } = useLogout();

  const { user, isPending } = useUser();

  useEffect(
    function () {
      if (isPending) return;
      if (user) {
        switch (user.role) {
          case "admin":
            navigate("/admin-dashboard");
            break;
          case "vendor":
            navigate("/vendor-dashboard/products");
            break;
          case "customer":
            navigate("/");
            break;
          default:
            toast.error(t("login.toast.errorRole"));
            logout();
            break;
        }
      }
    },
    [user, isPending, navigate]
  );
  return <Loading isLoading={isPending || user}>{children}</Loading>;
}
