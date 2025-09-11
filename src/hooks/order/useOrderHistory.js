import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ordersSelector } from "@/stores/rootSelector";
import { ordersThunk } from "@/stores/rootThunk";
import { useUser } from "@/hooks/authentication/useUser";

export default function useOrderHistory() {
  const dispatch = useDispatch();
  const { user } = useUser();
  const orders = useSelector(ordersSelector.selectOrders);
  const status = useSelector(ordersSelector.selectOrderStatus);
  const error = useSelector(ordersSelector.selectOrderError);

  useEffect(() => {
    if (status === "idle" && user) {
      dispatch(ordersThunk.fetchAllOrder(user.id));
    }
  }, [status, user, dispatch]);

  const isLoading = status === "idle" || status === "loading" || !user;

  return { orders, error, status, isLoading };
}
