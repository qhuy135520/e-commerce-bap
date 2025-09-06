import { useLogout } from "@/hooks/authentication/useLogout";
import { useUser } from "@/hooks/authentication/useUser";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function useHeader() {
  const navigate = useNavigate();
  const { t } = useTranslation(["common"]);
  const { user } = useUser();
  const { logout } = useLogout();
  const [current, setCurrent] = useState("");

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return { navigate, t, user, logout, current, onClick };
}
