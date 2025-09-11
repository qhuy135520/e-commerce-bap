import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { Loading } from "@/components";
import { useUser } from "@/hooks/authentication/useUser";

export function ProtectedRoleRoutes({ allowedRoles }) {
  const navigate = useNavigate();
  const { user, isPending } = useUser();

  const isAllowed = allowedRoles.includes(user.role);

  useEffect(() => {
    if (isPending) return;
    if (!user || !isAllowed) {
      navigate("/", { replace: true });
    }
  }, [user, isPending, navigate, allowedRoles]);

  return (
    <Loading isLoading={isPending || !isAllowed || !user}>
      <Outlet />
    </Loading>
  );
}
