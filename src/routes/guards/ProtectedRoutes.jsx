import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useUser } from "@/hooks/authentication/useUser";
import { Loading } from "@/components";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user, isPending } = useUser();

  useEffect(() => {
    if (isPending) return;
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, isPending, navigate]);
  return <Loading isLoading={isPending || !user}>{user && children}</Loading>;
}
