import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ordersSelector } from "@/stores/rootSelector";
import { ordersThunk } from "@/stores/rootThunk";

export default function useOrderHistory() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const orders = useSelector(ordersSelector.selectOrders);
  const status = useSelector(ordersSelector.selectOrderStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(ordersThunk.fetchAllOrder(id));
    }
  }, [status, dispatch]);

  const isLoading = status === "idle" || status === "loading";

  return { orders, status, isLoading };
}
