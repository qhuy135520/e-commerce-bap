import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useUser } from "@/hooks/authentication/useUser";

import LoadingComponent from "@/components/common/Loading";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { user, isPending } = useUser();

  useEffect(
    function () {
      if (!user?.status === "active") {
        navigate("/login");
      }
    },
    [user, navigate]
  );

  if (user) return <LoadingComponent isLoading={isPending}>{children}</LoadingComponent>;
}
