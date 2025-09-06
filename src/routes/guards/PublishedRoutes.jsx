import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { Loading } from "@/components";

import { useUser } from "@/hooks/authentication/useUser";

export default function PublishedRoutes({ children }) {
  const navigate = useNavigate();

  const { user, isPending } = useUser();

  useEffect(
    function () {
      if (user) {
        user.role === "admin" ? navigate("/dashboard-admin") : navigate("/");
      }
    },
    [user, navigate]
  );
  if (!user) return <Loading isLoading={isPending}>{children}</Loading>;
}
