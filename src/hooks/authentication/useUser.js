import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/apiAuth";

export function useUser() {
  const {
    isPending,
    data: user,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(),
    staleTime: 0,
  });

  return { isPending, user, refetch };
}
