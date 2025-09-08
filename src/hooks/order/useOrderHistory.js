import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ordersSelector } from "@/stores/rootSelector";
import { fetchAllOrder } from "@/stores/order/orders.thunks";

export default function useOrderHistory() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const orders = useSelector(ordersSelector.selectOrders);
  useEffect(() => {
    async function fetchData() {
      dispatch(fetchAllOrder(id));
    }
    fetchData();
  }, [dispatch, id]);

  return { orders };
}
